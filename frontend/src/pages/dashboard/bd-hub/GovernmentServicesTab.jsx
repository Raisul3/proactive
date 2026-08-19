import { useState } from 'react'
import { Sparkles, Landmark, ExternalLink } from 'lucide-react'
import { bdHubService } from '../../../services/bdHubService'
import { GOV_SERVICE_LINKS } from '../../../constants/bdData'

const SERVICE_TYPES = [
  'National ID (NID)',
  'Passport (e-passport)',
  'Land record (khatian/porcha) & land tax',
  'TIN / income tax',
  'Trade license',
  'Birth / death registration',
  'Driving license (BRTA)',
  'Other',
]

export default function GovernmentServicesTab() {
  const [query, setQuery] = useState('')
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const data = await bdHubService.getGuidance({ category: 'government', query: `${serviceType}: ${query}` })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch guidance. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="card p-5 mb-6">
        <h4 className="font-semibold mb-3 text-sm text-[var(--color-text-muted)] uppercase tracking-wide">
          Official Government Portals
        </h4>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {GOV_SERVICE_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] hover:bg-[var(--color-primary-100)] transition text-sm"
            >
              <span>
                <span className="font-medium text-[var(--color-text-primary)]">{link.name}</span>
                <span className="block text-xs text-[var(--color-text-muted)]">{link.note}</span>
              </span>
              <ExternalLink size={14} className="text-[var(--color-text-muted)] shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">Service</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
            >
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Your question</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How do I correct my date of birth?"
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
          {isLoading ? 'Looking up the process...' : 'Get Guidance'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}

      {result ? (
        <div className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h4 className="font-semibold mb-2">Steps</h4>
              <ol className="text-sm text-[var(--color-text-secondary)] list-decimal list-inside space-y-1">
                {result.steps?.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
            <div className="card p-5">
              <h4 className="font-semibold mb-2">Required documents</h4>
              <ul className="text-sm text-[var(--color-text-secondary)] list-disc list-inside space-y-1">
                {result.requiredDocuments?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card p-4">
              <p className="text-xs text-[var(--color-text-muted)]">Estimated fee</p>
              <p className="font-semibold mt-1">{result.estimatedFee}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-[var(--color-text-muted)]">Estimated time</p>
              <p className="font-semibold mt-1">{result.estimatedTime}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-[var(--color-text-muted)]">Office to visit</p>
              <p className="font-semibold mt-1">{result.officeToVisit}</p>
            </div>
          </div>
          {result.notes && (
            <div className="card p-5 text-sm text-[var(--color-text-secondary)]">{result.notes}</div>
          )}
        </div>
      ) : (
        !isLoading && (
          <div className="mt-6 card p-8 flex flex-col items-center text-center text-[var(--color-text-muted)]">
            <Landmark size={28} className="mb-2" />
            Pick a service and ask your question to get step-by-step guidance.
          </div>
        )
      )}
    </div>
  )
}
