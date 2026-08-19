import { prisma } from '../config/prisma.js'

export const taskRepository = {
  findByUser(userId, filters = {}) {
    return prisma.task.findMany({ where: { userId, ...filters }, orderBy: { dueDate: 'asc' } })
  },
  create(userId, data) {
    return prisma.task.create({ data: { userId, ...data } })
  },
  update(id, userId, data) {
    return prisma.task.updateMany({ where: { id, userId }, data })
  },
  remove(id, userId) {
    return prisma.task.deleteMany({ where: { id, userId } })
  },
}
