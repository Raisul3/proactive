import { agricultureService } from '../services/agricultureService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const agricultureController = {
  getRecommendation: asyncHandler(async (req, res) => {
    res.json(await agricultureService.getRecommendation(req.user.id, req.body))
  }),
  getHistory: asyncHandler(async (req, res) => {
    res.json({ history: await agricultureService.getHistory(req.user.id) })
  }),
}
