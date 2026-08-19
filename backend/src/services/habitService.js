import { habitRepository } from '../repositories/habitRepository.js'
import { ApiError } from '../utils/ApiError.js'

function isConsecutiveDay(lastCheckIn) {
  if (!lastCheckIn) return false
  const diffMs = Date.now() - new Date(lastCheckIn).getTime()
  return diffMs < 1000 * 60 * 60 * 48 // within 48h counts as consecutive
}

export const habitService = {
  list(userId) {
    return habitRepository.findByUser(userId)
  },
  create(userId, data) {
    return habitRepository.create(userId, data)
  },
  async checkIn(id, userId) {
    const habit = await habitRepository.findById(id, userId)
    if (!habit) throw new ApiError(404, 'Habit not found')

    const streak = isConsecutiveDay(habit.lastCheckIn) ? habit.streak + 1 : 1
    await habitRepository.update(id, userId, { streak, lastCheckIn: new Date() })
    return { streak }
  },
  async remove(id, userId) {
    const { count } = await habitRepository.remove(id, userId)
    if (!count) throw new ApiError(404, 'Habit not found')
  },
}
