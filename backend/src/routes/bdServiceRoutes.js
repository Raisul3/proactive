import { Router } from 'express'
import { bdServiceController } from '../controllers/bdServiceController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { bdGuidanceRules } from '../validators/bdServiceValidators.js'

const router = Router()
router.use(requireAuth)

router.get('/emergency-contacts', bdServiceController.getEmergencyContacts)
router.post('/guidance', bdGuidanceRules, validate, bdServiceController.getGuidance)
router.get('/history', bdServiceController.getHistory)

export default router
