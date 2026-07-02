export default function Footer() {
  return (
    <footer>
      <div className="fg">
        <div>
          <p className="fb">Art Late</p>
          <p className="ft">The Art Of Being Late®</p>
          <div className="er">
            <input className="ei" type="email" placeholder="Enter your email" />
            <button className="es">Subscribe →</button>
          </div>
        </div>
        <div className="fc">
          <p className="fc-t">Shop</p>
          <ul>
            <li>Drop 001</li>
            <li>Tees</li>
            <li>Accessories</li>
            <li>All Products</li>
          </ul>
        </div>
        <div className="fc">
          <p className="fc-t">Help</p>
          <ul>
            <li>Sizing Guide</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="fc">
          <p className="fc-t">Brand</p>
          <ul>
            <li>About Us</li>
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span className="fc-copy">© 2025 Art Late® · All rights reserved</span>
        <div className="fsoc">
          <span>Instagram</span>
          <span>TikTok</span>
        </div>
      </div>
    </footer>
  )
}
