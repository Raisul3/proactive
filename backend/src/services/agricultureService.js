import { agricultureRepository } from '../repositories/agricultureRepository.js'
import { aiService } from '../ai/aiService.js'
import { agriKnowledgeService } from './agriKnowledgeService.js'

const SYSTEM_PROMPT = `You are an agriculture advisor for Bangladesh. You receive a farmer's soil type,
land size, season and optionally a district, plus reference data from our crop database.
Return ONLY JSON: { "crops": [ { "name": string, "estimatedYield": string,
"buyers": string[], "reason": string } ] }.
Give 3-5 crop options. Prefer crops from the reference data. Use the reference yield ranges
(tons per acre) to estimate the total yield for the given land size. "reason" is one short
sentence on why the crop fits the soil, season and district.`

const fmtCrop = (c) =>
  `${c.name} (soil fit ${c.rating}/5${
    c.yieldPerAcre ? `, ${c.yieldPerAcre.min}-${c.yieldPerAcre.max} t/acre` : ''
  })`

function buildUserPrompt({ soilType, landSize, season, district }, kb) {
  const lines = [
    `Soil type: ${soilType}`,
    `Land size: ${landSize} acres`,
    `Season: ${season}`,
  ]
  if (district) lines.push(`District: ${district}`)

  if (kb?.soilCrops?.crops?.length) {
    lines.push(`Reference - crops suited to ${soilType} soil in ${season}: ${kb.soilCrops.crops.map(fmtCrop).join('; ')}`)
  }
  if (kb?.districtCrops?.crops?.length) {
    lines.push(
      `Reference - crops commonly grown in ${kb.districtCrops.district} (soils: ${kb.districtCrops.soils.join(', ')}): ` +
        kb.districtCrops.crops.filter((c) => c.seasonMatch).map(fmtCrop).join('; ')
    )
  }
  return lines.join('\n')
}

export const agricultureService = {
  async getRecommendation(userId, { soilType, landSize, season, district }) {
    // Knowledge base optional: fail korleo AI ta cholbe
    let knowledgeBase = null
    try {
      knowledgeBase = await agriKnowledgeService.getAdvice({ soilType, season, district, landSize })
    } catch (err) {
      console.error('Agri knowledge base lookup failed:', err.message)
    }

    let aiResult
    try {
      aiResult = await aiService.completeJSON(
        SYSTEM_PROMPT,
        buildUserPrompt({ soilType, landSize, season, district }, knowledgeBase)
      )
    } catch (err) {
      // AI fail hole KB result ta-i ferot dao
      if (!knowledgeBase) throw err
      return { crops: [], aiError: err.message || 'AI unavailable', knowledgeBase }
    }

    await agricultureRepository.create(userId, {
      soilType,
      landSize,
      season,
      aiRecommendations: aiResult.crops,
    })

    return { ...aiResult, knowledgeBase }
  },

  getHistory(userId) {
    return agricultureRepository.findByUser(userId)
  },
}