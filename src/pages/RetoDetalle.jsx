import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import { getStoredToken } from '../utils/auth'
import { resolveImage } from '../utils/imageResolver'
import '../styles/detail.css'

const getRetoId = (reto) => reto.id_reto || reto.id
const getProgressLabel = (estado) => {
  if (estado === 'terminado') return 'Terminado'
  if (estado === 'en_progreso') return 'En progreso'
  return 'Sin iniciar'
}

export default function RetoDetalle() {
  usePageTitle('Detalle de reto | Green World')

  const { id } = useParams()
  const navigate = useNavigate()
  const [reto, setReto] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const estado = progress?.estado_progreso || 'sin_iniciar'

  useEffect(() => {
    let mounted = true

    const cargarDetalle = async () => {
      try {
        const [retosResponse, myRetosResponse] = await Promise.all([
          api.get('/retos'),
          getStoredToken()
            ? api.get('/usuarios/me/retos').catch(() => ({ data: { data: [] } }))
            : Promise.resolve({ data: { data: [] } })
        ])

        if (!mounted) return

        const retos = Array.isArray(retosResponse.data?.data) ? retosResponse.data.data : []
        const selectedReto = retos.find((item) => String(getRetoId(item)) === String(id))
        const userRetos = Array.isArray(myRetosResponse.data?.data) ? myRetosResponse.data.data : []
        const selectedProgress = userRetos.find((item) => String(getRetoId(item)) === String(id))

        setReto(selectedReto || null)
        setProgress(selectedProgress || null)
        setError(selectedReto ? '' : 'Reto no encontrado')
      } catch (retoError) {
        if (mounted) {
          setError(retoError.response?.data?.message || 'No se pudo cargar el reto')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    cargarDetalle()

    return () => {
      mounted = false
    }
  }, [id])

  const startReto = async () => {
    if (!getStoredToken()) {
      navigate('/login')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await api.post(`/retos/${id}/iniciar`)
      setProgress(response.data?.data || { id_reto: id, estado_progreso: 'en_progreso' })
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo iniciar el reto')
    } finally {
      setSaving(false)
    }
  }

  const finishReto = async () => {
    setSaving(true)
    setError('')

    try {
      const response = await api.put(`/retos/${id}/terminar`)
      setProgress(response.data?.data || { ...progress, estado_progreso: 'terminado' })
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo terminar el reto')
    } finally {
      setSaving(false)
    }
  }

  const cancelReto = async () => {
    setSaving(true)
    setError('')

    try {
      await api.put(`/retos/${id}/cancelar`)
      setProgress(null)
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo cancelar el reto')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <main className="detail-page"><p className="admin-state">Cargando reto...</p></main>
  }

  if (error && !reto) {
    return <main className="detail-page"><p className="admin-state admin-error">{error}</p></main>
  }

  return (
    <main className="detail-page">
      {error && <p className="admin-state admin-error">{error}</p>}
      <section className="detail-hero">
        <img src={resolveImage(reto.imagen || reto.image)} alt={reto.titulo || reto.name} />
        <div className="detail-content">
          <Link to="/retos" className="detail-back">Volver a retos</Link>
          <h1>{reto.titulo || reto.name}</h1>
          <p>{reto.descripcion || reto.description}</p>
          {reto.objetivo && <p><strong>Objetivo:</strong> {reto.objetivo}</p>}
          <div className="detail-meta">
            <span>Categoria: {reto.categoria || reto.category || 'General'}</span>
            <span>Dificultad: {reto.dificultad || reto.difficulty || 'No definida'}</span>
            <span>Estado: {getProgressLabel(estado)}</span>
          </div>
          <div className="detail-actions">
            {estado === 'sin_iniciar' && (
              <button type="button" className="btn btn-solid" disabled={saving} onClick={startReto}>
                {saving ? 'Iniciando...' : 'Iniciar reto'}
              </button>
            )}
            {estado === 'en_progreso' && (
              <>
                <button type="button" className="btn btn-solid" disabled={saving}>Continuar</button>
                <button type="button" className="btn btn-outline" disabled={saving} onClick={finishReto}>Marcar como terminado</button>
                <button type="button" className="btn btn-outline" disabled={saving} onClick={cancelReto}>Cancelar reto</button>
              </>
            )}
            {estado === 'terminado' && <span className="user-progress-badge">Reto terminado</span>}
          </div>
        </div>
      </section>
    </main>
  )
}
