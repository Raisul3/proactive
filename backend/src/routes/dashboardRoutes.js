import { Router } from 'express'
import { dashboardController } from '../controllers/dashboardController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)
router.get('/overview', dashboardController.overview)

export default router
