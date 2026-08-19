import { body, param } from 'express-validator'

export const assistantChatRules = [
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 4000 }),
]

export const memoryIdRules = [param('id').isUUID().withMessage('Invalid memory id')]

export const roadmapRules = [
  body('goal').trim().notEmpty().withMessage('Goal is required').isLength({ max: 300 }),
]

export const resumeAnalyzeRules = [
  body('title').optional().isString().isLength({ max: 150 }),
  body('content').trim().notEmpty().withMessage('Resume content is required').isLength({ max: 20000 }),
  body('targetRole').optional().isString().isLength({ max: 150 }),
]

export const interviewStartRules = [
  body('role').trim().notEmpty().withMessage('Target role is required').isLength({ max: 150 }),
]

export const interviewAnswerRules = [
  body('sessionId').isUUID().withMessage('Invalid session id'),
  body('answers').isArray({ min: 1 }).withMessage('Answers are required'),
]

export const skillGapRules = [
  body('targetRole').trim().notEmpty().withMessage('Target role is required').isLength({ max: 150 }),
  body('currentSkills').notEmpty().withMessage('Current skills are required'),
]

export const learningPlanRules = [
  body('goal').trim().notEmpty().withMessage('Learning goal is required').isLength({ max: 300 }),
  body('weeks').optional().isInt({ min: 1, max: 52 }),
]
