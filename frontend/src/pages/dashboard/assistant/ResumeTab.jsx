import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function ResumeTab() {
  const [title, setTitle] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [content, setContent] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const data = await assistantService.analyzeResume({ title, targetRole, content })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not analyze the resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Resume title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Target role (optional)</label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Paste your resume text</label>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)] font-mono text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
        >
          <Sparkles size={16} />
          {isLoading ? 'Analyzing...' : 'Analyze Resume (ATS Check)'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="card p-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)] flex items-center justify-center text-2xl font-bold">
              {result.atsScore ?? '—'}
            </div>
            <div>
              <h3 className="font-bold">ATS Score</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Out of 100 — higher means better parsing by applicant tracking systems.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-success)]">Strengths</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold mb-2 text-[var(--color-error)]">Weaknesses</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {result.weaknesses?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>

          {result.missingKeywords?.length > 0 && (
            <div className="card p-5">
              <h4 className="font-semibold mb-2">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)]">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.suggestions?.length > 0 && (
            <div className="card p-5">
              <h4 className="font-semibold mb-2">Suggestions</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
