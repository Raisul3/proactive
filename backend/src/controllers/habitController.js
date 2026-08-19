import { habitService } from '../services/habitService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const habitController = {
  list: asyncHandler(async (req, res) => res.json({ habits: await habitService.list(req.user.id) })),
  create: asyncHandler(async (req, res) => res.status(201).json(await habitService.create(req.user.id, req.body))),
  checkIn: asyncHandler(async (req, res) => res.json(await habitService.checkIn(req.params.id, req.user.id))),
  remove: asyncHandler(async (req, res) => {
    await habitService.remove(req.params.id, req.user.id)
    res.status(204).send()
  }),
}
