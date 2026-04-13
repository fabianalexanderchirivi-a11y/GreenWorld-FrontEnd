import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="login-page">
      <header className="login-topbar">
        <Link to="/" className="brand-mark">
          <span>GREEN</span>
          <span className="brand-globe" aria-hidden="true"></span>
          <span>WORLD</span>
        </Link>
      </header>

      <section className="login-shell">
        <article className="login-card">
          <p className="login-kicker">GREEN WORLD</p>
          <h1>Bienvenido de nuevo</h1>
          <p className="login-subtitle">
            Inicia sesión para empezar tu aventura ecológica
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="input-group">
              <span className="input-icon" aria-hidden="true">✉</span>
              <input type="email" placeholder="Correo electrónico" />
            </label>

            <label className="input-group">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input type="password" placeholder="Contraseña" />
            </label>

            <label className="remember-line">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>

            <button className="primary-btn" type="submit">
              Iniciar sesión
            </button>

            <button className="outline-btn" type="button">
              <span className="google-mark">G</span>
              Continuar con Google
            </button>
          </form>

          <div className="login-links">
            <span>¿No tienes cuenta?</span>
            <button type="button" className="login-text-link">
              Crear cuenta
            </button>
          </div>
        </article>

        <div className="login-art" aria-hidden="true">
          <div className="art-glow"></div>

          <div className="planet">
            <span className="continent continent-1"></span>
            <span className="continent continent-2"></span>
            <span className="continent continent-3"></span>
            <span className="planet-ring"></span>
          </div>

          <div className="giraffe-shape"></div>
          <div className="rhino-shape"></div>

          <div className="hill hill-1"></div>
          <div className="hill hill-2"></div>
          <div className="ground-line"></div>
        </div>
      </section>
    </main>
  )
}