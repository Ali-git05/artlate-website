import { accessories } from '../data/products'

export default function Accessories({ currency }) {
  return (
    <section className="acc-section">
      <div className="acc-head">
        <h2 className="acc-title">Accessories</h2>
        <a className="coll-link" href="#">View All</a>
      </div>
      <div className="acc-grid">
        {accessories.map(item => (
          <div key={item.id} className="acc-card">
            <div className="acc-img">
              <img src={item.image} alt={item.alt} />
            </div>
            <p className="acc-name">{item.name}</p>
            {currency === 'usd' ? (
              <p className="acc-price usd-price">{item.priceUSD}</p>
            ) : (
              <p className="acc-egp egp-price">{item.priceEGP}</p>
            )}
            <div className="acc-colors">
              {item.colors.map((c, i) => (
                <div
                  key={i}
                  className="cdot"
                  style={{ background: c.bg, borderColor: c.border }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
