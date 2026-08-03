import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useShopifyProduct } from '../hooks/useShopifyProduct'
import { useCart } from '../context/CartContext'
import { pixelTrack } from '../lib/pixel'

export default function ProductPage({ currency }) {
  const { handle } = useParams()
  const countryCode = currency === 'egp' ? 'EG' : 'US'
  const { product, loading: productLoading, variantMap } = useShopifyProduct(handle, countryCode)
  const { addItem, loading: cartLoading } = useCart()
  const [activeSize, setActiveSize] = useState(null)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    if (!product) return
    const variant = product.variants.edges[0]?.node
    pixelTrack('ViewContent', {
      content_name: product.title,
      content_ids: [product.id],
      content_type: 'product',
      ...(variant && { value: parseFloat(variant.price.amount), currency: variant.price.currencyCode }),
    })
  }, [product?.id])

  if (productLoading) return <div className="pdp-loading">Loading…</div>
  if (!product) return <div className="pdp-loading">Product not found.</div>

  const images = product.images.edges.map(({ node }) => node)
  const variants = product.variants.edges.map(({ node }) => node)
  const selectedVariant = activeSize ? variantMap[activeSize] : variants[0]
  const unavailable = selectedVariant && !selectedVariant.availableForSale

  const price = selectedVariant
    ? selectedVariant.price.currencyCode === 'EGP'
      ? `${parseFloat(selectedVariant.price.amount).toFixed(0)} EGP`
      : `$${parseFloat(selectedVariant.price.amount).toFixed(0)} USD`
    : null

  function handleAddToCart() {
    if (!selectedVariant) return
    fbq('track', 'AddToCart', {
      value: parseFloat(selectedVariant.price.amount),
      currency: selectedVariant.price.currencyCode,
      content_ids: [product.id],
      content_name: product.title,
      quantity: 1,
    })
    addItem(selectedVariant.id)
  }

  return (
    <div className="pdp">
      <div className="pdp-inner">
        <div className="pdp-left">
          <div className="pdp-main-img">
            {images[imgIndex] && (
              <img src={images[imgIndex].url} alt={images[imgIndex].altText || product.title} />
            )}
          </div>
          {images.length > 1 && (
            <div className="pdp-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pdp-thumb${imgIndex === i ? ' active' : ''}`}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={img.url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-right">
          <p className="pdp-eye">Art Late® · Drop 001</p>
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-desc" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {price && <p className="pdp-price">{price}</p>}

          <div className="sizes">
            {variants.map(v => (
              <button
                key={v.id}
                className={`sz${(activeSize ?? variants[0]?.title) === v.title ? ' active' : ''}${!v.availableForSale ? ' sold-out' : ''}`}
                onClick={() => setActiveSize(v.title)}
                disabled={!v.availableForSale}
              >
                {v.title}
              </button>
            ))}
          </div>

          <button
            className="btn-atc"
            onClick={handleAddToCart}
            disabled={cartLoading || !selectedVariant || unavailable}
          >
            {cartLoading ? 'Adding…' : unavailable ? 'Sold Out' : 'Add to Cart'}
          </button>

          <Link to="/" className="pdp-back">← Back</Link>
        </div>
      </div>
    </div>
  )
}
