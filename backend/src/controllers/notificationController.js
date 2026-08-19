import { notificationRepository } from '../repositories/notificationRepository.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const notificationController = {
  list: asyncHandler(async (req, res) => {
    const notifications = await notificationRepository.findByUser(req.user.id)
    res.json({ notifications })
  }),
  markRead: asyncHandler(async (req, res) => {
    await notificationRepository.markRead(req.params.id, req.user.id)
    res.json({ message: 'Marked as read' })
  }),
}
