import { Router } from 'express'
import { settingsController } from '../controllers/settingsController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updateSettingsRules } from '../validators/settingsValidators.js'

const router = Router()
router.use(requireAuth)
router.get('/', settingsController.get)
router.patch('/', updateSettingsRules, validate, settingsController.update)

export default router
