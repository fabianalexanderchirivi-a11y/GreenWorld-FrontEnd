import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeCard from '../components/ChallengeCard'
import Footer from '../components/Footer'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import { getStoredToken } from '../utils/auth'
import '../styles/retos.css'

const getChallengeId = (challenge) => challenge.id || challenge.id_reto
const getChallengeName = (challenge) => challenge.name || challenge.titulo || ''
const getChallengeCategory = (challenge) => challenge.category || challenge.categoria || 'General'
const getChallengeDifficulty = (challenge) => challenge.difficulty || challenge.dificultad || 'Basico'

export default function Retos() {
  usePageTitle('Retos | Green World')

  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  const [challengeProgress, setChallengeProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [startingChallengeId, setStartingChallengeId] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [difficulty, setDifficulty] = useState('Todas')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    let isMounted = true

    const cargarRetos = async () => {
      try {
        const [respuesta, myRetosResponse] = await Promise.all([
          api.get('/retos'),
          getStoredToken()
            ? api.get('/usuarios/me/retos').catch(() => ({ data: { data: [] } }))
            : Promise.resolve({ data: { data: [] } })
        ])
        const retosRespuesta = respuesta.data?.data || respuesta.data || []
        const misRetos = myRetosResponse.data?.data || []

        if (isMounted) {
          setChallenges(Array.isArray(retosRespuesta) ? retosRespuesta : [])
          setChallengeProgress(
            Array.isArray(misRetos)
              ? Object.fromEntries(misRetos.map((challenge) => [getChallengeId(challenge), challenge]))
              : {}
          )
          setError('')
        }
      } catch (challengesError) {
        if (isMounted) {
          setError(
            challengesError.response?.data?.message ||
            'No se pudieron cargar los retos'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    cargarRetos()

    return () => {
      isMounted = false
    }
  }, [])

  const allCategories = useMemo(() => (
    ['Todas', ...new Set(challenges.map((challenge) => getChallengeCategory(challenge)))]
  ), [challenges])

  const allDifficulties = useMemo(() => (
    ['Todas', ...new Set(challenges.map((challenge) => getChallengeDifficulty(challenge)))]
  ), [challenges])

  const filteredChallenges = useMemo(() => challenges
    .filter((challenge) => {
      const normalizedSearch = search.toLowerCase()
      const matchesSearch =
        getChallengeName(challenge).toLowerCase().includes(normalizedSearch) ||
        getChallengeCategory(challenge).toLowerCase().includes(normalizedSearch)
      const matchesCategory = category === 'Todas' || getChallengeCategory(challenge) === category
      const matchesDifficulty = difficulty === 'Todas' || getChallengeDifficulty(challenge) === difficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((firstChallenge, secondChallenge) => {
      if (sortBy === 'difficulty') {
        const levels = { Basico: 1, Intermedio: 2, Avanzado: 3 }
        return (levels[getChallengeDifficulty(firstChallenge)] || 0) - (levels[getChallengeDifficulty(secondChallenge)] || 0)
      }

      if (sortBy === 'category') {
        return getChallengeCategory(firstChallenge).localeCompare(getChallengeCategory(secondChallenge))
      }

      return getChallengeName(firstChallenge).localeCompare(getChallengeName(secondChallenge))
    }), [category, challenges, difficulty, search, sortBy])

  const getChallengeState = (challenge) => (
    challengeProgress[getChallengeId(challenge)]?.estado_progreso || 'sin_iniciar'
  )

  const getActionLabel = (challenge) => {
    if (!getStoredToken()) {
      return 'Iniciar sesion para participar'
    }

    const estado = getChallengeState(challenge)

    if (estado === 'en_progreso') {
      return 'Reto en progreso'
    }

    if (estado === 'terminado') {
      return 'Reto terminado'
    }

    return 'Iniciar reto'
  }

  const handleChallengeAction = async (challenge) => {
    const idReto = getChallengeId(challenge)

    if (!getStoredToken()) {
      navigate('/login')
      return
    }

    if (getChallengeState(challenge) !== 'sin_iniciar') {
      return
    }

    setStartingChallengeId(idReto)
    setError('')

    try {
      const respuesta = await api.post(`/retos/${idReto}/iniciar`)
      const progreso = respuesta.data?.data

      setChallengeProgress((currentProgress) => ({
        ...currentProgress,
        [idReto]: progreso || {
          id_reto: idReto,
          estado_progreso: 'en_progreso'
        }
      }))
    } catch (challengeError) {
      setError(challengeError.response?.data?.message || 'No se pudo iniciar el reto')
    } finally {
      setStartingChallengeId(null)
    }
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

        {loading && <p className="challenges-empty">Cargando retos...</p>}
        {!loading && error && <p className="challenges-empty">{error}</p>}
        {!loading && !error && filteredChallenges.length > 0 ? (
          <div className="challenges-grid">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={getChallengeId(challenge)}
                challenge={challenge}
                actionLabel={startingChallengeId === getChallengeId(challenge) ? 'Iniciando...' : getActionLabel(challenge)}
                actionDisabled={
                  startingChallengeId === getChallengeId(challenge) ||
                  getChallengeState(challenge) === 'en_progreso' ||
                  getChallengeState(challenge) === 'terminado'
                }
                onAction={() => handleChallengeAction(challenge)}
              />
            ))}
          </div>
        ) : null}
        {!loading && !error && filteredChallenges.length === 0 && (
          <p className="challenges-empty">
            No encontramos retos con esos filtros o aun no hay retos activos.
          </p>
        )}
      </section>

      <Footer />
    </main>
  )
}
