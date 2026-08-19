import { env } from '../../config/env.js'

export const claudeProvider = {
  name: 'claude',
  async complete({ system, prompt }) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ai.claudeKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!response.ok) throw new Error(`Claude request failed: ${response.status}`)
    const data = await response.json()
    return data.content.map((block) => block.text || '').join('')
  },
}
