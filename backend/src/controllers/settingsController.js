import { settingsService } from '../services/settingsService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const settingsController = {
  get: asyncHandler(async (req, res) => res.json(await settingsService.get(req.user.id))),
  update: asyncHandler(async (req, res) => res.json(await settingsService.update(req.user.id, req.body))),
}
