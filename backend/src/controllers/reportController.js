import { reportService } from '../services/reportService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const reportController = {
  list: asyncHandler(async (req, res) => res.json({ reports: await reportService.list(req.user.id) })),
  generate: asyncHandler(async (req, res) => res.json(await reportService.generateSummary(req.user.id))),
}
