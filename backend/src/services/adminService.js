import { adminRepository } from '../repositories/adminRepository.js'

export const adminService = {
  async listUsers(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize
    const [users, total] = await Promise.all([
      adminRepository.listUsers({ skip, take: pageSize }),
      adminRepository.countUsers(),
    ])
    return { users, total, page, pageSize }
  },
  async platformStats() {
    const [goals, travelPlans, medicalRecords, agricultureRecords, budgets, chatMessages] =
      await adminRepository.platformCounts()
    return { goals, travelPlans, medicalRecords, agricultureRecords, budgets, chatMessages }
  },
  setUserRole(userId, role) {
    return adminRepository.setUserRole(userId, role)
  },
}
