import { Router } from 'express'
import { reportController } from '../controllers/reportController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/', reportController.list)
router.post('/generate', reportController.generate)

export default router
