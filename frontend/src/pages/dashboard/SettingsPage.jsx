import { useEffect, useState } from 'react'
import { Loader2, Save, CheckCircle2, Sun, Moon } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import { settingsService } from '../../services/settingsService'
import { useTheme } from '../../contexts/ThemeContext'
import { getErrorMessage } from '../../utils/errors'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'bn', label: 'বাংলা' },
]

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    settingsService
      .get()
      .then(setSettings)
      .catch((err) => setError(getErrorMessage(err, 'Could not load your settings.')))
      .finally(() => setIsLoading(false))
  }, [])

  function updateLocal(patch) {
    setSettings((prev) => ({ ...prev, ...patch }))
    setSuccess(false)
  }

  async function save() {
    setIsSaving(true)
    setError('')
    setSuccess(false)
    try {
      const updated = await settingsService.update({
        language: settings.language,
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
      })
      setSettings(updated)
      setSuccess(true)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not save your settings.'))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading settings...
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Settings" description="Control your preferences and notifications." />

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-success-50)] text-[var(--color-success-dark)] text-sm flex items-center gap-2">
          <CheckCircle2 size={16} /> Settings saved.
        </div>
      )}

      <div className="card p-6 max-w-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">Theme</p>
            <p className="text-sm text-[var(--color-text-muted)]">Switch between light and dark mode.</p>
          </div>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border-default)] text-sm font-semibold"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>

        <div>
          <p className="font-medium text-[var(--color-text-primary)] mb-2">Language</p>
          <select
            value={settings.language}
            onChange={(e) => updateLocal({ language: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">Email notifications</p>
            <p className="text-sm text-[var(--color-text-muted)]">Get updates and reminders by email.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => updateLocal({ emailNotifications: e.target.checked })}
            className="w-5 h-5 accent-[var(--color-primary)]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">Push notifications</p>
            <p className="text-sm text-[var(--color-text-muted)]">Get alerts inside the app.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => updateLocal({ pushNotifications: e.target.checked })}
            className="w-5 h-5 accent-[var(--color-primary)]"
          />
        </div>

        <button
          onClick={save}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Settings
        </button>
      </div>
    </div>
  )
}
