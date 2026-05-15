import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import IconoLogo from '../img/IconoLogo.webp'
import RegisterPlaceholder from '../img/banner2.png'
import '../styles/login.css'

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3.2a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 10.9c4.12 0 7.8 2.05 7.8 4.71 0 .55-.45.99-1 .99H5.2a.99.99 0 0 1-1-.99c0-2.66 3.68-4.71 7.8-4.71Z" fill="currentColor" />
  </svg>
)

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

export default function Register() {
  usePageTitle('Registro')

  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    terms: false
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const volverAtras = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target

    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const registrarUsuario = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    if (
      !formulario.nombre.trim() ||
      !formulario.apellido.trim() ||
      !formulario.correo.trim() ||
      !formulario.contrasena.trim()
    ) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formulario.contrasena.length < 8) {
      setError('La contraseña debe tener mínimo 8 caracteres')
      return
    }

    if (!formulario.terms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    setCargando(true)

    try {
      const respuesta = await api.post('/auth/register', {
        nombre: formulario.nombre.trim(),
        apellido: formulario.apellido.trim(),
        correo: formulario.correo.trim(),
        contrasena: formulario.contrasena
      })

      setMensaje(respuesta.data?.message || 'Usuario registrado correctamente')
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (registerError) {
      if (!registerError.response) {
        setError('No se pudo conectar con el servicio. Intenta de nuevo en unos minutos')
        return
      }

      setError(
        registerError.response?.data?.message ||
        registerError.response?.data?.mensaje ||
        'No se pudo registrar el usuario'
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="login-page register-page">
      <div className="login-topbar">
        <button type="button" className="login-back-button" onClick={volverAtras}>
          Volver
        </button>

        <header className="login-brand" aria-label="Logo Green World">
          <span className="brand-text">GREEN</span>
          <div className="brand-icon">
            <img id="IconoL" src={IconoLogo} alt="Logo Green World" />
          </div>
          <span className="brand-text">WORLD</span>
        </header>
      </div>

      <section className="login-layout" aria-label="Registro en la plataforma">
        <aside className="login-side" aria-hidden="true">
          <img className="login-side-image" src={RegisterPlaceholder} alt="" />
          <div className="login-side-overlay">
            <strong>Empieza tu ruta sostenible</strong>
            <p>Crea tu cuenta para guardar avances, descubrir cursos y unirte a los retos de Green World.</p>
          </div>
        </aside>

        <article className="login-card">
          <h1>Crea tu cuenta</h1>
          <p>Regístrate para aprender, participar y seguir tu progreso ambiental.</p>

          <form className="login-form" noValidate onSubmit={registrarUsuario}>
            <div className="register-form-grid">
              <label className="field-group" htmlFor="firstName">
                <span>Nombre</span>
                <div className="field-shell">
                  <i className="field-icon"><UserIcon /></i>
                  <input
                    id="firstName"
                    type="text"
                    name="nombre"
                    autoComplete="given-name"
                    placeholder="Tu nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                  />
                </div>
              </label>

              <label className="field-group" htmlFor="lastName">
                <span>Apellido</span>
                <div className="field-shell">
                  <i className="field-icon"><UserIcon /></i>
                  <input
                    id="lastName"
                    type="text"
                    name="apellido"
                    autoComplete="family-name"
                    placeholder="Tu apellido"
                    value={formulario.apellido}
                    onChange={manejarCambio}
                  />
                </div>
              </label>

              <label className="field-group field-group-full" htmlFor="registerEmail">
                <span>Correo electrónico</span>
                <div className="field-shell">
                  <i className="field-icon"><MailIcon /></i>
                  <input
                    id="registerEmail"
                    type="email"
                    name="correo"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={formulario.correo}
                    onChange={manejarCambio}
                  />
                </div>
              </label>

              <label className="field-group" htmlFor="registerPassword">
                <span>Contraseña</span>
                <div className="field-shell">
                  <i className="field-icon"><LockIcon /></i>
                  <input
                    id="registerPassword"
                    type="password"
                    name="contrasena"
                    autoComplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    value={formulario.contrasena}
                    onChange={manejarCambio}
                  />
                </div>
              </label>

              <label className="field-group" htmlFor="confirmPassword">
                <span>Confirmar contraseña</span>
                <div className="field-shell">
                  <i className="field-icon"><LockIcon /></i>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmarContrasena"
                    autoComplete="new-password"
                    placeholder="Repite tu contraseña"
                    value={formulario.confirmarContrasena}
                    onChange={manejarCambio}
                  />
                </div>
              </label>
            </div>

            <label className="remember-row terms-row" htmlFor="terms">
              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formulario.terms}
                onChange={manejarCambio}
              />
              <span>Acepto los términos y condiciones para crear mi cuenta.</span>
            </label>

            {error && <p className="login-error">{error}</p>}
            {mensaje && <p className="login-signup">{mensaje}</p>}

            <button type="submit" className="btn btn-solid login-submit" disabled={cargando}>
              {cargando ? 'Registrando...' : 'Crear cuenta'}
            </button>

            <p className="login-signup">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </article>
      </section>
    </main>
  )
}
