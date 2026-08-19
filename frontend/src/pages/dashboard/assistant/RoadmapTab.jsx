import { useState } from 'react'
import { Sparkles, Loader2, Map } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function RoadmapTab() {
  const [goal, setGoal] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!goal.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const data = await assistantService.generateRoadmap(goal)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate a roadmap. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">What's your goal?</label>
          <textarea
            rows={2}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Become a backend software engineer at a top company within 18 months"
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
        >
          <Sparkles size={16} />
          {isLoading ? 'Building roadmap...' : 'Generate Roadmap'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Loader2 size={16} className="animate-spin" /> Mapping out your milestones...
        </div>
      )}

      {result?.milestones?.length > 0 && (
        <div className="mt-6 space-y-3">
          {result.milestones.map((m, i) => (
            <div key={i} className="card p-5 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{m.title}</h3>
                  {m.timeframe && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
                      {m.timeframe}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{m.description}</p>
                {m.resources?.length > 0 && (
                  <ul className="mt-2 text-sm text-[var(--color-text-muted)] list-disc list-inside">
                    {m.resources.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!result && !isLoading && (
        <div className="mt-6 card p-8 flex flex-col items-center text-center text-[var(--color-text-muted)]">
          <Map size={28} className="mb-2" />
          Describe a goal above and get a step-by-step success roadmap.
        </div>
      )}
    </div>
  )
}
