import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import usePageTitle from '../../hooks/usePageTitle'
import '../../styles/admin.css'

const BookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Zm2.5-.8A.8.8 0 0 0 6.7 4.5v13.17c.25-.08.52-.12.8-.12h10.8V3.7H7.5Z" fill="currentColor" />
  </svg>
)

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 3h10v2h3v2.2a5 5 0 0 1-4.06 4.91A5.01 5.01 0 0 1 13 14.9V18h3v2H8v-2h3v-3.1a5.01 5.01 0 0 1-2.94-2.79A5 5 0 0 1 4 7.2V5h3V3Zm10 4v2.85a3.2 3.2 0 0 0 1.3-2.58V6.7H17V7ZM5.7 6.7v.57A3.2 3.2 0 0 0 7 9.85V6.7H5.7Zm3-.7v4a3.3 3.3 0 1 0 6.6 0V6H8.7Z" fill="currentColor" />
  </svg>
)

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9.5 11.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.7a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Zm6.2 2.2a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm0-1.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM2.8 19.4c0-3.1 3-5.3 6.7-5.3s6.7 2.2 6.7 5.3c0 .5-.4.9-.9.9H3.7a.9.9 0 0 1-.9-.9Zm1.9-.8h9.6c-.5-1.7-2.3-2.8-4.8-2.8s-4.3 1.1-4.8 2.8Zm11.3-3.9c2.9.1 5.2 1.9 5.2 4.5 0 .5-.4.9-.9.9h-3.1c.1-.2.1-.5.1-.8 0-1.8-.7-3.4-1.9-4.5.2-.1.4-.1.6-.1Z" fill="currentColor" />
  </svg>
)

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9 2h6a2 2 0 0 1 1.73 1H19a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.27A2 2 0 0 1 9 2Zm0 2v2h6V4H9ZM5 5v15h14V5h-2v3H7V5H5Zm3 7h8v1.7H8V12Zm0 4h6v1.7H8V16Z" fill="currentColor" />
  </svg>
)

export default function AdminDashboard() {
  usePageTitle('Panel Admin')

  const [stats, setStats] = useState({
    cursos: null,
    retos: null,
    usuarios: null,
    inscripciones: null
  })

  useEffect(() => {
    let mounted = true

    const cargarEstadisticas = async () => {
      const [coursesResponse, retosResponse, usersResponse, courseEnrollmentsResponse, challengeEnrollmentsResponse] = await Promise.allSettled([
        api.get('/courses/admin'),
        api.get('/retos/admin'),
        api.get('/users'),
        api.get('/admin/inscripciones/cursos'),
        api.get('/admin/inscripciones/retos')
      ])

      if (!mounted) {
        return
      }

      const courses = coursesResponse.status === 'fulfilled' && Array.isArray(coursesResponse.value.data?.data)
        ? coursesResponse.value.data.data
        : []
      const retos = retosResponse.status === 'fulfilled' && Array.isArray(retosResponse.value.data?.data)
        ? retosResponse.value.data.data
        : []
      const users = usersResponse.status === 'fulfilled' && Array.isArray(usersResponse.value.data?.data)
        ? usersResponse.value.data.data
        : []
      const courseEnrollments = courseEnrollmentsResponse.status === 'fulfilled' && Array.isArray(courseEnrollmentsResponse.value.data?.data)
        ? courseEnrollmentsResponse.value.data.data
        : []
      const challengeEnrollments = challengeEnrollmentsResponse.status === 'fulfilled' && Array.isArray(challengeEnrollmentsResponse.value.data?.data)
        ? challengeEnrollmentsResponse.value.data.data
        : []

      setStats({
        cursos: courses.filter((course) => String(course.estado || '').toLowerCase() !== 'inactivo').length,
        retos: retos.filter((reto) => String(reto.estado || '').toLowerCase() !== 'inactivo').length,
        usuarios: users.length,
        inscripciones: courseEnrollments.length + challengeEnrollments.length
      })
    }

    cargarEstadisticas()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Panel Admin</h1>
        <p>Gestiona cursos, retos y usuarios de Green World.</p>
      </section>

      <section className="admin-actions-grid" aria-label="Acciones administrativas">
        <Link to="/admin/cursos" className="admin-action">
          <span className="admin-action-icon"><BookIcon /></span>
          <span className="admin-action-content">
            <strong>Cursos</strong>
            <small>Gestiona el catálogo de cursos ambientales.</small>
            <em>{stats.cursos ?? '-'} cursos activos</em>
          </span>
        </Link>
        <Link to="/admin/retos" className="admin-action">
          <span className="admin-action-icon"><TrophyIcon /></span>
          <span className="admin-action-content">
            <strong>Retos</strong>
            <small>Crea y administra retos sostenibles.</small>
            <em>{stats.retos ?? '-'} retos activos</em>
          </span>
        </Link>
        <Link to="/admin/usuarios" className="admin-action">
          <span className="admin-action-icon"><UsersIcon /></span>
          <span className="admin-action-content">
            <strong>Usuarios</strong>
            <small>Consulta usuarios registrados y estados.</small>
            <em>{stats.usuarios ?? '-'} usuarios registrados</em>
          </span>
        </Link>
        <Link to="/admin/inscripciones" className="admin-action">
          <span className="admin-action-icon"><ClipboardIcon /></span>
          <span className="admin-action-content">
            <strong>Inscripciones</strong>
            <small>Revisa avances y participaciones de usuarios.</small>
            <em>{stats.inscripciones ?? '-'} registros</em>
          </span>
        </Link>
      </section>
    </main>
  )
}
