import { param } from 'express-validator'

export const notificationIdRules = [param('id').isUUID().withMessage('Invalid notification id')]
