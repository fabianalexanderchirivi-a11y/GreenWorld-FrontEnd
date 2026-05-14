import { useEffect, useMemo, useState } from 'react'
import api from '../api/api'
import usePageTitle from '../hooks/usePageTitle'
import '../styles/admin.css'

export default function MisRetos() {
  usePageTitle('Mis Retos | Green World')

  const [retos, setRetos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    const cargarRetos = async () => {
      try {
        const respuesta = await api.get('/usuarios/me/retos')
        setRetos(Array.isArray(respuesta.data?.data) ? respuesta.data.data : [])
      } catch (retosError) {
        setError(retosError.response?.data?.message || 'No se pudieron cargar tus retos')
      } finally {
        setLoading(false)
      }
    }

    cargarRetos()
  }, [])

  const retosEnProgreso = useMemo(
    () => retos.filter((reto) => reto.estado_progreso === 'en_progreso'),
    [retos]
  )
  const retosTerminados = useMemo(
    () => retos.filter((reto) => reto.estado_progreso === 'terminado'),
    [retos]
  )

  const cancelarReto = async (reto) => {
    const idReto = reto.id_reto

    setCancelingId(idReto)
    setError('')

    try {
      await api.put(`/retos/${idReto}/cancelar`)
      setRetos((currentRetos) => currentRetos.filter((item) => item.id_reto !== idReto))
    } catch (retoError) {
      setError(retoError.response?.data?.message || 'No se pudo cancelar el reto')
    } finally {
      setCancelingId(null)
    }
  }

  const renderRetoCard = (reto) => (
    <article className="user-progress-card" key={reto.id_usuario_reto || reto.id_reto}>
      <div>
        <h3>{reto.titulo}</h3>
        <p>{reto.descripcion}</p>
      </div>
      <div className="user-progress-meta">
        <span>{reto.estado_progreso === 'terminado' ? 'Terminado' : 'En progreso'}</span>
        <strong>{reto.dificultad || 'Basico'}</strong>
      </div>
      {reto.estado_progreso === 'en_progreso' ? (
        <div className="user-progress-actions">
          <button type="button" className="btn btn-solid">Continuar</button>
          <button
            type="button"
            className="btn btn-outline"
            disabled={cancelingId === reto.id_reto}
            onClick={() => cancelarReto(reto)}
          >
            {cancelingId === reto.id_reto ? 'Cancelando...' : 'Cancelar reto'}
          </button>
        </div>
      ) : (
        <span className="user-progress-badge">Terminado</span>
      )}
    </article>
  )

  return (
    <main className="admin-page">
      <section className="admin-header">
        <h1>Mis retos</h1>
        <p>Consulta los retos que empezaste y los que ya completaste.</p>
      </section>

      {loading && <p className="admin-state">Cargando tus retos...</p>}
      {error && <p className="admin-state admin-error">{error}</p>}

      {!loading && !error && (
        <section className="user-progress-layout">
          <div className="user-progress-section">
            <h2>Retos en progreso</h2>
            {retosEnProgreso.length > 0 ? (
              <div className="user-progress-grid">
                {retosEnProgreso.map(renderRetoCard)}
              </div>
            ) : (
              <p className="admin-state">No tienes retos en progreso todavia.</p>
            )}
          </div>

          <div className="user-progress-section">
            <h2>Retos terminados</h2>
            {retosTerminados.length > 0 ? (
              <div className="user-progress-grid">
                {retosTerminados.map(renderRetoCard)}
              </div>
            ) : (
              <p className="admin-state">No tienes retos terminados todavia.</p>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
