import api from './api'

export const bdHubService = {
  async getGuidance(payload) {
    const { data } = await api.post('/bd-services/guidance', payload)
    return data
  },
  async getHistory() {
    const { data } = await api.get('/bd-services/history')
    return data.history
  },
  async getEmergencyContacts() {
    const { data } = await api.get('/bd-services/emergency-contacts')
    return data.contacts
  },
}
