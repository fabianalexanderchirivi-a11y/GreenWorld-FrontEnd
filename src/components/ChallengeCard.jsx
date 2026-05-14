import '../styles/cards.css'
import { Link } from 'react-router-dom'
import { resolveImage } from '../utils/imageResolver'

export default function ChallengeCard({ challenge, actionLabel, actionDisabled = false, onAction, detailsTo }) {
  const name = challenge.name || challenge.titulo
  const description = challenge.description || challenge.descripcion
  const objective = challenge.objective || challenge.objetivo
  const difficulty = challenge.difficulty || challenge.dificultad
  const category = challenge.category || challenge.categoria || 'General'
  const status = challenge.status || challenge.estado || 'Disponible'
  const image = resolveImage(challenge.image || challenge.imagen)
  const visualStatus = actionDisabled && actionLabel ? actionLabel : status

  return (
    <article className="challenge-card">
      <div className="challenge-card-face challenge-card-front">
        <div className="challenge-card-top">
          <span className="challenge-card-category">{category}</span>
          <span className={`challenge-card-status ${actionDisabled ? 'is-completed' : ''}`}>
            {visualStatus}
          </span>
        </div>

        <div className="challenge-card-main">
          <div className="challenge-card-icon-shell">
            <img src={image} alt={name} className="challenge-card-icon" />
          </div>

          {detailsTo ? (
            <Link className="card-title-link" to={detailsTo}>{name}</Link>
          ) : (
            <h3>{name}</h3>
          )}
        </div>

        <div className="challenge-card-meta">
          <span>Dificultad</span>
          <strong>{difficulty}</strong>
        </div>
      </div>

      <div className="challenge-card-face challenge-card-back">
        <p>{description}</p>
        <div className="challenge-card-task">
          <span>Que debes hacer</span>
          <strong>{objective}</strong>
        </div>
        <button
          type="button"
          className="challenge-card-button"
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel || 'Iniciar reto'}
        </button>
      </div>
    </article>
  )
}
