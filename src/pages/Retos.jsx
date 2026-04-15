import { useState } from 'react'
import ChallengeCard from '../components/ChallengeCard'
import Footer from '../components/Footer'
import { challenges } from '../data/challenges'
import '../styles/retos.css'

const allCategories = ['Todas', ...new Set(challenges.map((challenge) => challenge.category))]
const allDifficulties = ['Todas', ...new Set(challenges.map((challenge) => challenge.difficulty))]

export default function Retos() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [difficulty, setDifficulty] = useState('Todas')
  const [sortBy, setSortBy] = useState('name')
  const [completedIds, setCompletedIds] = useState([])

  const filteredChallenges = challenges
    .filter((challenge) => {
      const normalizedSearch = search.toLowerCase()
      const matchesSearch =
        challenge.name.toLowerCase().includes(normalizedSearch) ||
        challenge.category.toLowerCase().includes(normalizedSearch)
      const matchesCategory = category === 'Todas' || challenge.category === category
      const matchesDifficulty = difficulty === 'Todas' || challenge.difficulty === difficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((firstChallenge, secondChallenge) => {
      if (sortBy === 'difficulty') {
        const levels = { Basico: 1, Intermedio: 2, Avanzado: 3 }
        return levels[firstChallenge.difficulty] - levels[secondChallenge.difficulty]
      }

      if (sortBy === 'category') {
        return firstChallenge.category.localeCompare(secondChallenge.category)
      }

      return firstChallenge.name.localeCompare(secondChallenge.name)
    })

  const handleToggleCompleted = (challengeId) => {
    setCompletedIds((currentIds) =>
      currentIds.includes(challengeId)
        ? currentIds.filter((currentId) => currentId !== challengeId)
        : [...currentIds, challengeId]
    )
  }

  return (
    <main className="challenges-page">
      <section className="challenges-hero">
        <div className="challenges-hero-content">
          <h1>RETOS SOSTENIBLES</h1>
          <p>
            Pon en practica acciones ecologicas simples, fortalece tus habitos y genera
            impacto positivo desde tu rutina diaria.
          </p>
        </div>
      </section>

      <section className="challenges-toolbar" aria-label="Filtros de retos">
        <label className="challenges-control">
          <span>Buscar</span>
          <input
            type="text"
            placeholder="Buscar reto"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label className="challenges-control">
          <span>Categorias</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {allCategories.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="challenges-control">
          <span>Dificultad</span>
          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            {allDifficulties.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="challenges-control">
          <span>Ordenar</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Nombre</option>
            <option value="category">Categoria</option>
            <option value="difficulty">Dificultad</option>
          </select>
        </label>
      </section>

      <section className="challenges-results">
        <div className="challenges-results-header">
          <h2>Retos disponibles</h2>
          <p>{filteredChallenges.length} retos para comenzar</p>
        </div>

        {filteredChallenges.length > 0 ? (
          <div className="challenges-grid">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isCompleted={completedIds.includes(challenge.id)}
                onToggleCompleted={() => handleToggleCompleted(challenge.id)}
              />
            ))}
          </div>
        ) : (
          <p className="challenges-empty">
            No encontramos retos con esos filtros. Prueba otra busqueda o categoria.
          </p>
        )}
      </section>

      <Footer />
    </main>
  )
}
