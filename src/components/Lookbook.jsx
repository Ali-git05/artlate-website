import lifestyle from '../assets/lifestyle.jpg'
import editorialWalk from '../assets/editorial-walk.jpg'
import editorialBeach from '../assets/editorial-beach.png'

const lookbookImages = [
  { src: lifestyle,      alt: 'Art Late® — worn at the beach, Drop 001' },
  { src: editorialWalk,  alt: 'Art Late® — worn on the street, Drop 001' },
  { src: editorialBeach, alt: 'Art Late® — beach day, Drop 001' },
]

export default function Lookbook() {
  return (
    <section className="lookbook">
      <div className="lookbook-header">
        <p className="lookbook-eyebrow">Drop 001</p>
        <h2 className="lookbook-title">Lookbook</h2>
      </div>

      <div className="lookbook-grid">
        {lookbookImages.map(({ src, alt }) => (
          <div key={alt} className="lookbook-item">
            <img src={src} alt={alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
