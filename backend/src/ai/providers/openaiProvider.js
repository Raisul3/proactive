import { env } from '../../config/env.js'

// Each provider implements the same `complete({ system, prompt })` shape
// so the rest of the app never needs to know which AI vendor is active.
export const openaiProvider = {
  name: 'openai',
  async complete({ system, prompt }) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.ai.openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },
}
