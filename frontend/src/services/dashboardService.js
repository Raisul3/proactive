import api from './api'

export const dashboardService = {
  async overview() {
    const { data } = await api.get('/dashboard/overview')
    return data
  },
}
