import { Router } from 'express'
import { goalController } from '../controllers/goalController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { createGoalRules, updateGoalRules, goalIdRules } from '../validators/goalValidators.js'

const router = Router()
router.use(requireAuth)
router.get('/', goalController.list)
router.post('/', createGoalRules, validate, goalController.create)
router.get('/:id', goalIdRules, validate, goalController.get)
router.patch('/:id', updateGoalRules, validate, goalController.update)
router.delete('/:id', goalIdRules, validate, goalController.remove)

export default router
