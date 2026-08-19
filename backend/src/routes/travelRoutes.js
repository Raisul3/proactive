import { Router } from 'express'
import { travelController } from '../controllers/travelController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { travelRecommendationRules } from '../validators/travelValidators.js'

const router = Router()
router.use(requireAuth)
router.post('/recommendations', travelRecommendationRules, validate, travelController.getRecommendation)
router.get('/history', travelController.getHistory)

export default router
