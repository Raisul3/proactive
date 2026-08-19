import api from './api'

export const reportService = {
  async list() {
    const { data } = await api.get('/reports')
    return data.reports
  },
  async generate() {
    const { data } = await api.post('/reports/generate')
    return data
  },
}
