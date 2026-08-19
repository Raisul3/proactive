import { goalService } from '../services/goalService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const goalController = {
  list: asyncHandler(async (req, res) => res.json({ goals: await goalService.list(req.user.id) })),
  get: asyncHandler(async (req, res) => res.json(await goalService.get(req.params.id, req.user.id))),
  create: asyncHandler(async (req, res) => res.status(201).json(await goalService.create(req.user.id, req.body))),
  update: asyncHandler(async (req, res) => res.json(await goalService.update(req.params.id, req.user.id, req.body))),
  remove: asyncHandler(async (req, res) => {
    await goalService.remove(req.params.id, req.user.id)
    res.status(204).send()
  }),
}
