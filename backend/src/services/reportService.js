import { reportRepository } from '../repositories/reportRepository.js'

export const reportService = {
  list(userId) {
    return reportRepository.findByUser(userId)
  },
  async generateSummary(userId) {
    const [goals, completedTasks, habits, budgets] = await reportRepository.countsByUser(userId)
    const data = { goals, completedTasks, habits, budgets, generatedAt: new Date().toISOString() }
    await reportRepository.create(userId, { type: 'monthly', data })
    return data
  },
}
