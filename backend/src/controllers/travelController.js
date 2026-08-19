import { travelService } from '../services/travelService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const travelController = {
  getRecommendation: asyncHandler(async (req, res) => {
    const result = await travelService.getRecommendation(req.user.id, req.body)
    res.json(result)
  }),
  getHistory: asyncHandler(async (req, res) => {
    res.json({ history: await travelService.getHistory(req.user.id) })
  }),
}
