import lifestyle from '../assets/lifestyle.jpg'
import editorialWalk from '../assets/editorial-walk.jpg'
import editorialBeach from '../assets/editorial-beach.png'

export default function Editorial() {
  return (
    <section className="editorial-section">
      <div className="editorial-header">
        <p className="editorial-eyebrow">Art Late® — Drop 001</p>
        <h2 className="editorial-title">Worn everywhere.</h2>
      </div>

      <div className="editorial-grid">
        <div className="editorial-main">
          <img src={lifestyle} alt="Art Late® lifestyle" />
        </div>
        <div className="editorial-side">
          <div className="editorial-sub">
            <img src={editorialWalk} alt="Art Late® worn on the street" />
          </div>
          <div className="editorial-sub">
            <img src={editorialBeach} alt="Art Late® worn at the beach" />
          </div>
        </div>
      </div>
    </section>
  )
}
