import { body } from 'express-validator'

export const healthcareRecommendationRules = [
  body('symptoms').trim().notEmpty().withMessage('Symptoms are required').isLength({ max: 1000 }),
  body('district').optional().isString().isLength({ max: 100 }),
]
