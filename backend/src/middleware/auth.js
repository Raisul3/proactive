import { verifyAccessToken } from '../utils/jwt.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { prisma } from '../config/prisma.js'

export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication required')
  }

  try {
    const payload = verifyAccessToken(header.split(' ')[1])
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) throw new ApiError(401, 'User no longer exists')
    req.user = user
    next()
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }
})

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    throw new ApiError(403, 'Admin access required')
  }
  next()
}
