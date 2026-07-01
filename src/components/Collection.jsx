import { collection } from '../data/products'

export default function Collection({ currency }) {
  return (
    <section className="coll">
      <div className="coll-head">
        <h2 className="coll-title">Drop 001</h2>
        <a className="coll-link">View All</a>
      </div>
      <div className="grid-5">
        {collection.map(product => (
          <div key={product.id} className="pc">
            <div className="pc-img">
              <img src={product.image} alt={product.alt} />
            </div>
            <p className="pc-name">{product.name}</p>
            {currency === 'usd' ? (
              <p className="pc-price usd-price">{product.priceUSD}</p>
            ) : (
              <p className="pc-egp egp-price">{product.priceEGP}</p>
            )}
            <div className="pc-colors">
              {product.colors.map((c, i) => (
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
