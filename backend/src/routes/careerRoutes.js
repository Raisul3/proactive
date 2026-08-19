import { Router } from 'express'
import { careerController } from '../controllers/careerController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { careerRecommendationRules } from '../validators/careerValidators.js'

const router = Router()
router.use(requireAuth)

router.post('/recommendations', careerRecommendationRules, validate, careerController.getRecommendation)
router.get('/history', careerController.getHistory)

export default router
