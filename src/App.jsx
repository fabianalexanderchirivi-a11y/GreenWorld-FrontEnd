import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MainHeader from './components/layout/MainHeader'
import Cursos from './pages/Cursos'
import Estudiantes from './pages/Estudiantes'
import Principal from './pages/Principal'
import Retos from './pages/Retos'
import Login from './pages/Login'
import './styles/layout.css'

function AppContent() {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login'

  return (
    <div className={isLoginRoute ? 'route-login' : 'app-shell'}>
      {!isLoginRoute && <MainHeader />}
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/docentes" element={<Navigate to="/cursos" replace />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/retos" element={<Retos />} />
        <Route path="/login" element={<Login />} />
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
