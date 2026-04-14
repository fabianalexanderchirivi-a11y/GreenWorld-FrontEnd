import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Menu from './components/Menu'
import Docentes from './page/Docentes'
import Estudiantes from './page/Estudiantes'
import Principal from './page/Principal'
import Retos from './page/Retos'
import Login from './page/Login'

function AppContent() {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login'

  return (
    <div className={isLoginRoute ? 'route-login' : 'app-shell'}>
      {!isLoginRoute && <Menu />}
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/docentes" element={<Docentes />} />
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
