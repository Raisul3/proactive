import { prisma } from '../config/prisma.js'

export const notificationRepository = {
  findByUser(userId) {
    return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
  markRead(id, userId) {
    return prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } })
  },
  create(userId, data) {
    return prisma.notification.create({ data: { userId, ...data } })
  },
}
