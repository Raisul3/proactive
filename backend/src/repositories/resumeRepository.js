import { prisma } from '../config/prisma.js'

export const resumeRepository = {
  create(userId, data) {
    return prisma.resume.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.resume.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
