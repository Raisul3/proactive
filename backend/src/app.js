import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'
import path from 'path'
import { fileURLToPath } from 'url'

import { env } from './config/env.js'
import { logger } from './config/logger.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(pinoHttp({ logger }))

// Generous global limit; tighten per-route (e.g. /auth/login) as needed.
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }))

app.use('/api', routes)

// Serve frontend build (same-origin — cookie/CORS ঝামেলা এড়াতে)
const frontendPath = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendPath))
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

app.use(notFoundHandler)
app.use(errorHandler)