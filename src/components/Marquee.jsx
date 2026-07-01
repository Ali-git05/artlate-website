import { marqueeItems } from '../data/products'

const items = [...marqueeItems, ...marqueeItems]

export default function Marquee() {
  return (
    <div className="mq">
      <div className="mq-track">
        {items.map((text, i) => (
          <span key={i} className="mq-item">
            {text} <span className="mq-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
