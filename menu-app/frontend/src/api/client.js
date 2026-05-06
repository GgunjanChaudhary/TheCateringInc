import { useAuthStore } from '../store/useAuthStore.js'

const normalizePath = (path) => path.replace(/^\/+/, '')
const normalizeBase = (base) => base.replace(/\/+$/, '')

export async function apiFetch(path, options = {}) {
  const token = useAuthStore.getState().token
  const configuredApiBase = import.meta.env.VITE_API_BASE_URL
  const apiPrefix = configuredApiBase ? `${normalizeBase(configuredApiBase)}/api` : '/api'
  const url = `${apiPrefix}/${normalizePath(path)}`

  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(url, { ...options, headers })
  if (response.status === 401) {
    useAuthStore.getState().clearToken()
  }

  return response
}
