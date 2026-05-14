import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import IconoLogo from '../img/IconoLogo.webp'
import { clearSession, getStoredUser } from '../utils/auth'
import '../styles/header.css'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 11.6c4.16 0 7.8 2.08 7.8 4.72 0 .7-.57 1.28-1.28 1.28H5.48c-.71 0-1.28-.58-1.28-1.28 0-2.64 3.64-4.72 7.8-4.72Z" fill="currentColor" />
  </svg>
)

export default function MainHeader() {
  const navigate = useNavigate()
  const [usuarioGuardado, setUsuarioGuardado] = useState(() => getStoredUser())
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false)
  const menuUsuarioRef = useRef(null)
  const rol = usuarioGuardado?.rol || 'usuario'
  const esAdmin = rol === 'admin'

  useEffect(() => {
    const sincronizarSesion = () => {
      setUsuarioGuardado(getStoredUser())
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
    clearSession()
    setUsuarioGuardado(null)
    setMenuUsuarioAbierto(false)
    navigate('/')
  }

  const renderNavLinks = () => {
    if (!usuarioGuardado) {
      return (
        <>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/cursos">Cursos</NavLink>
          <NavLink to="/retos">Retos</NavLink>
        </>
      )
    }

    if (esAdmin) {
      return (
        <>
          <NavLink to="/admin">Panel Admin</NavLink>
          <NavLink to="/admin/cursos">Cursos Admin</NavLink>
          <NavLink to="/admin/retos">Retos Admin</NavLink>
          <NavLink to="/admin/usuarios">Usuarios</NavLink>
        </>
      )
    }

    return (
      <>
        <NavLink to="/panel-usuario">Inicio</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/retos">Retos</NavLink>
      </>
    )
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
        {renderNavLinks()}
      </nav>

      {usuarioGuardado ? (
        <div className="auth-actions auth-user" ref={menuUsuarioRef}>
          <button
            type="button"
            className="user-avatar"
            aria-label="Abrir menu de usuario"
            aria-expanded={menuUsuarioAbierto}
            aria-haspopup="menu"
            title="Menu de usuario"
            onClick={() => setMenuUsuarioAbierto((abierto) => !abierto)}
          >
            <UserIcon />
          </button>
          {menuUsuarioAbierto && (
            <div className="user-menu" role="menu">
              <div className="user-menu-info">
                <span>{usuarioGuardado.nombre || 'Usuario'}</span>
                <small>{esAdmin ? 'Administrador' : 'Usuario'}</small>
                {usuarioGuardado.correo && <small>{usuarioGuardado.correo}</small>}
              </div>
              {!esAdmin && (
                <>
                  <Link className="user-menu-link" role="menuitem" to="/perfil" onClick={() => setMenuUsuarioAbierto(false)}>
                    Mi perfil
                  </Link>
                  <Link className="user-menu-link" role="menuitem" to="/panel-usuario" onClick={() => setMenuUsuarioAbierto(false)}>
                    Panel usuario
                  </Link>
                </>
              )}
              {esAdmin && (
                <>
                  <Link className="user-menu-link" role="menuitem" to="/admin" onClick={() => setMenuUsuarioAbierto(false)}>
                    Panel Admin
                  </Link>
                  <Link className="user-menu-link" role="menuitem" to="/admin/usuarios" onClick={() => setMenuUsuarioAbierto(false)}>
                    Usuarios
                  </Link>
                </>
              )}
              <button type="button" className="user-menu-logout" role="menuitem" onClick={cerrarSesion}>
                Cerrar sesion
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
