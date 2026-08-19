import { prisma } from '../config/prisma.js'

export const goalRepository = {
  findByUser(userId) {
    return prisma.goal.findMany({ where: { userId }, include: { tasks: true }, orderBy: { createdAt: 'desc' } })
  },
  findById(id, userId) {
    return prisma.goal.findFirst({ where: { id, userId }, include: { tasks: true } })
  },
  create(userId, data) {
    return prisma.goal.create({ data: { userId, ...data } })
  },
  update(id, userId, data) {
    return prisma.goal.updateMany({ where: { id, userId }, data })
  },
  remove(id, userId) {
    return prisma.goal.deleteMany({ where: { id, userId } })
  },
}
