import { useEffect, useRef, useState } from 'react'
import { Send, ArrowRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { assistantService } from '../../../services/assistantService'

const MODULE_LABELS = {
  career: 'Career',
  travel: 'Travel Planner',
  healthcare: 'Healthcare',
  agriculture: 'Agriculture',
  bd_service: 'Bangladesh Service Hub',
}

export default function ChatTab() {
  const navigate = useNavigate()
  const location = useLocation()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm Aida, your AI agent. Ask me anything about your career, travel, health, farming, or Bangladesh government services — I'll help directly or point you to the right tool.",
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const autoSentRef = useRef(false)

  const send = async (text) => {
    if (!text.trim() || isSending) return
    const userMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)
    try {
      const data = await assistantService.chat(userMessage.content)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply, route: data.route, intent: data.intent },
      ])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setIsSending(false)
    }
  }

  // If the home page search bar sent us here with a query, send it once.
  useEffect(() => {
    const initialMessage = location.state?.initialMessage
    if (initialMessage && !autoSentRef.current) {
      autoSentRef.current = true
      send(initialMessage)
      navigate(location.pathname, { replace: true, state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  const sendMessage = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="max-w-2xl">
      <div className="card p-4 h-[50vh] overflow-y-auto flex flex-col gap-3 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                m.role === 'user'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
              }`}
            >
              {m.content}
            </div>
            {m.route && (
              <button
                onClick={() => navigate(m.route)}
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
              >
                Open {MODULE_LABELS[m.intent] || 'module'} <ArrowRight size={12} />
              </button>
            )}
          </div>
        ))}
        {isSending && <div className="self-start text-xs text-[var(--color-text-muted)]">Thinking...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-full border border-[var(--color-border-default)]"
        />
        <button
          type="submit"
          disabled={isSending}
          className="w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center disabled:opacity-60"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
