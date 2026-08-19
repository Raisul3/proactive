import { app } from './app.js'
import { env } from './config/env.js'
import { logger } from './config/logger.js'

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'Uncaught exception — shutting down')
  process.exit(1)
})
process.on('unhandledRejection', (err) => {
  logger.error({ err }, 'Unhandled promise rejection — shutting down')
  process.exit(1)
})
process.on('beforeExit', (code) => {
  logger.warn({ code, activeHandles: process._getActiveHandles().length }, 'beforeExit — event loop is empty')
})
process.on('exit', (code) => {
  logger.warn({ code }, 'Process exit')
})

const server = app.listen(env.port, () => {
  logger.info(`Proactive Life API listening on http://localhost:${env.port}`)
  logger.info({ activeHandles: process._getActiveHandles().length }, 'Active handles right after listen')
})

server.on('close', () => {
  logger.warn('HTTP server closed')
})

// TEMPORARY diagnostic heartbeat — if this alone keeps the process alive,
// it proves the http.Server handle itself was not keeping Node running.
//setInterval(() => {logger.debug('heartbeat')}, 5000)
