import { prisma } from '../config/prisma.js'

// Repository layer: isolates raw Prisma queries from business logic in
// services, so the ORM/database can be swapped without touching services.
export const userRepository = {
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } })
  },
  findById(id) {
    return prisma.user.findUnique({ where: { id } })
  },
  findByGoogleId(googleId) {
    return prisma.user.findUnique({ where: { googleId } })
  },
  create(data) {
    return prisma.user.create({ data })
  },
  update(id, data) {
    return prisma.user.update({ where: { id }, data })
  },
  findByResetToken(resetToken) {
    return prisma.user.findFirst({ where: { resetToken } })
  },
  findByVerifyToken(emailVerifyToken) {
    return prisma.user.findFirst({ where: { emailVerifyToken } })
  },
}
