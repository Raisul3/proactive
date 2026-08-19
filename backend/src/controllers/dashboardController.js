import { dashboardService } from '../services/dashboardService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const dashboardController = {
  overview: asyncHandler(async (req, res) => res.json(await dashboardService.overview(req.user.id))),
}
