import { useState } from 'react'
import { Sparkles, BookOpen } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function LearningPlanTab() {
  const [goal, setGoal] = useState('')
  const [weeks, setWeeks] = useState(8)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!goal.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const data = await assistantService.generateLearningPlan({ goal, weeks: Number(weeks) })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate a learning plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium block mb-1">What do you want to learn?</label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. React and modern frontend development"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Timeframe (weeks)</label>
            <input
              type="number"
              min={1}
              max={52}
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
        >
          <Sparkles size={16} />
          {isLoading ? 'Building your plan...' : 'Generate Learning Plan'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}

      {result?.weeks?.length > 0 && (
        <div className="mt-6 space-y-3">
          {result.weeks.map((w, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center text-xs font-bold shrink-0">
                  W{w.week ?? i + 1}
                </span>
                <h3 className="font-bold">{w.focus}</h3>
              </div>
              {w.resources?.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1">Resources</p>
                  <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                    {w.resources.map((r, j) => <li key={j}>{r}</li>)}
                  </ul>
                </div>
              )}
              {w.tasks?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1">Tasks</p>
                  <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                    {w.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!result && !isLoading && (
        <div className="mt-6 card p-8 flex flex-col items-center text-center text-[var(--color-text-muted)]">
          <BookOpen size={28} className="mb-2" />
          Set a learning goal and timeframe to get a week-by-week plan.
        </div>
      )}
    </div>
  )
}
