import { assistantService } from '../services/assistantService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const assistantController = {
  chat: asyncHandler(async (req, res) => {
    const result = await assistantService.chat(req.user.id, req.body.message)
    res.json(result)
  }),
  history: asyncHandler(async (req, res) => {
    const history = await assistantService.history(req.user.id)
    res.json({ history })
  }),

  listMemory: asyncHandler(async (req, res) => {
    const memory = await assistantService.listMemory(req.user.id)
    res.json({ memory })
  }),
  deleteMemory: asyncHandler(async (req, res) => {
    await assistantService.deleteMemory(req.user.id, req.params.id)
    res.json({ message: 'Memory removed' })
  }),

  generateRoadmap: asyncHandler(async (req, res) => {
    const result = await assistantService.generateRoadmap(req.user.id, req.body)
    res.json(result)
  }),
  getRoadmaps: asyncHandler(async (req, res) => {
    const roadmaps = await assistantService.getRoadmaps(req.user.id)
    res.json({ roadmaps })
  }),

  analyzeResume: asyncHandler(async (req, res) => {
    const result = await assistantService.analyzeResume(req.user.id, req.body)
    res.json(result)
  }),
  getResumes: asyncHandler(async (req, res) => {
    const resumes = await assistantService.getResumes(req.user.id)
    res.json({ resumes })
  }),

  startInterview: asyncHandler(async (req, res) => {
    const result = await assistantService.startInterview(req.user.id, req.body)
    res.json(result)
  }),
  submitInterviewAnswers: asyncHandler(async (req, res) => {
    const result = await assistantService.submitInterviewAnswers(req.user.id, req.body)
    res.json(result)
  }),
  getInterviews: asyncHandler(async (req, res) => {
    const interviews = await assistantService.getInterviews(req.user.id)
    res.json({ interviews })
  }),

  analyzeSkillGap: asyncHandler(async (req, res) => {
    const result = await assistantService.analyzeSkillGap(req.user.id, req.body)
    res.json(result)
  }),
  getSkillGaps: asyncHandler(async (req, res) => {
    const skillGaps = await assistantService.getSkillGaps(req.user.id)
    res.json({ skillGaps })
  }),

  generateLearningPlan: asyncHandler(async (req, res) => {
    const result = await assistantService.generateLearningPlan(req.user.id, req.body)
    res.json(result)
  }),
  getLearningPlans: asyncHandler(async (req, res) => {
    const learningPlans = await assistantService.getLearningPlans(req.user.id)
    res.json({ learningPlans })
  }),
}
