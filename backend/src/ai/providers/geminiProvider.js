import { env } from '../../config/env.js'

export const geminiProvider = {
  name: 'gemini',
  async complete({ system, prompt }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.ai.geminiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    })
    if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`)
    const data = await response.json()
    return data.candidates[0].content.parts.map((p) => p.text).join('')
  },
}
