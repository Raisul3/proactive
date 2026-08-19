import { Router } from 'express'
import { budgetController } from '../controllers/budgetController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { budgetRecommendationRules } from '../validators/budgetValidators.js'

const router = Router()
router.use(requireAuth)
router.post('/recommendations', budgetRecommendationRules, validate, budgetController.getRecommendation)
router.get('/history', budgetController.getHistory)

export default router
