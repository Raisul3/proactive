import { useState } from 'react'
import { Mic, Sparkles } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function InterviewTab() {
  const [role, setRole] = useState('')
  const [session, setSession] = useState(null) // { sessionId, role, questions }
  const [answers, setAnswers] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const startInterview = async (e) => {
    e.preventDefault()
    if (!role.trim()) return
    setIsLoading(true)
    setError('')
    setFeedback(null)
    try {
      const data = await assistantService.startInterview(role)
      setSession(data)
      setAnswers(new Array(data.questions.length).fill(''))
    } catch (err) {
      setError(err.response?.data?.message || 'Could not start the interview. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswers = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const data = await assistantService.submitInterviewAnswers(session.sessionId, answers)
      setFeedback(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not score your answers. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <form onSubmit={startInterview} className="card p-6 space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-medium block mb-1">Which role are you practicing for?</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Junior Data Analyst"
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
          />
        </div>
        {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
        >
          <Mic size={16} />
          {isLoading ? 'Preparing questions...' : 'Start Mock Interview'}
        </button>
      </form>
    )
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={submitAnswers} className="space-y-4">
        {session.questions.map((q, i) => (
          <div key={i} className="card p-5">
            <p className="font-medium mb-2">{i + 1}. {q}</p>
            <textarea
              rows={3}
              value={answers[i]}
              onChange={(e) => setAnswers((prev) => prev.map((a, j) => (j === i ? e.target.value : a)))}
              disabled={!!feedback}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)] disabled:opacity-60"
            />
          </div>
        ))}
        {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
        {!feedback && (
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
          >
            <Sparkles size={16} />
            {isLoading ? 'Scoring your answers...' : 'Submit for Feedback'}
          </button>
        )}
      </form>

      {feedback && (
        <div className="mt-6 space-y-4">
          <div className="card p-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)] flex items-center justify-center text-2xl font-bold">
              {feedback.score}
            </div>
            <h3 className="font-bold">Interview Score</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-success)]">Strengths</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {feedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-error)]">Areas to Improve</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {feedback.improvements?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              setSession(null)
              setFeedback(null)
              setRole('')
            }}
            className="px-5 py-2.5 rounded-full border border-[var(--color-border-default)] text-sm font-medium"
          >
            Practice another role
          </button>
        </div>
      )}
    </div>
  )
}
