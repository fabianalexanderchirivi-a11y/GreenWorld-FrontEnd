import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import Cursos from './pages/Cursos'
import Estudiantes from './pages/Estudiantes'
import Principal from './pages/Principal'
import Retos from './pages/Retos'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles/layout.css'

function AppContent() {
  const location = useLocation()
  const isAuthRoute = ['/login', '/register'].includes(location.pathname)

  return (
    <div className={isAuthRoute ? 'route-login' : 'app-shell'}>
      {!isAuthRoute && <MainHeader />}
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/docentes" element={<Navigate to="/cursos" replace />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/retos" element={<Retos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
