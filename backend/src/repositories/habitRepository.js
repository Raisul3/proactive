import { prisma } from '../config/prisma.js'

export const habitRepository = {
  findByUser(userId) {
    return prisma.habit.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
  create(userId, data) {
    return prisma.habit.create({ data: { userId, ...data } })
  },
  findById(id, userId) {
    return prisma.habit.findFirst({ where: { id, userId } })
  },
  update(id, userId, data) {
    return prisma.habit.updateMany({ where: { id, userId }, data })
  },
  remove(id, userId) {
    return prisma.habit.deleteMany({ where: { id, userId } })
  },
}
