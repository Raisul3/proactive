import api from './api'

export const adminService = {
  async listUsers(page = 1) {
    const { data } = await api.get('/admin/users', { params: { page } })
    return data
  },
  async stats() {
    const { data } = await api.get('/admin/stats')
    return data
  },
  async setUserRole(id, role) {
    const { data } = await api.patch(`/admin/users/${id}/role`, { role })
    return data
  },
}
