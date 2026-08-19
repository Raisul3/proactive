import { profileService } from '../services/profileService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const profileController = {
  update: asyncHandler(async (req, res) => res.json(await profileService.update(req.user.id, req.body))),
}
