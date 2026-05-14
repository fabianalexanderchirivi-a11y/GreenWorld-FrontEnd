import '../styles/cards.css'
import { Link } from 'react-router-dom'
import { resolveImage } from '../utils/imageResolver'

const formatText = (text) => {
  if (!text) {
    return ''
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export default function CourseCard({ course, actionLabel, actionDisabled = false, onAction, detailsTo }) {
  const name = course.name || course.titulo
  const description = course.description || course.descripcion
  const level = course.level || course.nivel
  const category = course.category || course.categoria || 'General'
  const image = resolveImage(course.image || course.imagen)
  const difficulty = formatText(level) || 'No definido'

  return (
    <article className="courses-card">
      <div className="courses-card-face courses-card-front">
        <div className="courses-card-top">
          <span className="courses-card-category">{category}</span>
        </div>

        <div className="courses-card-main">
          <div className="courses-card-icon-shell">
            <img src={image} alt={name} className="courses-card-icon" />
          </div>

          {detailsTo ? (
            <Link className="card-title-link" to={detailsTo}>{name}</Link>
          ) : (
            <h3>{name}</h3>
          )}
        </div>

        <div className="courses-card-meta">
          <span>Dificultad</span>
          <strong>{difficulty}</strong>
        </div>
      </div>

      <div className="courses-card-face courses-card-back">
        <p>{description}</p>
        {actionLabel && (
          <div className="courses-card-actions">
            <button
              type="button"
              className="courses-card-button"
              disabled={actionDisabled}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
