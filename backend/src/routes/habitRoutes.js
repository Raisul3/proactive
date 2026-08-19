import { Router } from 'express'
import { habitController } from '../controllers/habitController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { createHabitRules, habitIdRules } from '../validators/habitValidators.js'

const router = Router()
router.use(requireAuth)
router.get('/', habitController.list)
router.post('/', createHabitRules, validate, habitController.create)
router.post('/:id/check-in', habitIdRules, validate, habitController.checkIn)
router.delete('/:id', habitIdRules, validate, habitController.remove)

export default router
