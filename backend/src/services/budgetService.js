import { budgetRepository } from '../repositories/budgetRepository.js'
import { aiService } from '../ai/aiService.js'

const SYSTEM_PROMPT = `You are a personal finance advisor for Bangladesh. Given monthly income,
monthly expenses, and an optional savings goal, return JSON: { "tips": string[],
"breakdown": { "rent": number, "food": number, "transport": number, "savings": number, "other": number } }.
Give 3-5 concise, practical tips.`

export const budgetService = {
  async getRecommendation(userId, { monthlyIncome, monthlyExpenses, savingsGoal }) {
    const aiResult = await aiService.completeJSON(
      SYSTEM_PROMPT,
      `Monthly income: ${monthlyIncome}\nMonthly expenses: ${monthlyExpenses}\nSavings goal: ${savingsGoal || 'N/A'}`
    )

    await budgetRepository.create(userId, {
      monthlyIncome,
      monthlyExpenses,
      savingsGoal: savingsGoal || null,
      breakdown: aiResult.breakdown,
      aiSummary: (aiResult.tips || []).join(' '),
    })

    return aiResult
  },
  getHistory(userId) {
    return budgetRepository.findByUser(userId)
  },
}
