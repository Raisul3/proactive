import { useEffect, useState } from 'react'
import { Siren, Loader2, Phone } from 'lucide-react'
import { bdHubService } from '../../../services/bdHubService'

const CATEGORY_LABELS = {
  emergency: 'Emergency',
  government: 'Government',
  social: 'Social Welfare',
  health: 'Health',
}

export default function EmergencyContactsTab() {
  const [contacts, setContacts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    bdHubService
      .getEmergencyContacts()
      .then(setContacts)
      .catch(() => setError('Could not load emergency contacts.'))
  }, [])

  if (error) {
    return <p className="text-sm text-[var(--color-error)]">{error}</p>
  }

  if (!contacts) {
    return (
      <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading emergency contacts...
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
        <Siren size={16} className="text-[var(--color-error)]" />
        Nationally known Bangladesh helplines. Save these on your phone for quick access.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {contacts.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number}`}
            className="card p-4 flex items-center justify-between gap-3 hover:shadow-[var(--shadow-glow)] transition"
          >
            <div>
              <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide">
                {CATEGORY_LABELS[c.category] || c.category}
              </p>
              <p className="text-sm font-medium mt-0.5">{c.name}</p>
            </div>
            <div className="flex items-center gap-1.5 text-lg font-bold text-[var(--color-text-primary)] shrink-0">
              <Phone size={16} className="text-[var(--color-success)]" />
              {c.number}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
