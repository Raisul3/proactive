import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Loader2, Briefcase, Plane, Stethoscope, Wheat, Target, Wallet, Bot, Landmark,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { dashboardService } from '../../services/dashboardService'
import { getErrorMessage } from '../../utils/errors'
import { moduleTiles } from '../../constants/content'

const MODULE_ICONS = { Bot, Briefcase, Plane, Stethoscope, Wheat, Landmark }

export default function DashboardHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [overview, setOverview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    dashboardService
      .overview()
      .then(setOverview)
      .catch((err) => setError(getErrorMessage(err, 'Could not load your dashboard overview.')))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate('/dashboard/assistant', { state: { initialMessage: query } })
  }

  const stats = overview && [
    { label: 'Active Goals', value: overview.activeGoals, icon: Target },
    { label: 'Career Matches', value: overview.careerMatches, icon: Briefcase },
    { label: 'Saved Trips', value: overview.savedTrips, icon: Plane },
    { label: 'Health Check-ins', value: overview.healthCheckIns, icon: Stethoscope },
    { label: 'Crop Plans', value: overview.cropPlans, icon: Wheat },
    {
      label: 'Monthly Budget',
      value: overview.monthlyBudget != null ? `৳${overview.monthlyBudget.toLocaleString()}` : '—',
      icon: Wallet,
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="px-4 sm:px-6 py-16 md:py-20 text-center bg-[var(--color-bg-secondary)]/50 border-b border-[var(--color-border-light)]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-primary)] leading-tight mb-3">
            Your Life Guide for Bangladesh
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-1">
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Welcome back.'}
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            From finding the right hospital to planning your journey, we help you navigate every
            aspect of life in Bangladesh.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-full shadow-sm p-1.5">
              <Search size={18} className="ml-3 text-[var(--color-text-muted)] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you need? (e.g. blood, doctor, crop advice)"
                className="flex-1 bg-transparent border-0 outline-none px-1 py-2 text-sm md:text-base"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold shrink-0"
              >
                Ask Aida
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="px-4 sm:px-6 py-10 max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
            {error}
          </div>
        )}

        {/* Overview stats */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Your Overview</h2>
        {isLoading ? (
          <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)] mb-12">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading overview...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {stats?.map((s) => (
              <div key={s.label} className="card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-xl font-bold text-[var(--color-text-primary)]">{s.value ?? 0}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Module grid */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Everything You Need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moduleTiles.map((m) => {
            const Icon = MODULE_ICONS[m.icon] || Bot
            return (
              <button
                key={m.id}
                onClick={() => navigate(m.path)}
                className="card p-6 text-left hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1.5">{m.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{m.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
