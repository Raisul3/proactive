import { Router } from 'express'
import { healthcareController } from '../controllers/healthcareController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { healthcareRecommendationRules } from '../validators/healthcareValidators.js'

const router = Router()
router.use(requireAuth)
router.post('/recommendations', healthcareRecommendationRules, validate, healthcareController.getRecommendation)
router.get('/history', healthcareController.getHistory)

export default router
