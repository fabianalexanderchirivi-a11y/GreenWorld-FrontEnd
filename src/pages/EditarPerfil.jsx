import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import { clearSession, getStoredUser, setStoredUser } from '../utils/auth'
import '../styles/admin.css'

export default function EditarPerfil() {
  usePageTitle('Editar perfil')

  const navigate = useNavigate()
  const usuario = getStoredUser()
  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || ''
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const respuesta = await api.put('/usuarios/me', form)
      const updatedUser = {
        ...usuario,
        ...(respuesta.data?.data || {}),
        nombre: form.nombre,
        apellido: form.apellido
      }

      setStoredUser(updatedUser)
      window.dispatchEvent(new Event('storage'))
      setMessage('Perfil actualizado correctamente')
    } catch (profileError) {
      setError(profileError.response?.data?.message || 'No se pudo actualizar tu perfil')
    } finally {
      setSaving(false)
    }
  }

  const deleteAccount = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar tu cuenta? Tu usuario quedará inactivo y se cerrará la sesión.')) {
      return
    }

    setDeleting(true)
    setMessage('')
    setError('')

    try {
      await api.delete('/usuarios/me')
      clearSession()
      window.alert('Tu cuenta fue desactivada correctamente.')
      navigate('/login', { replace: true })
    } catch (accountError) {
      setError(accountError.response?.data?.message || 'No se pudo desactivar tu cuenta')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <main className="admin-page">
      <section className="profile-panel">
        <aside className="profile-sidebar" aria-label="Menu personal">
          <Link className="profile-nav-link" to="/panel-usuario">Inicio</Link>
          <Link className="profile-nav-link" to="/mis-cursos">Mis cursos</Link>
          <Link className="profile-nav-link" to="/mis-retos">Mis retos</Link>
        </aside>

        <section className="profile-main">
          <div className="profile-heading">
            <h1>Editar perfil</h1>
            <p>Actualiza tus datos personales o desactiva tu cuenta.</p>
          </div>

          <form className="admin-form edit-profile-form" onSubmit={saveProfile}>
            <label>
              Nombre
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </label>
            <label>
              Apellido
              <input name="apellido" value={form.apellido} onChange={handleChange} required />
            </label>
            <label>
              Correo
              <input value={usuario?.correo || ''} readOnly />
            </label>

            {message && <p className="admin-state admin-success">{message}</p>}
            {error && <p className="admin-state admin-error">{error}</p>}

            <div className="admin-form-actions">
              <button type="submit" className="btn btn-solid" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <Link className="btn btn-outline" to="/panel-usuario">Cancelar</Link>
            </div>
          </form>

          <section className="profile-danger-zone" aria-label="Zona de peligro">
            <div>
              <h3>Eliminar mi cuenta</h3>
              <p>Tu cuenta quedará inactiva, se cerrará la sesión y no podrás volver a iniciar sesión con este usuario.</p>
            </div>
            <button type="button" className="btn btn-danger" disabled={deleting} onClick={deleteAccount}>
              {deleting ? 'Eliminando...' : 'Eliminar mi cuenta'}
            </button>
          </section>
        </section>
      </section>
    </main>
  )
}
