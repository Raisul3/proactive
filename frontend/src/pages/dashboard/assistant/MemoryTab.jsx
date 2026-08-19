import { useEffect, useState } from 'react'
import { BrainCircuit, Trash2, Loader2 } from 'lucide-react'
import { assistantService } from '../../../services/assistantService'

export default function MemoryTab() {
  const [memory, setMemory] = useState(null)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    assistantService
      .listMemory()
      .then(setMemory)
      .catch(() => setError('Could not load AI memory.'))
  }, [])

  const remove = async (id) => {
    setDeletingId(id)
    try {
      await assistantService.deleteMemory(id)
      setMemory((prev) => prev.filter((m) => m.id !== id))
    } catch {
      setError('Could not remove that memory. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!memory) {
    return (
      <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading memory...
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Aida remembers durable facts from your chats — like your profession, location, or goals — so future
        answers stay personalized. You can remove anything you don't want it to keep.
      </p>

      {error && <p className="mb-4 text-sm text-[var(--color-error)]">{error}</p>}

      {memory.length === 0 ? (
        <div className="card p-8 flex flex-col items-center text-center text-[var(--color-text-muted)]">
          <BrainCircuit size={28} className="mb-2" />
          Nothing remembered yet — chat with Aida and useful facts will show up here.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {memory.map((m) => (
            <div key={m.id} className="card p-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">{m.key}</p>
                <p className="text-sm text-[var(--color-text-primary)] mt-0.5">{m.value}</p>
              </div>
              <button
                onClick={() => remove(m.id)}
                disabled={deletingId === m.id}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] disabled:opacity-50 shrink-0"
                aria-label="Forget this"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
