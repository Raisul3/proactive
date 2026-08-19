import { Router } from 'express'
import authRoutes from './authRoutes.js'
import careerRoutes from './careerRoutes.js'
import travelRoutes from './travelRoutes.js'
import healthcareRoutes from './healthcareRoutes.js'
import agricultureRoutes from './agricultureRoutes.js'
import budgetRoutes from './budgetRoutes.js'
import assistantRoutes from './assistantRoutes.js'
import notificationRoutes from './notificationRoutes.js'
import goalRoutes from './goalRoutes.js'
import taskRoutes from './taskRoutes.js'
import habitRoutes from './habitRoutes.js'
import reportRoutes from './reportRoutes.js'
import settingsRoutes from './settingsRoutes.js'
import profileRoutes from './profileRoutes.js'
import adminRoutes from './adminRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import bdServiceRoutes from './bdServiceRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/career', careerRoutes)
router.use('/travel', travelRoutes)
router.use('/healthcare', healthcareRoutes)
router.use('/agriculture', agricultureRoutes)
router.use('/budget', budgetRoutes)
router.use('/bd-services', bdServiceRoutes)
router.use('/assistant', assistantRoutes)
router.use('/notifications', notificationRoutes)
router.use('/goals', goalRoutes)
router.use('/tasks', taskRoutes)
router.use('/habits', habitRoutes)
router.use('/reports', reportRoutes)
router.use('/settings', settingsRoutes)
router.use('/profile', profileRoutes)
router.use('/admin', adminRoutes)

router.get('/health', (req, res) => res.json({ status: 'ok' }))

export default router
