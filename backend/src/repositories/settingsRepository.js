import { prisma } from '../config/prisma.js'

export const settingsRepository = {
  findByUser(userId) {
    return prisma.userSettings.findUnique({ where: { userId } })
  },
  upsert(userId, data) {
    return prisma.userSettings.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    })
  },
}
