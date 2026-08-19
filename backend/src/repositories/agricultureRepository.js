import { prisma } from '../config/prisma.js'

export const agricultureRepository = {
  create(userId, data) {
    return prisma.agricultureRecord.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.agricultureRecord.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
