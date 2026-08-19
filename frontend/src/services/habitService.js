import api from './api'

export const habitService = {
  async list() {
    const { data } = await api.get('/habits')
    return data.habits
  },
  async create(payload) {
    const { data } = await api.post('/habits', payload)
    return data
  },
  async checkIn(id) {
    const { data } = await api.post(`/habits/${id}/check-in`)
    return data
  },
  async remove(id) {
    await api.delete(`/habits/${id}`)
  },
}
