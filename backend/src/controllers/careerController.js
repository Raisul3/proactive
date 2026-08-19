import { careerService } from '../services/careerService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const careerController = {
  getRecommendation: asyncHandler(async (req, res) => {
    const result = await careerService.getRecommendation(req.user.id, req.body)
    res.json(result)
  }),
  getHistory: asyncHandler(async (req, res) => {
    const history = await careerService.getHistory(req.user.id)
    res.json({ history })
  }),
}
