import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [usuarioGuardado, setUsuarioGuardado] = useState(() => obtenerUsuarioGuardado())
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false)
  const menuUsuarioRef = useRef(null)

  useEffect(() => {
    const sincronizarSesion = () => {
      setUsuarioGuardado(obtenerUsuarioGuardado())
    }

    window.addEventListener('storage', sincronizarSesion)

    return () => window.removeEventListener('storage', sincronizarSesion)
  }, [])

  useEffect(() => {
    const cerrarMenuAlClickAfuera = (event) => {
      if (!menuUsuarioRef.current?.contains(event.target)) {
        setMenuUsuarioAbierto(false)
      }
    }

    document.addEventListener('mousedown', cerrarMenuAlClickAfuera)

    return () => document.removeEventListener('mousedown', cerrarMenuAlClickAfuera)
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('usuario')
    setUsuarioGuardado(null)
    setMenuUsuarioAbierto(false)
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
        <div className="auth-actions auth-user" ref={menuUsuarioRef}>
          <button
            type="button"
            className="user-avatar"
            aria-label="Abrir menu de usuario"
            aria-expanded={menuUsuarioAbierto}
            aria-haspopup="menu"
            title="Usuario autenticado"
            onClick={() => setMenuUsuarioAbierto((abierto) => !abierto)}
          >
            <UserIcon />
          </button>
          {menuUsuarioAbierto && (
            <div className="user-menu" role="menu">
              <div className="user-menu-info">
                <span>{usuarioGuardado.nombre || 'Usuario'}</span>
                {usuarioGuardado.correo && <small>{usuarioGuardado.correo}</small>}
              </div>
              <button type="button" className="user-menu-logout" role="menuitem" onClick={cerrarSesion}>
                Salir
              </button>
            </div>
          )}
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
