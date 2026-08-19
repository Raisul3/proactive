import api from './api'

export const notificationService = {
  async list() {
    const { data } = await api.get('/notifications')
    return data.notifications
  },
  async markRead(id) {
    const { data } = await api.patch(`/notifications/${id}/read`)
    return data
  },
}
