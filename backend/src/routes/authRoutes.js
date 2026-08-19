import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { signupRules, loginRules, forgotPasswordRules, resetPasswordRules } from '../validators/authValidators.js'

const router = Router()

router.post('/signup', signupRules, validate, authController.signup)
router.post('/login', loginRules, validate, authController.login)
router.post('/google', authController.google)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)
router.post('/verify-email', authController.verifyEmail)
router.post('/forgot-password', forgotPasswordRules, validate, authController.forgotPassword)
router.post('/reset-password', resetPasswordRules, validate, authController.resetPassword)
router.get('/me', requireAuth, authController.me)

export default router
