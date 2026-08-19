import { body } from 'express-validator'

export const careerRecommendationRules = [
  body('education').trim().notEmpty().withMessage('Education is required').isLength({ max: 200 }),
  body('skills').notEmpty().withMessage('Skills are required'),
  body('interests').optional().isString().isLength({ max: 500 }),
]
