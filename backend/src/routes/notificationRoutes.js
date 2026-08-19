import { Router } from 'express'
import { notificationController } from '../controllers/notificationController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { notificationIdRules } from '../validators/notificationValidators.js'

const router = Router()
router.use(requireAuth)
router.get('/', notificationController.list)
router.patch('/:id/read', notificationIdRules, validate, notificationController.markRead)

export default router
