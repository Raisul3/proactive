import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logger } from '../config/logger.js'

const transporter = env.smtp.host
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: Number(env.smtp.port) || 587,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    })
  : null

async function send({ to, subject, html, link }) {
  if (!transporter) {
    // No SMTP configured (e.g. local dev) — log instead of failing signup.
    logger.info({ to, subject, link }, 'SMTP not configured; email not sent (dev mode)')
    return
  }
  await transporter.sendMail({ from: env.smtp.from, to, subject, html })
}

export const emailService = {
  sendVerificationEmail(user, token) {
    const link = `${env.clientUrl}/verify-email?token=${token}`
    return send({
      to: user.email,
      subject: 'Verify your Proactive Life account',
      html: `<p>Hi ${user.name}, please verify your email:</p><a href="${link}">${link}</a>`,
      link,
    })
  },
  sendPasswordResetEmail(user, token) {
    const link = `${env.clientUrl}/reset-password?token=${token}`
    return send({
      to: user.email,
      subject: 'Reset your Proactive Life password',
      html: `<p>Hi ${user.name}, reset your password here:</p><a href="${link}">${link}</a>`,
      link,
    })
  },
}