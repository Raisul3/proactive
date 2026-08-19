import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function SkillGapTab() {
  const [targetRole, setTargetRole] = useState('')
  const [currentSkills, setCurrentSkills] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!targetRole.trim() || !currentSkills.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const data = await assistantService.analyzeSkillGap({ targetRole, currentSkills })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not analyze skill gaps. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Target role</label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Your current skills (comma-separated)</label>
            <input
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              placeholder="e.g. HTML, CSS, JavaScript"
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
          {isLoading ? 'Analyzing gaps...' : 'Analyze Skill Gap'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-success)]">You already have</h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-error)]">Missing skills</h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {result.priority?.length > 0 && (
            <div className="card p-5">
              <h4 className="font-semibold mb-2">Learning priority order</h4>
              <ol className="text-sm text-[var(--color-text-secondary)] list-decimal list-inside space-y-1">
                {result.priority.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          )}

          {result.roadmap?.length > 0 && (
            <div className="card p-5">
              <h4 className="font-semibold mb-2">How to close the gap</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {result.roadmap.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
