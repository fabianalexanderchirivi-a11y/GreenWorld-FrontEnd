import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'
import '../styles/header.css'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 12.25a4.13 4.13 0 1 0 0-8.25 4.13 4.13 0 0 0 0 8.25Zm0 1.5c-4.03 0-7.3 2.37-7.3 5.3 0 .41.34.75.75.75h13.1c.41 0 .75-.34.75-.75 0-2.93-3.27-5.3-7.3-5.3Z" fill="currentColor" />
  </svg>
)

const obtenerUsuarioGuardado = () => {
  const storages = [localStorage, sessionStorage]

  for (const storage of storages) {
    const usuario = storage.getItem('usuario')

    if (usuario) {
      try {
        return JSON.parse(usuario)
      } catch {
        return { sesionActiva: true }
      }
    }
  }

  return null
}

export default function MainHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [usuarioGuardado, setUsuarioGuardado] = useState(() => obtenerUsuarioGuardado())

  useEffect(() => {
    setUsuarioGuardado(obtenerUsuarioGuardado())
  }, [location.pathname])

  useEffect(() => {
    const sincronizarSesion = () => {
      setUsuarioGuardado(obtenerUsuarioGuardado())
    }

    window.addEventListener('storage', sincronizarSesion)

    return () => window.removeEventListener('storage', sincronizarSesion)
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
    setUsuarioGuardado(null)
    navigate('/')
  }

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

      {usuarioGuardado ? (
        <div className="auth-actions auth-user">
          <div className="user-avatar" aria-label="Usuario autenticado" title="Usuario autenticado">
            <UserIcon />
          </div>
          <button type="button" className="btn btn-outline auth-logout" onClick={cerrarSesion}>
            Salir
          </button>
        </div>
      ) : (
        <div className="auth-actions">
          <Link to="/register" className="btn btn-outline">Registrarse</Link>
          <Link to="/login" className="btn btn-solid">Iniciar sesion</Link>
        </div>
      )}
    </header>
  )
}
