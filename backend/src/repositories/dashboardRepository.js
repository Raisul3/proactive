import { prisma } from '../config/prisma.js'

export const dashboardRepository = {
  overviewCounts(userId) {
    return Promise.all([
      prisma.goal.count({ where: { userId, status: 'ACTIVE' } }),
      prisma.careerProfile.count({ where: { userId } }),
      prisma.travelPlan.count({ where: { userId } }),
      prisma.medicalRecord.count({ where: { userId } }),
      prisma.agricultureRecord.count({ where: { userId } }),
      prisma.budget.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    ])
  },
}
