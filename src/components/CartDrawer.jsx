import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { lines, totalQuantity, loading, cartOpen, closeCart, removeItem, updateItem, goToCheckout } = useCart()

  return (
    <>
      {cartOpen && <div className="cart-overlay" onClick={closeCart} />}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <span className="cart-title">Cart ({totalQuantity})</span>
          <button className="cart-close" onClick={closeCart}>✕</button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(line => {
                const { merchandise } = line
                const price = parseFloat(merchandise.price.amount)
                const total = (price * line.quantity).toFixed(2)
                return (
                  <div key={line.id} className="cart-line">
                    {merchandise.image && (
                      <img className="cart-line-img" src={merchandise.image.url} alt={merchandise.image.altText || merchandise.product.title} />
                    )}
                    <div className="cart-line-info">
                      <p className="cart-line-name">{merchandise.product.title}</p>
                      <p className="cart-line-variant">{merchandise.title}</p>
                      <p className="cart-line-price">${total} {merchandise.price.currencyCode}</p>
                      <div className="cart-line-qty">
                        <button
                          onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                          disabled={loading}
                        >−</button>
                        <span>{line.quantity}</span>
                        <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={loading}>+</button>
                      </div>
                    </div>
                    <button className="cart-line-remove" onClick={() => removeItem(line.id)} disabled={loading}>✕</button>
                  </div>
                )
              })}
            </div>
            <div className="cart-footer">
              <button className="btn-checkout" onClick={goToCheckout}>
                Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
