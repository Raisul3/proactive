import { prisma } from '../config/prisma.js'

export const careerRepository = {
  create(userId, data) {
    return prisma.careerProfile.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.careerProfile.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  },
}
