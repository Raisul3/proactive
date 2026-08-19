import { prisma } from '../config/prisma.js'

export const chatRepository = {
  create(userId, role, content, provider) {
    return prisma.chatMessage.create({ data: { userId, role, content, provider } })
  },
  history(userId, limit = 20) {
    return prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  },
}
