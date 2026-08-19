import { prisma } from '../config/prisma.js'

export const aiRoadmapRepository = {
  create(userId, goal, milestones) {
    return prisma.aIRoadmap.create({ data: { userId, goal, milestones } })
  },
  findByUser(userId) {
    return prisma.aIRoadmap.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  },
}
