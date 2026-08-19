import { body } from 'express-validator'

export const bdGuidanceRules = [
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['government', 'utility', 'document', 'other'])
    .withMessage('Invalid category'),
  body('query').trim().notEmpty().withMessage('Question is required').isLength({ max: 1000 }),
]
