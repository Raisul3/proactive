import { logger } from '../config/logger.js'
import { ApiError } from '../utils/ApiError.js'

export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : err.statusCode || 500
  const message = err.message || 'Internal server error'

  if (statusCode >= 500) {
    logger.error({ err }, message)
  } else {
    logger.warn({ statusCode }, message)
  }

  res.status(statusCode).json({
    message,
    details: err.details || undefined,
  })
}
