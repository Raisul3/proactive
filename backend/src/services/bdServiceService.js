import { bdServiceRepository } from '../repositories/bdServiceRepository.js'
import { aiService } from '../ai/aiService.js'

const SYSTEM_PROMPT = `You are a Bangladesh public-services guide. You help residents navigate government
and utility processes: National ID (NID), passport (e-passport), land records (khatian/porcha, land tax),
TIN/income tax, trade license, birth/death registration, driving license (BRTA), and utility bills
(electricity — DESCO/DPDC/PDB/NESCO/WZPDCL, gas — Titas/others, water — WASA).

Given a service category and the user's question, return JSON:
{ "steps": string[], "requiredDocuments": string[], "estimatedFee": string, "estimatedTime": string,
  "officeToVisit": string, "notes": string }.
Be specific and practical for Bangladesh. If unsure of exact current fees, give a realistic estimate
and say it should be confirmed at the office/website.`

// Well-known Bangladesh public emergency & helpline numbers. Static reference
// data — doesn't change often, so it's served without hitting the AI or DB.
const EMERGENCY_CONTACTS = [
  { name: 'National Emergency Service (Police / Fire / Ambulance)', number: '999', category: 'emergency' },
  { name: 'Fire Service & Civil Defence', number: '199', category: 'emergency' },
  { name: 'National Helpline (Government Info Service)', number: '333', category: 'government' },
  { name: 'Violence Against Women & Children Helpline', number: '109', category: 'social' },
  { name: 'Child Helpline', number: '1098', category: 'social' },
  { name: 'Anti-Corruption Helpline', number: '106', category: 'government' },
  { name: 'Health Batayon (Health advice)', number: '16263', category: 'health' },
]

export const bdServiceService = {
  async getGuidance(userId, { category, query }) {
    const result = await aiService.completeJSON(SYSTEM_PROMPT, `Category: ${category}\nQuestion: ${query}`)
    await bdServiceRepository.create(userId, { category, query, guidance: result })
    return result
  },
  getHistory(userId) {
    return bdServiceRepository.findByUser(userId)
  },
  getEmergencyContacts() {
    return EMERGENCY_CONTACTS
  },
}
