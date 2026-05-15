import { useEffect, useMemo, useState } from 'react'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

const normalizeText = (value) => String(value || '').trim().toLowerCase()

const formatDate = (value) => {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getUserName = (item) => `${item.nombre || ''} ${item.apellido || ''}`.trim() || 'Usuario'
const formatProgressState = (state) => {
  if (state === 'en_progreso') return 'En progreso'
  if (state === 'terminado') return 'Terminado'
  if (state === 'cancelado') return 'Cancelado'
  if (state === 'completado') return 'Terminado'
  return state || '-'
}

function EnrollmentTable({ type, items, onViewDetail }) {
  const isCourses = type === 'cursos'

  return (
    <div className="admin-table-wrap">
      <div className="admin-table" role="table" aria-label={isCourses ? 'Inscripciones de cursos' : 'Inscripciones de retos'}>
        <div className="admin-table-row admin-table-head admin-table-enrollments" role="row">
          <span>Usuario</span>
          <span>Correo</span>
          <span>{isCourses ? 'Curso' : 'Reto'}</span>
          <span>Estado</span>
          <span>Avance</span>
          <span>Inicio</span>
          <span>Finalización</span>
          <span>Acciones</span>
        </div>
        {items.map((item) => {
          const id = isCourses ? item.id_inscripcion : item.id_usuario_reto

          return (
            <div className="admin-table-row admin-table-enrollments" role="row" key={`${type}-${id}`}>
              <span>{getUserName(item)}</span>
              <span>{item.correo}</span>
              <span>{isCourses ? item.curso : item.reto}</span>
              <span>{formatProgressState(item.estado_progreso)}</span>
              <span>{isCourses ? `${Number(item.porcentaje_avance || 0)}%` : '-'}</span>
              <span>{formatDate(item.fecha_inicio)}</span>
              <span>{formatDate(item.fecha_finalizacion)}</span>
              <span className="admin-row-actions">
                <button type="button" className="btn btn-outline" onClick={() => onViewDetail(item)}>
                  Ver detalle
                </button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AdminInscripciones() {
  usePageTitle('Inscripciones Admin')

  const [activeTab, setActiveTab] = useState('cursos')
  const [courseEnrollments, setCourseEnrollments] = useState([])
  const [challengeEnrollments, setChallengeEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [itemFilter, setItemFilter] = useState('todos')
  const [stateFilter, setStateFilter] = useState('todos')
  const [selectedDetail, setSelectedDetail] = useState(null)

  useEffect(() => {
    let mounted = true

    const cargarInscripciones = async () => {
      try {
        const [coursesResponse, challengesResponse] = await Promise.all([
          api.get('/admin/inscripciones/cursos'),
          api.get('/admin/inscripciones/retos')
        ])

        if (!mounted) {
          return
        }

        setCourseEnrollments(Array.isArray(coursesResponse.data?.data) ? coursesResponse.data.data : [])
        setChallengeEnrollments(Array.isArray(challengesResponse.data?.data) ? challengesResponse.data.data : [])
        setError('')
      } catch (enrollmentsError) {
        if (mounted) {
          setError(enrollmentsError.response?.data?.message || 'No se pudieron cargar las inscripciones')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    cargarInscripciones()

    return () => {
      mounted = false
    }
  }, [])

  const activeItems = activeTab === 'cursos' ? courseEnrollments : challengeEnrollments
  const activeItemName = activeTab === 'cursos' ? 'curso' : 'reto'

  const itemOptions = useMemo(() => (
    ['todos', ...new Set(activeItems.map((item) => item[activeItemName]).filter(Boolean))]
  ), [activeItemName, activeItems])

  const filteredItems = useMemo(() => activeItems.filter((item) => {
    const normalizedSearch = normalizeText(search)
    const userName = normalizeText(getUserName(item))
    const email = normalizeText(item.correo)
    const itemName = item[activeItemName]
    const state = normalizeText(item.estado_progreso)

    const matchesSearch = !normalizedSearch || userName.includes(normalizedSearch) || email.includes(normalizedSearch)
    const matchesItem = itemFilter === 'todos' || itemName === itemFilter
    const matchesState = stateFilter === 'todos' || state === stateFilter

    return matchesSearch && matchesItem && matchesState
  }), [activeItemName, activeItems, itemFilter, search, stateFilter])

  const changeTab = (tab) => {
    setActiveTab(tab)
    setItemFilter('todos')
    setSelectedDetail(null)
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Inscripciones Admin</h1>
        <p>Consulta la participación de usuarios en cursos y retos.</p>
      </section>

      <div className="admin-tabs" role="tablist" aria-label="Tipo de inscripciones">
        <button type="button" className={activeTab === 'cursos' ? 'is-active' : ''} onClick={() => changeTab('cursos')}>
          Cursos
        </button>
        <button type="button" className={activeTab === 'retos' ? 'is-active' : ''} onClick={() => changeTab('retos')}>
          Retos
        </button>
      </div>

      {loading && <p className="admin-state">Cargando inscripciones...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}

      {!loading && !error && (
        <>
          <section className="admin-filters" aria-label="Filtros de inscripciones">
            <label>
              <span>Buscar</span>
              <input
                type="text"
                placeholder="Usuario o correo"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label>
              <span>{activeTab === 'cursos' ? 'Curso' : 'Reto'}</span>
              <select value={itemFilter} onChange={(event) => setItemFilter(event.target.value)}>
                {itemOptions.map((option) => (
                  <option key={option} value={option}>{option === 'todos' ? 'Todos' : option}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Estado</span>
              <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
                <option value="todos">Todos</option>
                <option value="en_progreso">En progreso</option>
                <option value="terminado">Terminado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </label>
          </section>

          {filteredItems.length > 0 ? (
            <EnrollmentTable type={activeTab} items={filteredItems} onViewDetail={setSelectedDetail} />
          ) : (
            <p className="admin-state">No se encontraron inscripciones con esos filtros.</p>
          )}
        </>
      )}

      {selectedDetail && (
        <section className="admin-detail-panel" aria-label="Detalle de inscripción">
          <div>
            <h2>{getUserName(selectedDetail)}</h2>
            <p>{selectedDetail.correo}</p>
          </div>
          <dl>
            <div><dt>{activeTab === 'cursos' ? 'Curso' : 'Reto'}</dt><dd>{selectedDetail[activeItemName]}</dd></div>
            <div><dt>Estado</dt><dd>{formatProgressState(selectedDetail.estado_progreso)}</dd></div>
            {activeTab === 'cursos' && <div><dt>Avance</dt><dd>{Number(selectedDetail.porcentaje_avance || 0)}%</dd></div>}
            <div><dt>Inicio</dt><dd>{formatDate(selectedDetail.fecha_inicio)}</dd></div>
            <div><dt>Finalización</dt><dd>{formatDate(selectedDetail.fecha_finalizacion)}</dd></div>
          </dl>
          <button type="button" className="btn btn-outline" onClick={() => setSelectedDetail(null)}>
            Cerrar detalle
          </button>
        </section>
      )}
    </main>
  )
}
