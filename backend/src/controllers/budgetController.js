import { budgetService } from '../services/budgetService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const budgetController = {
  getRecommendation: asyncHandler(async (req, res) => {
    res.json(await budgetService.getRecommendation(req.user.id, req.body))
  }),
  getHistory: asyncHandler(async (req, res) => {
    res.json({ history: await budgetService.getHistory(req.user.id) })
  }),
}
