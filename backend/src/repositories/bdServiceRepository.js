import { prisma } from '../config/prisma.js'

export const bdServiceRepository = {
  create(userId, data) {
    return prisma.bDServiceRequest.create({ data: { userId, ...data } })
  },
  findByUser(userId) {
    return prisma.bDServiceRequest.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
