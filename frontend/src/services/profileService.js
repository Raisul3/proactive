import api from './api'

export const profileService = {
  async update(payload) {
    const { data } = await api.patch('/profile', payload)
    return data
  },
}
