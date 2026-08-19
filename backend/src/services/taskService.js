import { taskRepository } from '../repositories/taskRepository.js'
import { ApiError } from '../utils/ApiError.js'

export const taskService = {
  list(userId, query) {
    const filters = {}
    if (query.status) filters.status = query.status
    if (query.goalId) filters.goalId = query.goalId
    return taskRepository.findByUser(userId, filters)
  },
  create(userId, data) {
    return taskRepository.create(userId, data)
  },
  async update(id, userId, data) {
    const { count } = await taskRepository.update(id, userId, data)
    if (!count) throw new ApiError(404, 'Task not found')
  },
  async remove(id, userId) {
    const { count } = await taskRepository.remove(id, userId)
    if (!count) throw new ApiError(404, 'Task not found')
  },
}
