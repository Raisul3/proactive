import { body } from 'express-validator'

const LANGUAGES = ['en', 'bn']
const THEMES = ['light', 'dark']

export const updateSettingsRules = [
  body('theme').optional().isIn(THEMES).withMessage(`Theme must be one of ${THEMES.join(', ')}`),
  body('language').optional().isIn(LANGUAGES).withMessage(`Language must be one of ${LANGUAGES.join(', ')}`),
  body('emailNotifications').optional().isBoolean().withMessage('emailNotifications must be true or false'),
  body('pushNotifications').optional().isBoolean().withMessage('pushNotifications must be true or false'),
]
