import { env } from '../../config/env.js'

// Groq's endpoint is OpenAI-compatible, so the request/response shape
// matches openaiProvider.js exactly — only the base URL, key, and model differ.
export const groqProvider = {
  name: 'groq',
  async complete({ system, prompt }) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.ai.groqKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) throw new Error(`Groq request failed: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },
}