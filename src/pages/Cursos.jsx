import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import { getStoredToken } from '../utils/auth'
import '../styles/cursos.css'

const getCourseId = (course) => course.id || course.id_curso
const getCourseName = (course) => course.name || course.titulo || ''
const getCourseLevel = (course) => course.level || course.nivel || ''
const getCourseCategory = (course) => course.category || course.categoria || 'General'

export default function Cursos() {
  usePageTitle('Cursos | Green World')

  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [courseProgress, setCourseProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [startingCourseId, setStartingCourseId] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    let isMounted = true

    const cargarCursos = async () => {
      try {
        const [respuesta, myCoursesResponse] = await Promise.all([
          api.get('/courses'),
          getStoredToken()
            ? api.get('/usuarios/me/cursos').catch(() => ({ data: { data: [] } }))
            : Promise.resolve({ data: { data: [] } })
        ])
        const cursosRespuesta = respuesta.data?.data || respuesta.data || []
        const misCursos = myCoursesResponse.data?.data || []

        if (isMounted) {
          setCourses(Array.isArray(cursosRespuesta) ? cursosRespuesta : [])
          setCourseProgress(
            Array.isArray(misCursos)
              ? Object.fromEntries(misCursos.map((course) => [getCourseId(course), course]))
              : {}
          )
          setError('')
        }
      } catch (coursesError) {
        if (isMounted) {
          setError(
            coursesError.response?.data?.message ||
            'No se pudieron cargar los cursos'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    cargarCursos()

    return () => {
      isMounted = false
    }
  }, [])

  const getCourseState = (course) => (
    courseProgress[getCourseId(course)]?.estado_progreso || 'sin_iniciar'
  )

  const getActionLabel = (course) => {
    if (!getStoredToken()) {
      return 'Iniciar sesion para empezar'
    }

    const estado = getCourseState(course)

    if (estado === 'en_progreso') {
      return 'Continuar curso'
    }

    if (estado === 'terminado') {
      return 'Curso terminado'
    }

    return 'Iniciar curso'
  }

  const handleCourseAction = async (course) => {
    const idCurso = getCourseId(course)

    if (!getStoredToken()) {
      navigate('/login')
      return
    }

    if (getCourseState(course) !== 'sin_iniciar') {
      return
    }

    setStartingCourseId(idCurso)
    setActionError('')

    try {
      const respuesta = await api.post(`/cursos/${idCurso}/iniciar`)
      const progreso = respuesta.data?.data

      setCourseProgress((currentProgress) => ({
        ...currentProgress,
        [idCurso]: progreso || {
          id_curso: idCurso,
          estado_progreso: 'en_progreso',
          porcentaje_avance: 0
        }
      }))
    } catch (courseError) {
      setActionError(courseError.response?.data?.message || 'No se pudo iniciar el curso')
    } finally {
      setStartingCourseId(null)
    }
  }

  const allCategories = useMemo(() => (
    ['Todas', ...new Set(courses.map((course) => getCourseCategory(course)))]
  ), [courses])

  const filteredCourses = useMemo(() => courses
    .filter((course) => {
      const matchesSearch = getCourseName(course).toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Todas' || getCourseCategory(course) === category
      return matchesSearch && matchesCategory
    })
    .sort((firstCourse, secondCourse) => {
      if (sortBy === 'level') {
        const levels = { basico: 1, intermedio: 2, avanzado: 3 }
        return (levels[getCourseLevel(firstCourse).toLowerCase()] || 0) - (levels[getCourseLevel(secondCourse).toLowerCase()] || 0)
      }

      if (sortBy === 'category') {
        return getCourseCategory(firstCourse).localeCompare(getCourseCategory(secondCourse))
      }

      return getCourseName(firstCourse).localeCompare(getCourseName(secondCourse))
    }), [category, courses, search, sortBy])

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div className="courses-hero-content">
          <h1>APRENDE CON IMPACTO</h1>
          <p>
            Explora contenidos practicos sobre sostenibilidad, cuidado del planeta y acciones
            que puedes aplicar en tu dia a dia.
          </p>
        </div>
      </section>

      <section className="courses-toolbar" aria-label="Filtros de cursos">
        <label className="courses-control courses-search">
          <span>Buscar</span>
          <input
            type="text"
            placeholder="Buscar curso"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="courses-control">
          <span>Categorias</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {allCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="courses-control">
          <span>Ordenar</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Nombre</option>
            <option value="category">Categoria</option>
            <option value="level">Dificultad</option>
          </select>
        </label>
      </section>

      <section className="courses-results">
        <div className="courses-results-header">
          <h2>Catalogo de cursos</h2>
          <p>{filteredCourses.length} cursos disponibles</p>
        </div>

        {loading && <p className="courses-state">Cargando cursos...</p>}
        {!loading && error && <p className="courses-state courses-state-error">{error}</p>}
        {!loading && actionError && <p className="courses-state courses-state-error">{actionError}</p>}
        {!loading && !error && filteredCourses.length === 0 && (
          <p className="courses-state">
            No encontramos cursos con esos filtros o aun no hay cursos activos.
          </p>
        )}
        {!loading && !error && filteredCourses.length > 0 && (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={getCourseId(course)}
                course={course}
                actionLabel={startingCourseId === getCourseId(course) ? 'Iniciando...' : getActionLabel(course)}
                actionDisabled={
                  startingCourseId === getCourseId(course) ||
                  getCourseState(course) === 'en_progreso' ||
                  getCourseState(course) === 'terminado'
                }
                onAction={() => handleCourseAction(course)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
