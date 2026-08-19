import { taskService } from '../services/taskService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const taskController = {
  list: asyncHandler(async (req, res) => res.json({ tasks: await taskService.list(req.user.id, req.query) })),
  create: asyncHandler(async (req, res) => res.status(201).json(await taskService.create(req.user.id, req.body))),
  update: asyncHandler(async (req, res) => {
    await taskService.update(req.params.id, req.user.id, req.body)
    res.json({ message: 'Task updated' })
  }),
  remove: asyncHandler(async (req, res) => {
    await taskService.remove(req.params.id, req.user.id)
    res.status(204).send()
  }),
}
