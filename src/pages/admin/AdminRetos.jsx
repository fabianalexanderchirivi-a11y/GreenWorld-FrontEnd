import { useEffect, useState } from 'react'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

const initialForm = {
  titulo: '',
  descripcion: '',
  objetivo: '',
  dificultad: 'Basico',
  categoria: '',
  estado: 'activo',
  imagen: ''
}

const getRetoId = (reto) => reto.id_reto || reto.id
const formatDifficulty = (difficulty) => (
  difficulty === 'Basico' || difficulty === 'basico' ? 'Básico' : difficulty
)

export default function AdminRetos() {
  usePageTitle('Retos Admin')

  const [retos, setRetos] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const cargarRetos = async () => {
    setLoading(true)
    setError('')

    try {
      const respuesta = await api.get('/retos/admin')
      setRetos(Array.isArray(respuesta.data?.data) ? respuesta.data.data : [])
    } catch (retosError) {
      setError(retosError.response?.data?.message || 'No se pudieron cargar los retos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarRetos()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const limpiarFormulario = () => {
    setForm(initialForm)
    setEditingId(null)
    setShowForm(false)
  }

  const crearReto = () => {
    setForm(initialForm)
    setEditingId(null)
    setShowForm(true)
  }

  const editarReto = (reto) => {
    setEditingId(getRetoId(reto))
    setShowForm(true)
    setForm({
      titulo: reto.titulo || reto.name || '',
      descripcion: reto.descripcion || reto.description || '',
      objetivo: reto.objetivo || reto.objective || '',
      dificultad: reto.dificultad || reto.difficulty || 'Basico',
      categoria: reto.categoria || reto.category || '',
      estado: reto.estado || 'activo',
      imagen: reto.imagen || reto.image || ''
    })
  }

  const guardarReto = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      if (editingId) {
        await api.put(`/retos/${editingId}`, form)
        setMessage('Reto actualizado correctamente')
      } else {
        await api.post('/retos', form)
        setMessage('Reto creado correctamente')
      }

      limpiarFormulario()
      await cargarRetos()
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo guardar el reto')
    } finally {
      setSaving(false)
    }
  }

  const desactivarReto = async (id) => {
    if (!window.confirm('¿Seguro que deseas desactivar este reto?')) {
      return
    }

    setError('')
    setMessage('')

    try {
      await api.delete(`/retos/${id}`)
      setMessage('Reto desactivado correctamente')
      await cargarRetos()
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo desactivar el reto')
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-header admin-header-row">
        <div>
          <h1>Retos Admin</h1>
          <p>Crea, edita y desactiva retos de Green World.</p>
        </div>
        <button type="button" className="btn btn-solid" onClick={crearReto}>
          Crear reto
        </button>
      </section>

      {showForm && (
        <form className="admin-form" onSubmit={guardarReto}>
          <label>Título<input name="titulo" value={form.titulo} onChange={handleChange} required /></label>
          <label>Descripción<textarea name="descripcion" value={form.descripcion} onChange={handleChange} required /></label>
          <label>Objetivo<textarea name="objetivo" value={form.objetivo} onChange={handleChange} /></label>
          <label>Dificultad
            <select name="dificultad" value={form.dificultad} onChange={handleChange}>
              <option value="Basico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </label>
          <label>Categoría<input name="categoria" value={form.categoria} onChange={handleChange} /></label>
          <label>
            Imagen o nombre de archivo
            <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="Ejemplo: Residue.webp o https://..." />
            <small>Puedes usar el nombre de una imagen existente o una URL.</small>
          </label>
          <label>Estado
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="activo">activo</option>
              <option value="inactivo">inactivo</option>
            </select>
          </label>

          <div className="admin-form-actions">
            <button type="submit" className="btn btn-solid" disabled={saving}>
              {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear reto'}
            </button>
            <button type="button" className="btn btn-outline" onClick={limpiarFormulario}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading && <p className="admin-state">Cargando retos...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}
      {message && <p className="admin-state admin-success">{message}</p>}

      {!loading && retos.length === 0 && !error && (
        <p className="admin-state">No hay retos disponibles en este momento.</p>
      )}

      {retos.length > 0 && (
        <div className="admin-table-wrap">
          <div className="admin-table" role="table" aria-label="Retos">
          <div className="admin-table-row admin-table-head" role="row">
            <span>Título</span>
            <span>Categoría</span>
            <span>Dificultad</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>
          {retos.map((reto) => (
            <div className="admin-table-row" role="row" key={getRetoId(reto)}>
              <span>{reto.titulo || reto.name}</span>
              <span>{reto.categoria || reto.category || 'General'}</span>
              <span>{formatDifficulty(reto.dificultad || reto.difficulty)}</span>
              <span>{reto.estado || 'activo'}</span>
              <span className="admin-row-actions">
                <button type="button" className="btn btn-outline" onClick={() => editarReto(reto)}>Editar</button>
                <button type="button" className="btn btn-outline" onClick={() => desactivarReto(getRetoId(reto))}>
                  Desactivar
                </button>
              </span>
            </div>
          ))}
          </div>
        </div>
      )}
    </main>
  )
}
