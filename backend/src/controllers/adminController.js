import { adminService } from '../services/adminService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const adminController = {
  listUsers: asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1
    res.json(await adminService.listUsers(page))
  }),
  stats: asyncHandler(async (req, res) => res.json(await adminService.platformStats())),
  setUserRole: asyncHandler(async (req, res) => res.json(await adminService.setUserRole(req.params.id, req.body.role))),
}
