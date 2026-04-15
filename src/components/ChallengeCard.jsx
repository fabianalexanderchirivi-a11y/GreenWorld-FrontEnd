import '../styles/cards.css'

export default function ChallengeCard({ challenge, isCompleted, onToggleCompleted }) {
  const visualStatus = isCompleted ? 'Completado' : challenge.status

  return (
    <article className="challenge-card">
      <div className="challenge-card-face challenge-card-front">
        <div className="challenge-card-top">
          <span className="challenge-card-category">{challenge.category}</span>
          <span className={`challenge-card-status ${isCompleted ? 'is-completed' : ''}`}>
            {visualStatus}
          </span>
        </div>

        <div className="challenge-card-main">
          <div className="challenge-card-icon-shell">
            <img src={challenge.image} alt={challenge.name} className="challenge-card-icon" />
          </div>

          <h3>{challenge.name}</h3>
        </div>

        <div className="challenge-card-meta">
          <span>Dificultad</span>
          <strong>{challenge.difficulty}</strong>
        </div>
      </div>

      <div className="challenge-card-face challenge-card-back">
        <p>{challenge.description}</p>
        <div className="challenge-card-task">
          <span>Que debes hacer</span>
          <strong>{challenge.objective}</strong>
        </div>
        <button type="button" className="challenge-card-button" onClick={onToggleCompleted}>
          {isCompleted ? 'Marcar pendiente' : 'Iniciar reto'}
        </button>
      </div>
    </article>
  )
}
