import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import { userRepository } from '../repositories/userRepository.js'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js'
import { ApiError } from '../utils/ApiError.js'
import { env } from '../config/env.js'
import { emailService } from './emailService.js'

const googleClient = new OAuth2Client(env.googleClientId)

function toPublicUser(user) {
  const { passwordHash, resetToken, resetTokenExpiry, emailVerifyToken, ...publicUser } = user
  return publicUser
}

function issueTokens(user) {
  return {
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user),
  }
}

export const authService = {
  async signup({ name, email, password }) {
    const existing = await userRepository.findByEmail(email)
    if (existing) throw new ApiError(409, 'An account with this email already exists')

    const passwordHash = await bcrypt.hash(password, 12)
    const emailVerifyToken = crypto.randomBytes(32).toString('hex')

    const user = await userRepository.create({
      name,
      email,
      passwordHash,
      emailVerifyToken,
      isEmailVerified: true, // TODO: remove this once real email delivery is confirmed working
      settings: { create: {} },
    })

    try {
      await emailService.sendVerificationEmail(user, emailVerifyToken)
    } catch (err) {
      // Don't fail signup just because the email provider rejected the send
      // (e.g. Resend test-mode restrictions). Account is already usable.
      console.error('Verification email failed to send:', err.message)
    }
    return { message: 'Account created. Please check your email to verify your account.' }
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email)
    if (!user || !user.passwordHash) throw new ApiError(401, 'Invalid email or password')

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) throw new ApiError(401, 'Invalid email or password')

    if (!user.isEmailVerified) {
      throw new ApiError(403, 'Please verify your email before logging in')
    }

    const tokens = issueTokens(user)
    return { user: toPublicUser(user), ...tokens }
  },

  async loginWithGoogle(idToken) {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: env.googleClientId })
    const payload = ticket.getPayload()
    if (!payload?.email) throw new ApiError(401, 'Invalid Google token')

    let user = await userRepository.findByGoogleId(payload.sub)
    if (!user) {
      user = await userRepository.findByEmail(payload.email)
    }

    if (!user) {
      user = await userRepository.create({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        googleId: payload.sub,
        provider: 'GOOGLE',
        avatarUrl: payload.picture,
        isEmailVerified: true,
        settings: { create: {} },
      })
    } else if (!user.googleId) {
      user = await userRepository.update(user.id, { googleId: payload.sub, provider: 'GOOGLE' })
    }

    const tokens = issueTokens(user)
    return { user: toPublicUser(user), ...tokens }
  },

  async refresh(refreshToken) {
    if (!refreshToken) throw new ApiError(401, 'Missing refresh token')
    let payload
    try {
      payload = verifyRefreshToken(refreshToken)
    } catch {
      throw new ApiError(401, 'Invalid or expired refresh token')
    }
    const user = await userRepository.findById(payload.sub)
    if (!user) throw new ApiError(401, 'User no longer exists')
    return { accessToken: signAccessToken(user) }
  },

  async verifyEmail(token) {
    const user = await userRepository.findByVerifyToken(token)
    if (!user) throw new ApiError(400, 'Invalid or expired verification link')
    await userRepository.update(user.id, { isEmailVerified: true, emailVerifyToken: null })
    return { message: 'Email verified successfully.' }
  },

  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email)
    if (!user) return { message: 'If that email exists, a reset link has been sent.' } // don't leak whether the email exists

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30) // 30 min
    await userRepository.update(user.id, { resetToken, resetTokenExpiry })
    await emailService.sendPasswordResetEmail(user, resetToken)
    return { message: 'If that email exists, a reset link has been sent.' }
  },

  async resetPassword(token, newPassword) {
    const user = await userRepository.findByResetToken(token)
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new ApiError(400, 'Invalid or expired reset link')
    }
    const passwordHash = await bcrypt.hash(newPassword, 12)
    await userRepository.update(user.id, {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    })
    return { message: 'Password updated successfully.' }
  },
}