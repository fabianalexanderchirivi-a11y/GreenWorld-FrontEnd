import { Link, NavLink } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'
import '../styles/header.css'

export default function MainHeader() {
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

      <nav className="main-nav" aria-label="Navegacion principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/estudiantes">Certificados</NavLink>
        <NavLink to="/retos">Retos</NavLink>
      </nav>

      <div className="auth-actions">
        <Link to="/register" className="btn btn-outline">Registrarse</Link>
        <Link to="/login" className="btn btn-solid">Login</Link>
      </div>
    </header>
  )
}
