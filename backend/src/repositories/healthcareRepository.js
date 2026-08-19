import { prisma } from '../config/prisma.js'

export const healthcareRepository = {
  create(userId, data) {
    return prisma.medicalRecord.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.medicalRecord.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
