import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, Save, CheckCircle2, UserCircle } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { profileService } from '../../services/profileService'
import { useAuth } from '../../contexts/AuthContext'
import { getErrorMessage } from '../../utils/errors'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      avatarUrl: user?.avatarUrl || '',
    },
  })

  async function onSubmit(values) {
    setError('')
    setSuccess(false)
    try {
      const updated = await profileService.update({
        name: values.name,
        avatarUrl: values.avatarUrl || undefined,
      })
      setUser(updated)
      setSuccess(true)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update your profile.'))
    }
  }

  return (
    <div>
      <PageHeader title="Profile" description="Manage your personal information." />

      <div className="card p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-6">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border border-[var(--color-border-default)]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center">
              <UserCircle size={32} />
            </div>
          )}
          <div>
            <p className="font-semibold text-[var(--color-text-primary)]">{user?.name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{user?.email}</p>
            {!user?.isEmailVerified && (
              <p className="text-xs text-[var(--color-error)] mt-0.5">Email not verified</p>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-success-50)] text-[var(--color-success-dark)] text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Profile updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Full name</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Avatar URL</label>
            <input
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
              {...register('avatarUrl')}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
