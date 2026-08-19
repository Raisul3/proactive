import { Router } from 'express'
import { adminController } from '../controllers/adminController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { setUserRoleRules } from '../validators/adminValidators.js'

const router = Router()
router.use(requireAuth, requireAdmin)
router.get('/users', adminController.listUsers)
router.get('/stats', adminController.stats)
router.patch('/users/:id/role', setUserRoleRules, validate, adminController.setUserRole)

export default router
