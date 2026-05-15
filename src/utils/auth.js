export const getStoredUser = () => {
  const storages = [localStorage, sessionStorage]

  for (const storage of storages) {
    const usuario = storage.getItem('usuario')

    if (usuario) {
      try {
        return JSON.parse(usuario)
      } catch {
        return { sesionActiva: true, rol: 'usuario' }
      }
    }
  }

  return null
}

export const getStoredToken = () => (
  localStorage.getItem('token') || sessionStorage.getItem('token')
)

export const setStoredUser = (usuario) => {
  const storage = localStorage.getItem('usuario') ? localStorage : sessionStorage
  storage.setItem('usuario', JSON.stringify(usuario))
}

export const clearSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('usuario')
}
