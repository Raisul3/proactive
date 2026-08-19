import api from './api'

export const taskService = {
  async list(params) {
    const { data } = await api.get('/tasks', { params })
    return data.tasks
  },
  async create(payload) {
    const { data } = await api.post('/tasks', payload)
    return data
  },
  async update(id, payload) {
    const { data } = await api.patch(`/tasks/${id}`, payload)
    return data
  },
  async remove(id) {
    await api.delete(`/tasks/${id}`)
  },
}
