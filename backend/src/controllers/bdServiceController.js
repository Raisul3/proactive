import { bdServiceService } from '../services/bdServiceService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const bdServiceController = {
  getGuidance: asyncHandler(async (req, res) => {
    const result = await bdServiceService.getGuidance(req.user.id, req.body)
    res.json(result)
  }),
  getHistory: asyncHandler(async (req, res) => {
    const history = await bdServiceService.getHistory(req.user.id)
    res.json({ history })
  }),
  getEmergencyContacts: asyncHandler(async (req, res) => {
    res.json({ contacts: bdServiceService.getEmergencyContacts() })
  }),
}
