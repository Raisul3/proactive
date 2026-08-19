import { prisma } from '../config/prisma.js'

export const aiMemoryRepository = {
  findByUser(userId) {
    return prisma.aIMemory.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } })
  },
  upsert(userId, key, value) {
    return prisma.aIMemory.upsert({
      where: { userId_key: { userId, key } },
      update: { value },
      create: { userId, key, value },
    })
  },
  delete(userId, id) {
    return prisma.aIMemory.deleteMany({ where: { id, userId } })
  },
}
