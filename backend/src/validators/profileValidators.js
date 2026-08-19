import { body } from 'express-validator'

export const updateProfileRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 100 }),
  body('avatarUrl').optional().isURL().withMessage('Avatar URL must be a valid URL'),
]
