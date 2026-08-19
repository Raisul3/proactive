import { body } from 'express-validator'

export const travelRecommendationRules = [
  body('destination').trim().notEmpty().withMessage('Destination is required').isLength({ max: 200 }),
  body('budget').notEmpty().withMessage('Budget is required').isFloat({ min: 0 }).withMessage('Budget must be a positive number'),
  body('travelDates').optional().isString().isLength({ max: 200 }),
  body('preferences').optional().isString().isLength({ max: 500 }),
]
