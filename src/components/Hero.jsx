import { useState } from 'react'
import { heroProduct } from '../data/products'

export default function Hero({ currency }) {
  const [activeSize, setActiveSize] = useState(heroProduct.defaultSize)

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-tag">{heroProduct.tag}</span>
        <img className="hero-img" src={heroProduct.image} alt="Pardon Mademoiselle Tee" />
      </div>
      <div className="hero-right">
        <p className="hero-eye">{heroProduct.eye}</p>
        <h1 className="hero-title">
          Pardon<br /><em>Mademoiselle</em>
        </h1>
        <p className="hero-desc">{heroProduct.desc}</p>
        {currency === 'usd' ? (
          <p className="hero-price">{heroProduct.priceUSD}</p>
        ) : (
          <p className="hero-price price-egp" style={{ display: 'block' }}>{heroProduct.priceEGP}</p>
        )}
        <div className="sizes">
          {heroProduct.sizes.map(size => (
            <button
              key={size}
              className={`sz${activeSize === size ? ' active' : ''}`}
              onClick={() => setActiveSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="btn-atc">Add to Cart</button>
      </div>
    </section>
  )
}
