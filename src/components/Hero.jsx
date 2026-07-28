import { useState } from 'react'
import { heroProduct } from '../data/products'
import { useShopifyProduct } from '../hooks/useShopifyProduct'
import { useCart } from '../context/CartContext'
import heroFlatlay from '../assets/product-1-flatlay.jpg'

export default function Hero({ currency }) {
  const [activeSize, setActiveSize] = useState(heroProduct.defaultSize)
  const [imgIndex, setImgIndex] = useState(0)
  const { product, variantMap } = useShopifyProduct(heroProduct.handle)
  const { addItem, loading } = useCart()

  const images = product?.images?.edges?.length
    ? product.images.edges.map(({ node }) => ({ src: node.url, alt: node.altText || heroProduct.name }))
    : [{ src: heroFlatlay, alt: heroProduct.name }]

  const selectedVariant = variantMap[activeSize]
  const unavailable = selectedVariant && !selectedVariant.availableForSale

  function handleAddToCart() {
    if (!selectedVariant) return
    addItem(selectedVariant.id)
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-tag">{heroProduct.tag}</span>
        <img
          className="hero-img"
          src={images[imgIndex].src}
          alt={images[imgIndex].alt}
        />
        <div className="hero-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`hero-thumb${imgIndex === i ? ' active' : ''}`}
              onClick={() => setImgIndex(i)}
            >
              <img src={img.src} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <p className="hero-eye">{heroProduct.eye}</p>
        <h1 className="hero-title">
          Pardon<br /><em>Mademoiselle</em>
        </h1>
        <p className="hero-desc">{heroProduct.desc}</p>
        {currency === 'usd' ? (
          <p className="hero-price">{heroProduct.priceUSD}</p>
        ) : (
          <p className="hero-price price-egp" style={{ display: 'block' }}>{heroProduct.priceEGP}</p>
        )}
        <div className="sizes">
          {heroProduct.sizes.map(size => (
            <button
              key={size}
              className={`sz${activeSize === size ? ' active' : ''}`}
              onClick={() => setActiveSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          className="btn-atc"
          onClick={handleAddToCart}
          disabled={loading || !selectedVariant || unavailable}
        >
          {loading ? 'Adding…' : unavailable ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </section>
  )
}
