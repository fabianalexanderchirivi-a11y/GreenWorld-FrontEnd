import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import { resolveImage } from '../utils/imageResolver'
import '../styles/admin.css'

export default function MisCursos() {
  usePageTitle('Mis Cursos')

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const respuesta = await api.get('/usuarios/me/cursos')
        setCourses(Array.isArray(respuesta.data?.data) ? respuesta.data.data : [])
      } catch (coursesError) {
        setError(coursesError.response?.data?.message || 'No se pudieron cargar tus cursos')
      } finally {
        setLoading(false)
      }
    }

    cargarCursos()
  }, [])

  const cursosEnProgreso = useMemo(
    () => courses.filter((course) => course.estado_progreso === 'en_progreso'),
    [courses]
  )
  const cursosTerminados = useMemo(
    () => courses.filter((course) => course.estado_progreso === 'terminado'),
    [courses]
  )

  const cancelarCurso = async (course) => {
    const idCurso = course.id_curso

    setCancelingId(idCurso)
    setError('')

    try {
      await api.put(`/cursos/${idCurso}/cancelar`)
      setCourses((currentCourses) => currentCourses.filter((item) => item.id_curso !== idCurso))
    } catch (courseError) {
      setError(courseError.response?.data?.message || 'No se pudo cancelar el curso')
    } finally {
      setCancelingId(null)
    }
  }

  const renderCourseCard = (course) => {
    const progress = Number(course.porcentaje_avance || (course.estado_progreso === 'terminado' ? 100 : 0))

    return (
      <article className="user-progress-card user-progress-card-visual" key={course.id_inscripcion || course.id_curso}>
        <img className="user-progress-image" src={resolveImage(course.imagen || course.image)} alt={course.titulo} />
        <div className="user-progress-body">
          <h3>{course.titulo}</h3>
          <p>{course.descripcion}</p>
        </div>
        <div className="user-progress-meta">
          <span>Estado: {course.estado_progreso === 'terminado' ? 'Terminado' : 'En progreso'}</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-bar" aria-label={`Avance ${progress}%`}>
          <span style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        {course.estado_progreso === 'en_progreso' ? (
          <div className="user-progress-actions">
            <Link to={`/cursos/${course.id_curso}`} className="btn btn-solid">Continuar</Link>
            <button
              type="button"
              className="btn btn-outline"
              disabled={cancelingId === course.id_curso}
              onClick={() => cancelarCurso(course)}
            >
              {cancelingId === course.id_curso ? 'Cancelando...' : 'Cancelar curso'}
            </button>
          </div>
        ) : (
          <span className="user-progress-badge">Terminado</span>
        )}
      </article>
    )
  }

  return (
    <main className="admin-page">
      <section className="profile-panel">
        <aside className="profile-sidebar" aria-label="Menú personal">
          <Link className="profile-nav-link" to="/panel-usuario">Inicio</Link>
          <Link className="profile-nav-link is-active" to="/mis-cursos">Mis cursos</Link>
          <Link className="profile-nav-link" to="/mis-retos">Mis retos</Link>
        </aside>

        <section className="profile-main">
          <section className="admin-header">
            <h1>Mis cursos</h1>
            <p>Consulta tus cursos iniciados y el avance de cada uno.</p>
          </section>

          {loading && <p className="admin-state">Cargando tus cursos...</p>}
          {error && <p className="admin-state admin-error">{error}</p>}

          {!loading && !error && (
            <section className="user-progress-layout">
              <div className="user-progress-section">
                <h2>Cursos en progreso</h2>
                {cursosEnProgreso.length > 0 ? (
                  <div className="user-progress-grid">
                    {cursosEnProgreso.map(renderCourseCard)}
                  </div>
                ) : (
                  <p className="admin-state">No tienes cursos en progreso todavía.</p>
                )}
              </div>

              <div className="user-progress-section">
                <h2>Cursos terminados</h2>
                {cursosTerminados.length > 0 ? (
                  <div className="user-progress-grid">
                    {cursosTerminados.map(renderCourseCard)}
                  </div>
                ) : (
                  <p className="admin-state">No tienes cursos terminados todavía.</p>
                )}
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  )
}
