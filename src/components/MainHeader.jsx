import { Link, NavLink } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'
import '../styles/header.css'

export default function MainHeader() {
  return (
    <header className="main-header">
      <Link to="/" className="brand-block" aria-label="Ir al inicio de Green World">
        <span className="brand-text">Green</span>
        <div className="brand-icon">
          <img id="IconoL" src={IconoLogo} alt="Logo Green World" />
        </div>
        <span className="brand-text">World</span>
      </Link>

      <nav className="main-nav" aria-label="Navegacion principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/retos">Retos</NavLink>
      </nav>

      <div className="auth-actions">
        <Link to="/register" className="btn btn-outline">Registrarse</Link>
        <Link to="/login" className="btn btn-solid">Iniciar sesion</Link>
      </div>
    </header>
  )
}
