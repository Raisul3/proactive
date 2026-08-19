import api from './api'

export const assistantService = {
  async chat(message) {
    const { data } = await api.post('/assistant/chat', { message })
    return data
  },
  async history() {
    const { data } = await api.get('/assistant/history')
    return data.history
  },

  async listMemory() {
    const { data } = await api.get('/assistant/memory')
    return data.memory
  },
  async deleteMemory(id) {
    await api.delete(`/assistant/memory/${id}`)
  },

  async generateRoadmap(goal) {
    const { data } = await api.post('/assistant/roadmap', { goal })
    return data
  },
  async getRoadmaps() {
    const { data } = await api.get('/assistant/roadmap')
    return data.roadmaps
  },

  async analyzeResume(payload) {
    const { data } = await api.post('/assistant/resume/analyze', payload)
    return data
  },
  async getResumes() {
    const { data } = await api.get('/assistant/resume')
    return data.resumes
  },

  async startInterview(role) {
    const { data } = await api.post('/assistant/interview/start', { role })
    return data
  },
  async submitInterviewAnswers(sessionId, answers) {
    const { data } = await api.post('/assistant/interview/answer', { sessionId, answers })
    return data
  },
  async getInterviews() {
    const { data } = await api.get('/assistant/interview')
    return data.interviews
  },

  async analyzeSkillGap(payload) {
    const { data } = await api.post('/assistant/skill-gap', payload)
    return data
  },
  async getSkillGaps() {
    const { data } = await api.get('/assistant/skill-gap')
    return data.skillGaps
  },

  async generateLearningPlan(payload) {
    const { data } = await api.post('/assistant/learning-plan', payload)
    return data
  },
  async getLearningPlans() {
    const { data } = await api.get('/assistant/learning-plan')
    return data.learningPlans
  },
}
