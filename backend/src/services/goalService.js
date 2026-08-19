import { goalRepository } from '../repositories/goalRepository.js'
import { ApiError } from '../utils/ApiError.js'

export const goalService = {
  list(userId) {
    return goalRepository.findByUser(userId)
  },
  async get(id, userId) {
    const goal = await goalRepository.findById(id, userId)
    if (!goal) throw new ApiError(404, 'Goal not found')
    return goal
  },
  create(userId, data) {
    return goalRepository.create(userId, data)
  },
  async update(id, userId, data) {
    const { count } = await goalRepository.update(id, userId, data)
    if (!count) throw new ApiError(404, 'Goal not found')
    return goalRepository.findById(id, userId)
  },
  async remove(id, userId) {
    const { count } = await goalRepository.remove(id, userId)
    if (!count) throw new ApiError(404, 'Goal not found')
  },
}
