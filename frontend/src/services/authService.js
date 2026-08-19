import api from './api'

export const authService = {
  async signup(payload) {
    const { data } = await api.post('/auth/signup', payload)
    return data
  },
  async login(payload) {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  async loginWithGoogle(idToken) {
    const { data } = await api.post('/auth/google', { idToken })
    return data
  },
  async logout() {
    const { data } = await api.post('/auth/logout')
    return data
  },
  async forgotPassword(email) {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  },
  async resetPassword(token, password) {
    const { data } = await api.post('/auth/reset-password', { token, password })
    return data
  },
  async verifyEmail(token) {
    const { data } = await api.post('/auth/verify-email', { token })
    return data
  },
  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}
