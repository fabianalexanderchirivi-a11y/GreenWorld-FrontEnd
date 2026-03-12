import React from 'react'
import {Link} from 'react-router-dom'
import banner2 from '../img/banner2.jpg'

export default function Menu() {
  return (
    <>
    <header>
      <img src={banner2} alt="Banner" />
    </header>
      <Link to="/">Inicio </Link>
      <Link to="/docentes">Docentes </Link>
      <Link to="/estudiantes">Estudiantes </Link>
    </>
  )
}
