import { body, param } from 'express-validator'

const STATUSES = ['ACTIVE', 'COMPLETED', 'ARCHIVED']

export const createGoalRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').optional().isString().isLength({ max: 2000 }),
  body('category').optional().isString().isLength({ max: 100 }),
  body('targetDate').optional().isISO8601().withMessage('Target date must be a valid date'),
]

export const updateGoalRules = [
  param('id').isUUID().withMessage('Invalid goal id'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 200 }),
  body('description').optional().isString().isLength({ max: 2000 }),
  body('category').optional().isString().isLength({ max: 100 }),
  body('targetDate').optional().isISO8601().withMessage('Target date must be a valid date'),
  body('status').optional().isIn(STATUSES).withMessage(`Status must be one of ${STATUSES.join(', ')}`),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
]

export const goalIdRules = [param('id').isUUID().withMessage('Invalid goal id')]
