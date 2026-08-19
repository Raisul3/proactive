import { body, param } from 'express-validator'

export const setUserRoleRules = [
  param('id').isUUID().withMessage('Invalid user id'),
  body('role').isIn(['USER', 'ADMIN']).withMessage('Role must be USER or ADMIN'),
]
