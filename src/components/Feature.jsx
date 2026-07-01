import { featureImage } from '../data/products'

export default function Feature() {
  return (
    <section className="feat">
      <div className="feat-img">
        <img src={featureImage} alt="Cheers Mademoiselle" />
      </div>
      <div className="feat-content">
        <p className="feat-eye">The Art Of Being Late®</p>
        <h2 className="feat-title">
          Made for those<br />who arrive <em>last</em><br />and leave first.
        </h2>
        <p className="feat-desc">
          Built in Egypt. Distributed from Florida. Art Late® is for people who do things differently — intentionally, unhurriedly, beautifully.
        </p>
        <button className="btn-wh">Our Story</button>
      </div>
    </section>
  )
}
