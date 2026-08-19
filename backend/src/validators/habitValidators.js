import { body, param } from 'express-validator'

const FREQUENCIES = ['daily', 'weekly', 'custom']

export const createHabitRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('frequency').optional().isIn(FREQUENCIES).withMessage(`Frequency must be one of ${FREQUENCIES.join(', ')}`),
]

export const habitIdRules = [param('id').isUUID().withMessage('Invalid habit id')]
