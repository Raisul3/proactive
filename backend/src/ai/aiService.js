import { env } from '../config/env.js'
import { openaiProvider } from './providers/openaiProvider.js'
import { claudeProvider } from './providers/claudeProvider.js'
import { geminiProvider } from './providers/geminiProvider.js'
import { groqProvider } from './providers/groqProvider.js'
import { mistralProvider } from './providers/mistralProvider.js'

const providers = {
  openai: openaiProvider,
  claude: claudeProvider,
  gemini: geminiProvider,
  groq: groqProvider,
  mistral: mistralProvider,
}

/**
 * Single entry point the rest of the backend uses for AI calls.
 * Swap providers globally via AI_PROVIDER in .env, or per-call via
 * `providerName`, without any calling code changing.
 */
export const aiService = {
  async complete({ system, prompt }, providerName = env.ai.provider) {
    const provider = providers[providerName]
    if (!provider) throw new Error(`Unknown AI provider: ${providerName}`)
    return provider.complete({ system, prompt })
  },

  /**
   * Convenience helper for structured JSON recommendations. Instructs the
   * model to return JSON only, then parses it — used by career/travel/
   * healthcare/agriculture/budget modules.
   */
  async completeJSON(system, prompt, providerName) {
    const raw = await this.complete(
      { system: `${system}\nRespond with ONLY valid JSON, no markdown fences, no prose.`, prompt },
      providerName
    )
    try {
      return JSON.parse(raw)
    } catch {
      throw new Error('AI provider returned non-JSON output')
    }
  },
}
