import { useEffect, useState } from 'react'
import { Bell, CheckCheck, Loader2, Info, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { notificationService } from '../../services/notificationService'
import { getErrorMessage } from '../../utils/errors'

const TYPE_STYLES = {
  INFO: { icon: Info, className: 'bg-[var(--color-primary-100)] text-[var(--color-primary)]' },
  WARNING: { icon: AlertTriangle, className: 'bg-[var(--color-warning-50,var(--color-bg-secondary))] text-[var(--color-warning,var(--color-text-primary))]' },
  SUCCESS: { icon: CheckCircle2, className: 'bg-[var(--color-success-50)] text-[var(--color-success-dark)]' },
  REMINDER: { icon: Clock, className: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]' },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  async function load() {
    setIsLoading(true)
    setError('')
    try {
      setNotifications(await notificationService.list())
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your notifications.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function markRead(id) {
    setBusyId(id)
    try {
      await notificationService.markRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update this notification.'))
    } finally {
      setBusyId(null)
    }
  }

  async function markAllRead() {
    const unread = notifications.filter((n) => !n.isRead)
    if (unread.length === 0) return
    setBusyId('all')
    try {
      await Promise.all(unread.map((n) => notificationService.markRead(n.id)))
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not mark all as read.'))
    } finally {
      setBusyId(null)
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <PageHeader
          title="Notifications"
          description={unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}.` : 'You are all caught up.'}
        />
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            disabled={busyId === 'all'}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border-default)] text-sm font-semibold shrink-0 disabled:opacity-60"
          >
            {busyId === 'all' ? <Loader2 size={16} className="animate-spin" /> : <CheckCheck size={16} />}
            Mark all read
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-text-muted)]">
          <Bell size={28} className="mx-auto mb-2 opacity-60" />
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const style = TYPE_STYLES[n.type] || TYPE_STYLES.INFO
            const Icon = style.icon
            return (
              <div
                key={n.id}
                className={`card p-4 flex items-start gap-3 ${n.isRead ? 'opacity-70' : ''}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${style.className}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{n.title}</h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{n.message}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                {!n.isRead && (
                  <button
                    onClick={() => markRead(n.id)}
                    disabled={busyId === n.id}
                    className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] shrink-0 disabled:opacity-50"
                  >
                    {busyId === n.id ? <Loader2 size={14} className="animate-spin" /> : 'Mark read'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
