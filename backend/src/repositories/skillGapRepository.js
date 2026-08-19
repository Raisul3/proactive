import { prisma } from '../config/prisma.js'

export const skillGapRepository = {
  create(userId, data) {
    return prisma.skillGapAnalysis.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.skillGapAnalysis.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
