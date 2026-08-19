import { Router } from 'express'
import { profileController } from '../controllers/profileController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updateProfileRules } from '../validators/profileValidators.js'

const router = Router()
router.use(requireAuth)
router.patch('/', updateProfileRules, validate, profileController.update)

export default router
