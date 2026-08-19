import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Loader2, Repeat, Flame, X, Check } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { habitService } from '../../services/habitService'
import { getErrorMessage } from '../../utils/errors'

function isCheckedInToday(lastCheckIn) {
  if (!lastCheckIn) return false
  const last = new Date(lastCheckIn)
  const now = new Date()
  return last.toDateString() === now.toDateString()
}

export default function HabitsPage() {
  const [habits, setHabits] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [busyId, setBusyId] = useState(null)

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: { frequency: 'daily' },
  })

  async function loadHabits() {
    setIsLoading(true)
    setError('')
    try {
      setHabits(await habitService.list())
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your habits.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHabits()
  }, [])

  async function onCreate(values) {
    try {
      const habit = await habitService.create({ title: values.title, frequency: values.frequency })
      setHabits((prev) => [habit, ...prev])
      reset({ frequency: 'daily' })
      setShowForm(false)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create the habit.'))
    }
  }

  async function checkIn(habit) {
    setBusyId(habit.id)
    try {
      const { streak } = await habitService.checkIn(habit.id)
      setHabits((prev) =>
        prev.map((h) => (h.id === habit.id ? { ...h, streak, lastCheckIn: new Date().toISOString() } : h))
      )
    } catch (err) {
      setError(getErrorMessage(err, 'Could not check in.'))
    } finally {
      setBusyId(null)
    }
  }

  async function deleteHabit(id) {
    if (!confirm('Delete this habit? This cannot be undone.')) return
    setBusyId(id)
    try {
      await habitService.remove(id)
      setHabits((prev) => prev.filter((h) => h.id !== id))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete the habit.'))
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <PageHeader title="Habit Tracker" description="Build routines and keep your streaks alive." />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold shrink-0"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'New Habit'}
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
            <div>
              <label className="text-sm font-medium block mb-1">Habit</label>
              <input
                placeholder="e.g. Read 20 minutes"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('title', { required: true })}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Frequency</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('frequency')}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Save Habit
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading habits...
        </div>
      ) : habits.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-text-muted)]">
          <Repeat size={28} className="mx-auto mb-2 opacity-60" />
          No habits yet. Add one to start tracking your streak.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {habits.map((habit) => {
            const doneToday = isCheckedInToday(habit.lastCheckIn)
            return (
              <div key={habit.id} className="card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-50)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
                  <Flame size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{habit.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] capitalize">
                    {habit.frequency} · {habit.streak} day streak
                  </p>
                </div>
                <button
                  onClick={() => checkIn(habit)}
                  disabled={busyId === habit.id || doneToday}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full disabled:opacity-60 ${
                    doneToday
                      ? 'bg-[var(--color-success-50)] text-[var(--color-success-dark)]'
                      : 'bg-[var(--color-primary)] text-white'
                  }`}
                >
                  <Check size={14} />
                  {doneToday ? 'Done' : 'Check in'}
                </button>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  disabled={busyId === habit.id}
                  className="text-[var(--color-error)] p-1.5 rounded-full hover:bg-[var(--color-error-50)] disabled:opacity-50"
                  aria-label="Delete habit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
