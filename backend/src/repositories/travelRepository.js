import { prisma } from '../config/prisma.js'

export const travelRepository = {
  create(userId, data) {
    return prisma.travelPlan.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.travelPlan.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
