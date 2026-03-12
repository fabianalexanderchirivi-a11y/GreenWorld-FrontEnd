import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Docentes from './page/Docentes'
import Estudiantes from './page/Estudiantes'
import Principal from './page/Principal'
import Retos from './page/Retos'

function App() {

  return (
    <>
      <Router>
        <Menu/>
        <Routes>
          <Route path ="/" element= {<Principal />}/>
          <Route path ="/docentes" element= {<Docentes />}/>
          <Route path ="/estudiantes" element= {<Estudiantes/>}/>
          <Route path ="/retos" element= {<Retos/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
