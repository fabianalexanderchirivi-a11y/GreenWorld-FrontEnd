import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

const normalizeText = (value) => String(value || '').trim().toLowerCase()
const formatRole = (role) => normalizeText(role) === 'admin' ? 'Admin' : 'Usuario'
const formatState = (state) => normalizeText(state) === 'inactivo' ? 'Inactivo' : 'Activo'

export default function AdminUsuarios() {
  usePageTitle('Usuarios Admin | Green World')

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('todos')
  const [stateFilter, setStateFilter] = useState('todos')

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

  const filteredUsers = useMemo(() => usuarios.filter((usuario) => {
    const normalizedSearch = normalizeText(search)
    const fullName = normalizeText(`${usuario.nombre || ''} ${usuario.apellido || ''}`)
    const email = normalizeText(usuario.correo)
    const role = normalizeText(usuario.rol || 'usuario')
    const state = normalizeText(formatState(usuario.estado))

    const matchesSearch = !normalizedSearch || fullName.includes(normalizedSearch) || email.includes(normalizedSearch)
    const matchesRole = roleFilter === 'todos' || role === roleFilter
    const matchesState = stateFilter === 'todos' || state === stateFilter

    return matchesSearch && matchesRole && matchesState
  }), [roleFilter, search, stateFilter, usuarios])

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Usuarios</h1>
        <p>Consulta los usuarios registrados y su rol.</p>
      </section>

      {loading && <p className="admin-state">Cargando usuarios...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}

      {!loading && !error && (
        <section className="admin-filters" aria-label="Filtros de usuarios">
          <label>
            <span>Buscar</span>
            <input
              type="text"
              placeholder="Nombre o correo"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label>
            <span>Rol</span>
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="todos">Todos</option>
              <option value="admin">admin</option>
              <option value="usuario">usuario</option>
            </select>
          </label>
          <label>
            <span>Estado</span>
            <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
              <option value="todos">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </label>
        </section>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <p className="admin-state">No se encontraron usuarios con esos filtros.</p>
      )}

      {filteredUsers.length > 0 && (
        <div className="admin-table-wrap">
          <div className="admin-table" role="table" aria-label="Usuarios">
          <div className="admin-table-row admin-table-head admin-table-four" role="row">
            <span>Nombre</span>
            <span>Correo</span>
            <span>Rol</span>
            <span>Estado</span>
          </div>
          {filteredUsers.map((usuario) => (
            <div className="admin-table-row admin-table-four" role="row" key={usuario.id_usuario}>
              <span>{usuario.nombre} {usuario.apellido}</span>
              <span>{usuario.correo}</span>
              <span>{formatRole(usuario.rol)}</span>
              <span>{formatState(usuario.estado)}</span>
            </div>
          ))}
          </div>
        </div>
      )}
    </main>
  )
}
