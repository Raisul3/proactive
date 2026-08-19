import { Router } from 'express'
import { assistantController } from '../controllers/assistantController.js'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import {
  assistantChatRules,
  memoryIdRules,
  roadmapRules,
  resumeAnalyzeRules,
  interviewStartRules,
  interviewAnswerRules,
  skillGapRules,
  learningPlanRules,
} from '../validators/assistantValidators.js'

const router = Router()
router.use(requireAuth)

// AI Chat
router.post('/chat', assistantChatRules, validate, assistantController.chat)
router.get('/history', assistantController.history)

// AI Memory
router.get('/memory', assistantController.listMemory)
router.delete('/memory/:id', memoryIdRules, validate, assistantController.deleteMemory)

// AI Success Roadmap
router.post('/roadmap', roadmapRules, validate, assistantController.generateRoadmap)
router.get('/roadmap', assistantController.getRoadmaps)

// Resume Analyzer / ATS Checker
router.post('/resume/analyze', resumeAnalyzeRules, validate, assistantController.analyzeResume)
router.get('/resume', assistantController.getResumes)

// Interview Coach
router.post('/interview/start', interviewStartRules, validate, assistantController.startInterview)
router.post('/interview/answer', interviewAnswerRules, validate, assistantController.submitInterviewAnswers)
router.get('/interview', assistantController.getInterviews)

// Skill Gap Analyzer
router.post('/skill-gap', skillGapRules, validate, assistantController.analyzeSkillGap)
router.get('/skill-gap', assistantController.getSkillGaps)

// Learning Planner
router.post('/learning-plan', learningPlanRules, validate, assistantController.generateLearningPlan)
router.get('/learning-plan', assistantController.getLearningPlans)

export default router
