import Footer from './Footer'
import '../styles/placeholder-page.css'

export default function PlaceholderPage({ title, description }) {
  return (
    <main className="placeholder-page">
      <section className="placeholder-card">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>

      <Footer />
    </main>
  )
}
