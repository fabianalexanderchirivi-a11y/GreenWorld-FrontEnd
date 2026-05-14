import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

const initialForm = {
  titulo: '',
  descripcion: '',
  imagen: '',
  duracion_estimada: '',
  nivel: 'basico',
  categoria: '',
  estado: 'publicado'
}

export default function CrearCurso() {
  usePageTitle('Crear Curso | Green World')

  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/courses', form)
      navigate('/admin/cursos')
    } catch (courseError) {
      setError(courseError.response?.data?.message || 'No se pudo crear el curso')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Crear Curso</h1>
        <p>Agrega un nuevo curso al catalogo de Green World.</p>
      </section>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Titulo<input name="titulo" value={form.titulo} onChange={handleChange} required /></label>
        <label>Descripcion<textarea name="descripcion" value={form.descripcion} onChange={handleChange} required /></label>
        <label>
          Imagen o nombre de archivo
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="Ejemplo: reciclaje.webp o https://..." />
          <small>Puedes usar el nombre de una imagen existente o una URL.</small>
        </label>
        <label>Duracion estimada<input name="duracion_estimada" value={form.duracion_estimada} onChange={handleChange} placeholder="2 horas" /></label>
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

        {error && <p className="admin-state admin-error">{error}</p>}
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-solid" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar curso'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/cursos')}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  )
}
