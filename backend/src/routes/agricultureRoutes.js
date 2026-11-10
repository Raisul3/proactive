import { Router } from 'express'
import { agricultureController } from '../controllers/agricultureController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { agricultureRecommendationRules } from '../validators/agricultureValidators.js'

const router = Router()
router.use(requireAuth)

router.post('/recommendations', agricultureRecommendationRules, validate, agricultureController.getRecommendation)
router.get('/history', agricultureController.getHistory)

// Knowledge base (district / soil / crop)
router.get('/districts', agricultureController.listDistricts)
router.get('/districts/:name/crops', agricultureController.getDistrictCrops)
router.get('/soils/:name/crops', agricultureController.getSoilCrops)
router.get('/crops/:name/districts', agricultureController.getCropDistricts)

export default router