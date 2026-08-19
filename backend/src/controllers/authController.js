import { authService } from '../services/authService.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { env } from '../config/env.js'

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

export const authController = {
  signup: asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body)
    res.status(201).json(result)
  }),

  login: asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.json({ user, accessToken })
  }),

  google: asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.loginWithGoogle(req.body.idToken)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.json({ user, accessToken })
  }),

  refresh: asyncHandler(async (req, res) => {
    const { accessToken } = await authService.refresh(req.cookies?.refreshToken)
    res.json({ accessToken })
  }),

  logout: asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS)
    res.json({ message: 'Logged out' })
  }),

  verifyEmail: asyncHandler(async (req, res) => {
    await authService.verifyEmail(req.body.token)
    res.json({ message: 'Email verified' })
  }),

  forgotPassword: asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email)
    res.json({ message: 'If that email exists, a reset link has been sent' })
  }),

  resetPassword: asyncHandler(async (req, res) => {
    await authService.resetPassword(req.body.token, req.body.password)
    res.json({ message: 'Password updated' })
  }),

  me: asyncHandler(async (req, res) => {
    const { passwordHash, resetToken, emailVerifyToken, ...user } = req.user
    res.json({ user })
  }),
}
