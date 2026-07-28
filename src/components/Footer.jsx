import { Link } from 'react-router-dom'

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
            <li><a href="/#collection">Drop 001</a></li>
            <li><a href="/#collection">Tees</a></li>
            <li><a href="/#collection">All Products</a></li>
          </ul>
        </div>
        <div className="fc">
          <p className="fc-t">Help</p>
          <ul>
            <li><a href="mailto:artlateclothes@gmail.com">Contact</a></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>
        <div className="fc">
          <p className="fc-t">Brand</p>
          <ul>
            <li><a href="https://www.instagram.com/artlate.co/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@artlate.co" target="_blank" rel="noopener noreferrer">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="fbot">
        <span className="fc-copy">© 2026 Art Late® · All rights reserved</span>
        <div className="fsoc">
          <a href="https://www.instagram.com/artlate.co/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@artlate.co" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  )
}
