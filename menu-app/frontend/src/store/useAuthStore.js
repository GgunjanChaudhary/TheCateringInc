import { create } from 'zustand'
import { apiFetch } from '../api/client.js'

const TOKEN_KEY = 'mc_token'

const getInitialToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const useAuthStore = create((set) => ({
  token: getInitialToken(),
  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
    set({ token })
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null })
  },
  login: async (password) => {
    const response = await apiFetch('login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })
    if (!response.ok) {
      throw new Error('Invalid password')
    }
    const data = await response.json()
    const token = data.token ?? null
    if (!token) {
      throw new Error('Token missing from login response')
    }
    localStorage.setItem(TOKEN_KEY, token)
    set({ token })
    return token
  },
  logout: async () => {
    const token = useAuthStore.getState().token
    if (token) {
      await apiFetch('logout', { method: 'POST' })
    }
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null })
  },
  isAuthenticated: () => Boolean(useAuthStore.getState().token),
}))
