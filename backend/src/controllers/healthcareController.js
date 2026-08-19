import { healthcareService } from '../services/healthcareService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const healthcareController = {
  getRecommendation: asyncHandler(async (req, res) => {
    res.json(await healthcareService.getRecommendation(req.user.id, req.body))
  }),
  getHistory: asyncHandler(async (req, res) => {
    res.json({ history: await healthcareService.getHistory(req.user.id) })
  }),
}
