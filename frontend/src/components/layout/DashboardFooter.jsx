import { Link } from 'react-router-dom'
import { EMERGENCY_CONTACTS } from '../../constants/bdData'

export default function DashboardFooter() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-card)] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Proactive Life</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Your trusted guide for navigating life in Bangladesh.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link to="/dashboard/travel" className="hover:text-[var(--color-primary)]">Travel Planner</Link></li>
            <li><Link to="/dashboard/healthcare" className="hover:text-[var(--color-primary)]">Healthcare Guide</Link></li>
            <li><Link to="/dashboard/bd-hub/government" className="hover:text-[var(--color-primary)]">Government Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link to="/dashboard/career" className="hover:text-[var(--color-primary)]">Career Advisor</Link></li>
            <li><Link to="/dashboard/agriculture" className="hover:text-[var(--color-primary)]">Agriculture Guide</Link></li>
            <li><Link to="/dashboard/bd-hub" className="hover:text-[var(--color-primary)]">Finance & Budget</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Emergency</h4>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-secondary)]">
            {EMERGENCY_CONTACTS.slice(0, 3).map((c) => (
              <li key={c.number}>
                {c.name.split('(')[0].trim()}: <span className="font-semibold text-[var(--color-text-primary)]">{c.number}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border-light)] py-5 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Proactive Life. Built for Bangladesh with care.
      </div>
    </footer>
  )
}
