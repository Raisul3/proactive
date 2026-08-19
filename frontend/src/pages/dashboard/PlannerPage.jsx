import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Loader2, ListTodo, X } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { taskService } from '../../services/taskService'
import { getErrorMessage } from '../../utils/errors'

const STATUSES = ['PENDING', 'IN_PROGRESS', 'DONE']

const STATUS_STYLES = {
  PENDING: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
  IN_PROGRESS: 'bg-[var(--color-primary-100)] text-[var(--color-primary)]',
  DONE: 'bg-[var(--color-success-50)] text-[var(--color-success-dark)]',
}

const STATUS_LABELS = { PENDING: 'Pending', IN_PROGRESS: 'In Progress', DONE: 'Done' }

export default function PlannerPage() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [filter, setFilter] = useState('ALL')

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  async function loadTasks() {
    setIsLoading(true)
    setError('')
    try {
      setTasks(await taskService.list())
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your tasks.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function onCreate(values) {
    try {
      const task = await taskService.create({
        title: values.title,
        notes: values.notes || undefined,
        dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      })
      setTasks((prev) => [task, ...prev])
      reset()
      setShowForm(false)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create the task.'))
    }
  }

  async function cycleStatus(task) {
    const next = STATUSES[(STATUSES.indexOf(task.status) + 1) % STATUSES.length]
    setBusyId(task.id)
    try {
      await taskService.update(task.id, { status: next })
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: next } : t)))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update the task.'))
    } finally {
      setBusyId(null)
    }
  }

  async function deleteTask(id) {
    if (!confirm('Delete this task? This cannot be undone.')) return
    setBusyId(id)
    try {
      await taskService.remove(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete the task.'))
      setBusyId(null)
    }
  }

  const visibleTasks = filter === 'ALL' ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <PageHeader title="Daily Planner" description="Plan your day and track tasks to completion." />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold shrink-0"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'New Task'}
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
              <label className="text-sm font-medium block mb-1">Due Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('dueDate')}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1">Notes</label>
              <textarea
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
                {...register('notes')}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Save Task
          </button>
        </form>
      )}

      <div className="flex gap-2 mb-4">
        {['ALL', ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              filter === s
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'border-[var(--color-border-default)] text-[var(--color-text-secondary)]'
            }`}
          >
            {s === 'ALL' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading tasks...
        </div>
      ) : visibleTasks.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-text-muted)]">
          <ListTodo size={28} className="mx-auto mb-2 opacity-60" />
          No tasks here. Add one to plan your day.
        </div>
      ) : (
        <div className="space-y-3">
          {visibleTasks.map((task) => (
            <div key={task.id} className="card p-4 flex items-center gap-4">
              <button
                onClick={() => cycleStatus(task)}
                disabled={busyId === task.id}
                className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 disabled:opacity-50 ${STATUS_STYLES[task.status]}`}
              >
                {STATUS_LABELS[task.status]}
              </button>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium truncate ${
                    task.status === 'DONE'
                      ? 'line-through text-[var(--color-text-muted)]'
                      : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {task.title}
                </h3>
                {task.notes && (
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{task.notes}</p>
                )}
              </div>
              {task.dueDate && (
                <span className="text-xs text-[var(--color-text-muted)] shrink-0 hidden sm:inline">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                disabled={busyId === task.id}
                className="text-[var(--color-error)] p-1.5 rounded-full hover:bg-[var(--color-error-50)] disabled:opacity-50 shrink-0"
                aria-label="Delete task"
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
