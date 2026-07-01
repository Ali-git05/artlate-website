import { useEffect, useState } from 'react'
import { splashLogo } from '../data/products'

export default function Splash() {
  const [hidden, setHidden] = useState(false)

  const dismiss = () => setHidden(true)

  useEffect(() => {
    const t = setTimeout(dismiss, 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div id="splash" className={hidden ? 'hide' : ''} onClick={dismiss}>
      <img className="splash-logo" src={splashLogo} alt="Art Late" />
      <p className="splash-brand">Art Late</p>
      <p className="splash-sub">Drop 001 — Now Available</p>
      <p className="splash-enter">Tap anywhere to enter</p>
    </div>
  )
}
