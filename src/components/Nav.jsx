import { useCart } from '../context/CartContext'

export default function Nav() {
  const { totalQuantity, openCart } = useCart()

  return (
    <nav>
      <div className="nav-left nav-desktop">
        <a href="#">Shop</a>
        <a href="#">Drop 001</a>
        <a href="#">About</a>
      </div>
      <div className="nav-logo">Art Late</div>
      <div className="nav-right">
        <a href="#" className="search-link nav-desktop">Search</a>
        <button className="cart-btn" onClick={openCart}>
          Cart {totalQuantity > 0 && `(${totalQuantity})`}
        </button>
      </div>
    </nav>
  )
}
