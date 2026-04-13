import { Link } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'

export default function Menu() {
  return (
    <header className="main-header">
      <div className="brand-block">
        <div className="brand-block">
          <span className="brand-text">GREEN</span>
          <div className="brand-icon">
            <img id="IconoL" src={IconoLogo} alt="Logo Green World" />
          </div>
          <span className="brand-text">WORLD</span>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegación principal">
        <Link to="/">Inicio</Link>
        <Link to="/docentes">Cursos</Link>
        <Link to="/estudiantes">Certificados</Link>
        <Link to="/retos">Retos</Link>
      </nav>

      <div className="auth-actions">
        <button type="button" className="btn btn-outline">Registrarse</button>
        <button type="button" className="btn btn-solid">Iniciar sesión</button>
      </div>
    </header>
  )
}