import { prisma } from '../config/prisma.js'

export const learningPlanRepository = {
  create(userId, data) {
    return prisma.learningPlan.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.learningPlan.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
