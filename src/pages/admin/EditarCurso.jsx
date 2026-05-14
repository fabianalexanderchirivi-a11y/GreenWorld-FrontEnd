import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

export default function EditarCurso() {
  usePageTitle('Editar Curso | Green World')

  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cargarCurso = async () => {
      try {
        const respuesta = await api.get('/courses/admin')
        const cursos = Array.isArray(respuesta.data?.data) ? respuesta.data.data : []
        const curso = cursos.find((item) => String(item.id_curso || item.id) === String(id))

        if (!curso) {
          setError('Curso no encontrado')
          return
        }

        setForm({
          titulo: curso.titulo || curso.name || '',
          descripcion: curso.descripcion || curso.description || '',
          imagen: curso.imagen || curso.image || '',
          duracion_estimada: curso.duracion_estimada || '',
          nivel: curso.nivel || curso.level || 'basico',
          categoria: curso.categoria || curso.category || '',
          estado: curso.estado || 'publicado'
        })
      } catch (courseError) {
        setError(courseError.response?.data?.message || 'No se pudo cargar el curso')
      }
    }

    cargarCurso()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.put(`/courses/${id}`, form)
      navigate('/admin/cursos')
    } catch (courseError) {
      setError(courseError.response?.data?.message || 'No se pudo editar el curso')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Editar Curso</h1>
        <p>Actualiza la informacion del curso seleccionado.</p>
      </section>

      {!form && !error && <p className="admin-state">Cargando curso...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}

      {form && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Titulo<input name="titulo" value={form.titulo} onChange={handleChange} required /></label>
          <label>Descripcion<textarea name="descripcion" value={form.descripcion} onChange={handleChange} required /></label>
          <label>Imagen<input name="imagen" value={form.imagen} onChange={handleChange} /></label>
          <label>Duracion estimada<input name="duracion_estimada" value={form.duracion_estimada} onChange={handleChange} /></label>
          <label>Nivel
            <select name="nivel" value={form.nivel} onChange={handleChange}>
              <option value="basico">basico</option>
              <option value="intermedio">intermedio</option>
              <option value="avanzado">avanzado</option>
            </select>
          </label>
          <label>Categoria<input name="categoria" value={form.categoria} onChange={handleChange} required /></label>
          <label>Estado
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="publicado">publicado</option>
              <option value="borrador">borrador</option>
              <option value="archivado">archivado</option>
            </select>
          </label>

          <button type="submit" className="btn btn-solid" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      )}
    </main>
  )
}
