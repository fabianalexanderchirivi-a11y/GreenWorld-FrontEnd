import { Link } from 'react-router-dom'
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

export default function AdminDashboard() {
  usePageTitle('Panel Admin | Green World')

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Panel Admin</h1>
        <p>Gestiona cursos, retos y usuarios de Green World.</p>
      </section>

      <section className="admin-actions-grid" aria-label="Acciones administrativas">
        <Link to="/admin/cursos" className="admin-action">
          <span className="admin-action-icon"><BookIcon /></span>
          <span>Cursos</span>
        </Link>
        <Link to="/admin/retos" className="admin-action">
          <span className="admin-action-icon"><TrophyIcon /></span>
          <span>Retos</span>
        </Link>
        <Link to="/admin/usuarios" className="admin-action">
          <span className="admin-action-icon"><UsersIcon /></span>
          <span>Usuarios</span>
        </Link>
      </section>
    </main>
  )
}
