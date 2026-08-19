import { body } from 'express-validator'

export const agricultureRecommendationRules = [
  body('soilType').trim().notEmpty().withMessage('Soil type is required').isLength({ max: 100 }),
  body('landSize').notEmpty().withMessage('Land size is required').isFloat({ min: 0 }).withMessage('Land size must be a positive number'),
  body('season').trim().notEmpty().withMessage('Season is required').isLength({ max: 100 }),
]
