import { careerRepository } from '../repositories/careerRepository.js'
import { aiService } from '../ai/aiService.js'

const SYSTEM_PROMPT = `You are a career advisor for Bangladesh. Given a user's education,
skills, and interests, return JSON: { "recommendations": [ { "title": string,
"description": string, "matchedSkills": string[], "missingSkills": string[] } ] }.
Return 3-5 recommendations.`

export const careerService = {
  async getRecommendation(userId, { education, skills, interests }) {
    const skillsList = Array.isArray(skills) ? skills : String(skills).split(',').map((s) => s.trim())

    const aiResult = await aiService.completeJSON(
      SYSTEM_PROMPT,
      `Education: ${education}\nSkills: ${skillsList.join(', ')}\nInterests: ${interests || 'N/A'}`
    )

    await careerRepository.create(userId, {
      education,
      skills: skillsList,
      interests,
      aiRecommendations: aiResult.recommendations,
    })

    return aiResult
  },

  getHistory(userId) {
    return careerRepository.findByUser(userId)
  },
}
