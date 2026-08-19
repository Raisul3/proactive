import { body } from 'express-validator'

export const budgetRecommendationRules = [
  body('monthlyIncome').notEmpty().withMessage('Monthly income is required').isFloat({ min: 0 }).withMessage('Monthly income must be a positive number'),
  body('monthlyExpenses').notEmpty().withMessage('Monthly expenses are required').isFloat({ min: 0 }).withMessage('Monthly expenses must be a positive number'),
  body('savingsGoal').optional().isFloat({ min: 0 }).withMessage('Savings goal must be a positive number'),
]
