import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Loader2, Target, X } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { goalService } from '../../services/goalService'
import { getErrorMessage } from '../../utils/errors'

const STATUS_STYLES = {
  ACTIVE: 'bg-[var(--color-primary-100)] text-[var(--color-primary)]',
  COMPLETED: 'bg-[var(--color-success-50)] text-[var(--color-success-dark)]',
  ARCHIVED: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]',
}

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [busyId, setBusyId] = useState(null)

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  async function loadGoals() {
    setIsLoading(true)
    setError('')
    try {
      setGoals(await goalService.list())
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your goals.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  async function onCreate(values) {
    try {
      const goal = await goalService.create({
        title: values.title,
        category: values.category || undefined,
        description: values.description || undefined,
        targetDate: values.targetDate ? new Date(values.targetDate).toISOString() : undefined,
      })
      setGoals((prev) => [goal, ...prev])
      reset()
      setShowForm(false)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create the goal.'))
    }
  }

  async function bumpProgress(goal, delta) {
    const progress = Math.min(100, Math.max(0, goal.progress + delta))
    const status = progress === 100 ? 'COMPLETED' : goal.status === 'COMPLETED' ? 'ACTIVE' : goal.status
    setBusyId(goal.id)
    try {
      const updated = await goalService.update(goal.id, { progress, status })
      setGoals((prev) => prev.map((g) => (g.id === goal.id ? updated : g)))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update the goal.'))
    } finally {
      setBusyId(null)
    }
  }

  async function archiveGoal(goal) {
    setBusyId(goal.id)
    try {
      const updated = await goalService.update(goal.id, {
        status: goal.status === 'ARCHIVED' ? 'ACTIVE' : 'ARCHIVED',
      })
      setGoals((prev) => prev.map((g) => (g.id === goal.id ? updated : g)))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update the goal.'))
    } finally {
      setBusyId(null)
    }
  }

  async function deleteGoal(id) {
    if (!confirm('Delete this goal? This cannot be undone.')) return
    setBusyId(id)
    try {
      await goalService.remove(id)
      setGoals((prev) => prev.filter((g) => g.id !== id))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete the goal.'))
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <PageHeader title="Goal Planner" description="Set goals, track progress, and stay accountable." />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold shrink-0"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit(onCreate)} className="card p-6 space-y-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1">Title</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('title', { required: true })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <input
                placeholder="e.g. Career, Health"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('category')}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Target Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('targetDate')}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1">Description</label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('description')}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Save Goal
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading goals...
        </div>
      ) : goals.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-text-muted)]">
          <Target size={28} className="mx-auto mb-2 opacity-60" />
          No goals yet. Create your first one to get started.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="card p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{goal.title}</h3>
                  {goal.category && (
                    <span className="text-xs text-[var(--color-text-muted)]">{goal.category}</span>
                  )}
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[goal.status]}`}>
                  {goal.status}
                </span>
              </div>

              {goal.description && (
                <p className="text-sm text-[var(--color-text-secondary)]">{goal.description}</p>
              )}

              <div>
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-primary)] transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {goal.targetDate && (
                <p className="text-xs text-[var(--color-text-muted)]">
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </p>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => bumpProgress(goal, 10)}
                  disabled={busyId === goal.id}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] disabled:opacity-50"
                >
                  +10%
                </button>
                <button
                  onClick={() => archiveGoal(goal)}
                  disabled={busyId === goal.id}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] disabled:opacity-50"
                >
                  {goal.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  disabled={busyId === goal.id}
                  className="ml-auto text-[var(--color-error)] p-1.5 rounded-full hover:bg-[var(--color-error-50)] disabled:opacity-50"
                  aria-label="Delete goal"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
