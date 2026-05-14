import { useEffect, useState } from 'react'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

export default function AdminUsuarios() {
  usePageTitle('Usuarios Admin | Green World')

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await api.get('/users')
        setUsuarios(Array.isArray(respuesta.data?.data) ? respuesta.data.data : [])
      } catch (usersError) {
        setError(usersError.response?.data?.message || 'No se pudieron cargar los usuarios')
      } finally {
        setLoading(false)
      }
    }

    cargarUsuarios()
  }, [])

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Usuarios</h1>
        <p>Consulta los usuarios registrados y su rol.</p>
      </section>

      {loading && <p className="admin-state">Cargando usuarios...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}

      {usuarios.length > 0 && (
        <div className="admin-table" role="table" aria-label="Usuarios">
          <div className="admin-table-row admin-table-head admin-table-four" role="row">
            <span>Nombre</span>
            <span>Correo</span>
            <span>Rol</span>
            <span>Estado</span>
          </div>
          {usuarios.map((usuario) => (
            <div className="admin-table-row admin-table-four" role="row" key={usuario.id_usuario}>
              <span>{usuario.nombre} {usuario.apellido}</span>
              <span>{usuario.correo}</span>
              <span>{usuario.rol || 'usuario'}</span>
              <span>{usuario.estado || 'Activo'}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
