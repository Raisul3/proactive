import { prisma } from '../config/prisma.js'

export const interviewRepository = {
  create(userId, data) {
    return prisma.interviewSession.create({ data: { userId, ...data } })
  },
  findOne(userId, id) {
    return prisma.interviewSession.findFirst({ where: { id, userId } })
  },
  update(id, data) {
    return prisma.interviewSession.update({ where: { id }, data })
  },
  findByUser(userId) {
    return prisma.interviewSession.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
