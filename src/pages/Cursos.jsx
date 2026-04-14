import { useState } from 'react'
import Footer from '../components/layout/Footer'
import CourseCard from '../components/courses/CourseCard'
import { courses } from '../data/courses'
import '../styles/pages/courses.css'

const allCategories = ['Todas', ...new Set(courses.map((course) => course.category))]

export default function Cursos() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [sortBy, setSortBy] = useState('name')

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Todas' || course.category === category
      return matchesSearch && matchesCategory
    })
    .sort((firstCourse, secondCourse) => {
      if (sortBy === 'level') {
        const levels = { Basico: 1, Intermedio: 2, Avanzado: 3 }
        return levels[firstCourse.level] - levels[secondCourse.level]
      }

      if (sortBy === 'category') {
        return firstCourse.category.localeCompare(secondCourse.category)
      }

      return firstCourse.name.localeCompare(secondCourse.name)
    })

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <div>
          <h1>Aprende con impacto</h1>
          <p>
            Explora contenidos practicos sobre sostenibilidad, cuidado del planeta y acciones
            que puedes aplicar en tu dia a dia.
          </p>
        </div>
      </section>

      <section className="courses-toolbar" aria-label="Filtros de cursos">
        <label className="courses-control courses-search">
          <span>Buscar</span>
          <input
            type="text"
            placeholder="Buscar curso"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="courses-control">
          <span>Categorias</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {allCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="courses-control">
          <span>Ordenar</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Nombre</option>
            <option value="category">Categoria</option>
            <option value="level">Dificultad</option>
          </select>
        </label>
      </section>

      <section className="courses-results">
        <div className="courses-results-header">
          <h2>Catalogo de cursos</h2>
          <p>{filteredCourses.length} cursos disponibles</p>
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
