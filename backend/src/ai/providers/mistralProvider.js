import { env } from '../../config/env.js'

// Also OpenAI-compatible — same shape again.
export const mistralProvider = {
  name: 'mistral',
  async complete({ system, prompt }) {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.ai.mistralKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) throw new Error(`Mistral request failed: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },
}