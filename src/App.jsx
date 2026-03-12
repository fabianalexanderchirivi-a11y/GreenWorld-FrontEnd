import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Docentes from './pages/Docentes'
import Estudiantes from './pages/Estudiantes'
import Principal from './pages/Principal'

function App() {
  
  return (
    <>
      <Router>
          <Menu/>
          <Routes>
            <Route path='/' element={<Principal />}/>
            <Route path='/docentes' element={<Docentes />}/>
            <Route path='/estudiantes' element={<Estudiantes />}/>
          </Routes>
          
      </Router>
    </>
  )
}

export default App
