import api from './api'

export const goalService = {
  async list() {
    const { data } = await api.get('/goals')
    return data.goals
  },
  async create(payload) {
    const { data } = await api.post('/goals', payload)
    return data
  },
  async update(id, payload) {
    const { data } = await api.patch(`/goals/${id}`, payload)
    return data
  },
  async remove(id) {
    await api.delete(`/goals/${id}`)
  },
}
