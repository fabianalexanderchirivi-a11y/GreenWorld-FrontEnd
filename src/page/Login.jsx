import IconoLogo from '../img/IconoLogo.webp'
import iconMail from '../img/icon-mail.svg'
import iconLock from '../img/icon-lock.svg'
import iconGoogle from '../img/icon-google.svg'
import './Login.css'

export default function Login() {
  return (
    <main className="login-page" aria-label="Pantalla de inicio de sesión">
      <header className="login-header">
        <div className="login-brand" aria-label="GreenWorld">
          <span className="brand-text">GREEN</span>
          <div className="brand-icon">
            <img id="IconoL" src={IconoLogo} alt="Logo Green World" />
          </div>
          <span className="brand-text">WORLD</span>
        </div>
      </header>

      <section className="login-layout">
        <aside className="login-side" aria-hidden="true">
          <div className="login-side-detail" />
        </aside>

        <article className="login-card" aria-labelledby="login-title">
          <h1 id="login-title">Bienvenido de nuevo</h1>
          <p>Inicia sesión para empezar tu aventura</p>

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <label className="input-wrapper" htmlFor="correo">
              <img src={iconMail} alt="" aria-hidden="true" className="input-icon-img" />
              <input id="correo" type="email" placeholder="Correo electrónico" />
            </label>

            <label className="input-wrapper" htmlFor="clave">
              <img src={iconLock} alt="" aria-hidden="true" className="input-icon-img" />
              <input id="clave" type="password" placeholder="Contraseña" />
            </label>

            <label className="remember-check" htmlFor="remember">
              <input id="remember" type="checkbox" />
              <span>Recordarme</span>
            </label>

            <button type="submit" className="btn login-submit">Iniciar sesión</button>
            <button type="button" className="btn login-google">
              <img src={iconGoogle} alt="" aria-hidden="true" className="google-icon-img" />
              Continuar con Google
            </button>
          </form>

          <div className="login-footer">
            <span>¿No tienes cuenta?</span>
            <button type="button">Crear cuenta</button>
          </div>
        </article>
      </section>
    </main>
  )
}
