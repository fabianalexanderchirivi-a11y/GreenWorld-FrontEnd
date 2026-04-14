import { Link } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'
import LoginPlaceholder from '../img/banner2.png'
import '../styles/pages/login.css'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Zm0 1.5v.2L12 13l8-4.8V8H4Zm16 8V9.9l-7.6 4.5a.8.8 0 0 1-.8 0L4 9.9V16h16Z" fill="currentColor" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2.5a5 5 0 0 1 5 5V10h.9c1.16 0 2.1.94 2.1 2.1v7.8c0 1.16-.94 2.1-2.1 2.1H6.1A2.1 2.1 0 0 1 4 19.9v-7.8C4 10.94 4.94 10 6.1 10H7V7.5a5 5 0 0 1 5-5Zm5.9 9H6.1a.6.6 0 0 0-.6.6v7.8c0 .33.27.6.6.6h11.8a.6.6 0 0 0 .6-.6v-7.8a.6.6 0 0 0-.6-.6ZM12 4a3.5 3.5 0 0 0-3.5 3.5V10h7V7.5A3.5 3.5 0 0 0 12 4Z" fill="currentColor" />
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M21.8 12.23c0-.72-.06-1.24-.2-1.78H12v3.39h5.64c-.11.84-.72 2.11-2.08 2.96l-.02.12 3.04 2.35.21.02c1.96-1.81 3.01-4.47 3.01-7.06Z" fill="#4285F4" />
    <path d="M12 22c2.76 0 5.07-.91 6.76-2.47l-3.22-2.49c-.86.6-2.01 1.02-3.54 1.02-2.71 0-5.01-1.79-5.83-4.26l-.11.01-3.16 2.44-.04.1A10.2 10.2 0 0 0 12 22Z" fill="#34A853" />
    <path d="M6.17 13.8A6.1 6.1 0 0 1 5.85 12c0-.63.12-1.24.31-1.8l-.01-.12-3.2-2.48-.1.05A10.2 10.2 0 0 0 1.8 12c0 1.63.4 3.16 1.06 4.55l3.3-2.75Z" fill="#FBBC05" />
    <path d="M12 5.94c1.93 0 3.23.84 3.97 1.53l2.9-2.83C17.06 2.98 14.76 2 12 2a10.2 10.2 0 0 0-9.14 5.65l3.31 2.56C7 7.73 9.3 5.94 12 5.94Z" fill="#EA4335" />
  </svg>
)

export default function Login() {
  return (
    <main className="login-page">
      <header className="login-brand" aria-label="Logo Green World">
        <span className="brand-text">GREEN</span>
        <div className="brand-icon">
          <img id="IconoL" src={IconoLogo} alt="Logo Green World" />
        </div>
        <span className="brand-text">WORLD</span>
      </header>

      <section className="login-layout" aria-label="Acceso a la plataforma">
        <aside className="login-side" aria-hidden="true">
          <img className="login-side-image" src={LoginPlaceholder} alt="" />
          <div className="login-side-detail" />
        </aside>

        <article className="login-card">
          <h1>Bienvenido de nuevo</h1>
          <p>Inicia sesion para empezar tu aventura</p>

          <form className="login-form" noValidate>
            <label className="field-group" htmlFor="email">
              <span>Correo electronico</span>
              <div className="field-shell">
                <i className="field-icon"><MailIcon /></i>
                <input id="email" type="email" name="email" autoComplete="email" />
              </div>
            </label>

            <label className="field-group" htmlFor="password">
              <span>Contraseña</span>
              <div className="field-shell">
                <i className="field-icon"><LockIcon /></i>
                <input id="password" type="password" name="password" autoComplete="current-password" />
              </div>
            </label>

            <label className="remember-row" htmlFor="remember">
              <input id="remember" type="checkbox" name="remember" />
              <span>Recordarme</span>
            </label>

            <button type="submit" className="btn btn-solid login-submit">Iniciar sesion</button>

            <button type="button" className="login-google">
              <GoogleIcon />
              <span>Continuar con Google</span>
            </button>
          </form>

          <p className="login-signup">
            No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
        </article>
      </section>
    </main>
  )
}
