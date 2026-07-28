import { useState } from 'react'
import { splashLogo } from '../data/products'

export default function Splash({ skip = false, onSelect }) {
  const [hidden, setHidden] = useState(skip)
  const [exiting, setExiting] = useState(false)

  const choose = (currency) => {
    setExiting(true)
    setTimeout(() => {
      setHidden(true)
      onSelect?.(currency)
    }, 500)
  }

  if (hidden) return null

  return (
    <div id="splash" className={exiting ? 'hide' : ''}>
      <img className="splash-logo" src={splashLogo} alt="Art Late" />
      <p className="splash-brand">Art Late</p>
      <p className="splash-sub">Drop 001 — Now Available</p>

      <p className="splash-region-label">Select your region</p>

      <div className="splash-regions">
        <button className="region-btn" onClick={() => choose('egp')}>
          <span className="region-flag">🇪🇬</span>
          <span className="region-name">Egypt</span>
          <span className="region-currency">EGP</span>
        </button>

        <div className="region-divider" />

        <button className="region-btn" onClick={() => choose('usd')}>
          <span className="region-flag">🇺🇸</span>
          <span className="region-name">United States</span>
          <span className="region-currency">USD</span>
        </button>
      </div>
    </div>
  )
}
