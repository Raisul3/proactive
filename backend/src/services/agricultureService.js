import { agricultureRepository } from '../repositories/agricultureRepository.js'
import { aiService } from '../ai/aiService.js'

const SYSTEM_PROMPT = `You are an agriculture advisor for Bangladesh. Given soil type, land size,
and season, return JSON: { "crops": [ { "name": string, "estimatedYield": string,
"buyers": string[] } ] }. Include 3-5 crop options suited to the inputs.`

export const agricultureService = {
  async getRecommendation(userId, { soilType, landSize, season }) {
    const aiResult = await aiService.completeJSON(
      SYSTEM_PROMPT,
      `Soil type: ${soilType}\nLand size: ${landSize} acres\nSeason: ${season}`
    )

    await agricultureRepository.create(userId, {
      soilType,
      landSize,
      season,
      aiRecommendations: aiResult.crops,
    })

    return aiResult
  },
  getHistory(userId) {
    return agricultureRepository.findByUser(userId)
  },
}
