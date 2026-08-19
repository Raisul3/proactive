import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'

import { env } from './config/env.js'
import { logger } from './config/logger.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(pinoHttp({ logger }))

// Generous global limit; tighten per-route (e.g. /auth/login) as needed.
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }))

app.use('/api', routes)

app.use(notFoundHandler)
app.use(errorHandler)
