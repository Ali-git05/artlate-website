import { Link } from 'react-router-dom'
import { collection } from '../data/products'
import { useShopifyProduct } from '../hooks/useShopifyProduct'
import { useCart } from '../context/CartContext'

function ProductCard({ product, currency }) {
  const { variantMap } = useShopifyProduct(product.handle)
  const { addItem, loading } = useCart()

  const firstAvailable = !product.soldOut && Object.values(variantMap).find(v => v.availableForSale)

  function handleQuickAdd() {
    if (!firstAvailable) return
    addItem(firstAvailable.id)
  }

  return (
    <div className="pc">
      <Link to={`/products/${product.handle}`} className="pc-img-link">
        <div className="pc-img">
          <img src={product.image} alt={product.alt} />
          {product.soldOut ? (
            <div className="pc-sold-out">Sold Out</div>
          ) : firstAvailable ? (
            <button className="pc-quick-add" onClick={e => { e.preventDefault(); handleQuickAdd() }} disabled={loading}>
              {loading ? '…' : 'Quick Add'}
            </button>
          ) : null}
        </div>
      </Link>
      <p className="pc-name">{product.name}</p>
      {currency === 'usd' ? (
        <p className="pc-price usd-price">{product.priceUSD}</p>
      ) : (
        <p className="pc-egp egp-price">{product.priceEGP}</p>
      )}
      <div className="pc-colors">
        {product.colors.map((c, i) => (
          <div
            key={i}
            className="cdot"
            style={{ background: c.bg, borderColor: c.border }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Collection({ currency }) {
  const visible = collection

  return (
    <section className="coll" id="collection">
      <div className="coll-head">
        <h2 className="coll-title">Drop 001</h2>
      </div>
      <div className="grid-5">
        {visible.map(product => (
          <ProductCard key={product.id} product={product} currency={currency} />
        ))}
      </div>
    </section>
  )
}
