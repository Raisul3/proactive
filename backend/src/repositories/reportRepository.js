import { prisma } from '../config/prisma.js'

export const reportRepository = {
  findByUser(userId) {
    return prisma.report.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
  create(userId, data) {
    return prisma.report.create({ data: { userId, ...data } })
  },
  countsByUser(userId) {
    return Promise.all([
      prisma.goal.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: 'DONE' } }),
      prisma.habit.count({ where: { userId } }),
      prisma.budget.count({ where: { userId } }),
    ])
  },
}
