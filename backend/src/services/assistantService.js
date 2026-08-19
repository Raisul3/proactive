import { chatRepository } from '../repositories/chatRepository.js'
import { aiMemoryRepository } from '../repositories/aiMemoryRepository.js'
import { aiRoadmapRepository } from '../repositories/aiRoadmapRepository.js'
import { resumeRepository } from '../repositories/resumeRepository.js'
import { interviewRepository } from '../repositories/interviewRepository.js'
import { skillGapRepository } from '../repositories/skillGapRepository.js'
import { learningPlanRepository } from '../repositories/learningPlanRepository.js'
import { aiService } from '../ai/aiService.js'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

// Maps a detected intent to the dashboard route the user should be routed to.
// `general` has no specific module — the agent just keeps chatting.
const MODULE_ROUTES = {
  career: '/dashboard/career',
  travel: '/dashboard/travel',
  healthcare: '/dashboard/healthcare',
  agriculture: '/dashboard/agriculture',
  bd_service: '/dashboard/bd-hub',
  general: null,
}

const CHAT_SYSTEM_PROMPT = `You are Aida, the AI Agent inside Proactive Life Management — a life-management
platform for people in Bangladesh covering career, travel, healthcare, agriculture, and Bangladesh
government/utility services. Reply helpfully and concisely to the user's message, using any known
facts about them if relevant.

Then:
1. Classify the underlying need into exactly one intent: "career", "travel", "healthcare",
   "agriculture", "bd_service", or "general" (general = casual conversation or nothing module-specific).
2. Extract any new durable facts worth remembering about the user (profession, location, goals,
   health conditions, family, preferences) as short key/value pairs. Only include genuinely new,
   useful, non-sensitive facts. Return an empty array if there is nothing new.

Respond with ONLY JSON, no markdown fences:
{ "reply": string, "intent": "career"|"travel"|"healthcare"|"agriculture"|"bd_service"|"general",
  "memory": [ { "key": string, "value": string } ] }`

export const assistantService = {
  async chat(userId, message) {
    const [recent, memories] = await Promise.all([
      chatRepository.history(userId, 10),
      aiMemoryRepository.findByUser(userId),
    ])

    const conversation = recent
      .reverse()
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const memoryContext = memories.length
      ? `Known facts about this user:\n${memories.map((m) => `- ${m.key}: ${m.value}`).join('\n')}\n\n`
      : ''

    const prompt = `${memoryContext}${conversation ? `${conversation}\n` : ''}User: ${message}`

    const aiResult = await aiService.completeJSON(CHAT_SYSTEM_PROMPT, prompt)

    await chatRepository.create(userId, 'user', message, env.ai.provider)
    await chatRepository.create(userId, 'assistant', aiResult.reply, env.ai.provider)

    if (Array.isArray(aiResult.memory)) {
      await Promise.all(
        aiResult.memory
          .filter((m) => m?.key && m?.value)
          .map((m) => aiMemoryRepository.upsert(userId, String(m.key).slice(0, 100), String(m.value).slice(0, 500)))
      )
    }

    const intent = MODULE_ROUTES[aiResult.intent] !== undefined ? aiResult.intent : 'general'
    return { reply: aiResult.reply, intent, route: MODULE_ROUTES[intent] }
  },

  history(userId) {
    return chatRepository.history(userId, 50)
  },

  // ---- AI Memory ----
  listMemory(userId) {
    return aiMemoryRepository.findByUser(userId)
  },
  deleteMemory(userId, id) {
    return aiMemoryRepository.delete(userId, id)
  },

  // ---- AI Success Roadmap ----
  async generateRoadmap(userId, { goal }) {
    const system = `You are a career and life-success coach. Given a user's goal, return JSON:
{ "milestones": [ { "title": string, "description": string, "timeframe": string, "resources": string[] } ] }.
Provide 4-8 milestones in logical, achievable order.`
    const result = await aiService.completeJSON(system, `Goal: ${goal}`)
    await aiRoadmapRepository.create(userId, goal, result.milestones)
    return result
  },
  getRoadmaps(userId) {
    return aiRoadmapRepository.findByUser(userId)
  },

  // ---- Resume Analyzer / ATS Checker ----
  async analyzeResume(userId, { title, content, targetRole }) {
    const system = `You are an ATS (Applicant Tracking System) simulator and resume expert. Given resume
text and an optional target role, return JSON:
{ "atsScore": number (0-100), "strengths": string[], "weaknesses": string[],
  "missingKeywords": string[], "suggestions": string[] }.`
    const result = await aiService.completeJSON(
      system,
      `Target role: ${targetRole || 'N/A'}\n\nResume:\n${content}`
    )
    await resumeRepository.create(userId, {
      title: title || 'Untitled resume',
      content,
      atsScore: result.atsScore ?? null,
      analysis: result,
    })
    return result
  },
  getResumes(userId) {
    return resumeRepository.findByUser(userId)
  },

  // ---- Interview Coach ----
  async startInterview(userId, { role }) {
    const system = `You are an interview coach. Given a target job role, return JSON:
{ "questions": string[] }. Provide exactly 5 relevant interview questions mixing behavioral and
technical/role-specific questions.`
    const result = await aiService.completeJSON(system, `Role: ${role}`)
    const session = await interviewRepository.create(userId, { role, questions: result.questions })
    return { sessionId: session.id, role, questions: result.questions }
  },
  async submitInterviewAnswers(userId, { sessionId, answers }) {
    const session = await interviewRepository.findOne(userId, sessionId)
    if (!session) throw new ApiError(404, 'Interview session not found')

    const system = `You are an interview coach giving constructive feedback. Given the role, questions,
and the candidate's answers, return JSON:
{ "score": number (0-100), "strengths": string[], "improvements": string[] }.`
    const prompt = session.questions
      .map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || '(no answer given)'}`)
      .join('\n\n')

    const feedback = await aiService.completeJSON(system, `Role: ${session.role}\n\n${prompt}`)
    await interviewRepository.update(sessionId, { answers, feedback })
    return feedback
  },
  getInterviews(userId) {
    return interviewRepository.findByUser(userId)
  },

  // ---- Skill Gap Analyzer ----
  async analyzeSkillGap(userId, { targetRole, currentSkills }) {
    const skillsList = Array.isArray(currentSkills)
      ? currentSkills
      : String(currentSkills).split(',').map((s) => s.trim()).filter(Boolean)

    const system = `You are a career skills analyst. Given a target role and the user's current skills,
return JSON:
{ "matchedSkills": string[], "missingSkills": string[], "priority": string[], "roadmap": string[] }.
"priority" lists the missing skills in the order they should be learned. "roadmap" gives 3-6 short
actionable steps to close the gap.`
    const result = await aiService.completeJSON(
      system,
      `Target role: ${targetRole}\nCurrent skills: ${skillsList.join(', ')}`
    )
    await skillGapRepository.create(userId, { targetRole, currentSkills: skillsList, result })
    return result
  },
  getSkillGaps(userId) {
    return skillGapRepository.findByUser(userId)
  },

  // ---- Learning Planner ----
  async generateLearningPlan(userId, { goal, weeks }) {
    const system = `You are a learning-path designer. Given a learning goal and a timeframe in weeks,
return JSON:
{ "weeks": [ { "week": number, "focus": string, "resources": string[], "tasks": string[] } ] }
covering the full timeframe.`
    const result = await aiService.completeJSON(system, `Goal: ${goal}\nTimeframe: ${weeks || 8} weeks`)
    await learningPlanRepository.create(userId, { goal, plan: result })
    return result
  },
  getLearningPlans(userId) {
    return learningPlanRepository.findByUser(userId)
  },
}
