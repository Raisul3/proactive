import { settingsRepository } from '../repositories/settingsRepository.js'

export const settingsService = {
  get(userId) {
    return settingsRepository.findByUser(userId)
  },
  update(userId, data) {
    return settingsRepository.upsert(userId, data)
  },
}
