import { Link } from 'react-router-dom'
import WorldGreen from '../img/WorldGreen.png'
import World from '../img/World.webp'
import Water from '../img/Water.webp'
import Bin from '../img/Bin.webp'
import Energy from '../img/Energy.webp'

const highlightedCourses = [
  { name: 'Reciclaje básico', icon: Bin },
  { name: 'Energía y ahorro', icon: Energy },
  { name: 'Cuidado del agua', icon: Water },
  { name: 'Conservación', icon: World },
]

export default function Principal() {
  return (
    <main className="home-base">
      <section className="hero-base" aria-label="Sección principal">
        <article className="hero-content">
          <h1>Aprende y actúa por el planeta</h1>
          <p>
            Convierte conocimiento en impacto real: aprende hoy y transforma tu entorno mañana.
          </p>

          <div className="hero-buttons">
            <Link to="/docentes" className="btn btn-solid">Explorar cursos</Link>
            <Link to="/retos" className="btn btn-outline">Unirme a un reto</Link>
          </div>
        </article>

        <aside className="hero-placeholder" aria-label="Espacio para imagen principal">
          <img src={WorldGreen} id="World" alt="Ilustración del planeta verde" />
        </aside>
      </section>

      <section className="featured-courses" aria-label="Cursos destacados">
        <h2>Cursos destacados</h2>

        <div className="course-grid">
          {highlightedCourses.map((course) => (
            <article key={course.name} className="course-card">
              <div className="course-icon">
                <img src={course.icon} alt={course.name} className="course-icon-img" />
              </div>
              <p>{course.name}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}