import lifestyle from '../assets/lifestyle.jpg'

export default function Editorial() {
  return (
    <section className="editorial">
      <img className="editorial-img" src={lifestyle} alt="Art Late® worn at the beach" />
      <div className="editorial-overlay">
        <p className="editorial-eye">Art Late® — Drop 001</p>
        <p className="editorial-caption">Worn everywhere.</p>
      </div>
    </section>
  )
}
