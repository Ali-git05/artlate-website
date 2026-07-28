import { useCart } from '../context/CartContext'

export default function Nav() {
  const { totalQuantity, openCart } = useCart()

  return (
    <nav>
      <div className="nav-left nav-desktop">
        <a href="/#collection">Shop</a>
        <a href="/#collection">Drop 001</a>
        <a href="/#about">About</a>
      </div>
      <div className="nav-logo">Art Late</div>
      <div className="nav-right">
        <button className="cart-btn" onClick={openCart}>
          Cart {totalQuantity > 0 && `(${totalQuantity})`}
        </button>
      </div>
    </nav>
  )
}
