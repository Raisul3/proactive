import api from './api'

export const settingsService = {
  async get() {
    const { data } = await api.get('/settings')
    return data
  },
  async update(payload) {
    const { data } = await api.patch('/settings', payload)
    return data
  },
}
