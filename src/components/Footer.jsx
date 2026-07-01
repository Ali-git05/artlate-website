import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const { error } = await supabase.from('subscribers').insert({ email })
    if (error) {
      setStatus('error')
    } else {
      setStatus('done')
      setEmail('')
    }
  }

  return (
    <footer>
      <div className="fg">
        <div>
          <p className="fb">Art Late</p>
          <p className="ft">The Art Of Being Late®</p>
          <form className="er" onSubmit={handleSubscribe}>
            <input
              className="ei"
              type="email"
              placeholder={status === 'done' ? 'You\'re in.' : 'Enter your email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'done'}
            />
            <button className="es" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe →'}
            </button>
          </form>
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
