import { body, param, query } from 'express-validator'

const STATUSES = ['PENDING', 'IN_PROGRESS', 'DONE']

export const createTaskRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('notes').optional().isString().isLength({ max: 2000 }),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
  body('goalId').optional().isUUID().withMessage('Invalid goal id'),
  body('status').optional().isIn(STATUSES).withMessage(`Status must be one of ${STATUSES.join(', ')}`),
]

export const updateTaskRules = [
  param('id').isUUID().withMessage('Invalid task id'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 200 }),
  body('notes').optional().isString().isLength({ max: 2000 }),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
  body('goalId').optional().isUUID().withMessage('Invalid goal id'),
  body('status').optional().isIn(STATUSES).withMessage(`Status must be one of ${STATUSES.join(', ')}`),
]

export const taskIdRules = [param('id').isUUID().withMessage('Invalid task id')]

export const listTaskRules = [
  query('status').optional().isIn(STATUSES).withMessage(`Status must be one of ${STATUSES.join(', ')}`),
  query('goalId').optional().isUUID().withMessage('Invalid goal id'),
]
