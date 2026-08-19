import { prisma } from '../config/prisma.js'

export const adminRepository = {
  listUsers({ skip = 0, take = 20 }) {
    return prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, isEmailVerified: true, createdAt: true },
    })
  },
  countUsers() {
    return prisma.user.count()
  },
  platformCounts() {
    return Promise.all([
      prisma.goal.count(),
      prisma.travelPlan.count(),
      prisma.medicalRecord.count(),
      prisma.agricultureRecord.count(),
      prisma.budget.count(),
      prisma.chatMessage.count(),
    ])
  },
  setUserRole(userId, role) {
    return prisma.user.update({ where: { id: userId }, data: { role } })
  },
}
