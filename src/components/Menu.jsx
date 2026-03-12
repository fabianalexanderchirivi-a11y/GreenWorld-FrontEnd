import { Link } from 'react-router-dom'

export default function Menu() {
  const banner2 = 'https://t3.ftcdn.net/jpg/06/55/70/02/360_F_655700268_KLwcLsPKeGnSUAb19cfcpzz11Lwh7AgR.jpg'

  return (
    <>
      <header>
        <img src={banner2} alt="Banner" />
      </header>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/docentes">Cursos</Link>
        <Link to="/estudiantes">Certificados</Link>
        <Link to="/retos">Retos</Link>
      </nav>
    </>
  )
}