import { prisma } from '../config/prisma.js'

export const budgetRepository = {
  create(userId, data) {
    return prisma.budget.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.budget.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
