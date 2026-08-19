import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[var(--color-border-light)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white font-bold flex items-center justify-center">
            S
          </span>
          <span className="text-xl font-bold text-[var(--color-text-primary)]">Proactive Life</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 bg-[var(--color-bg-secondary)] rounded-full p-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--color-primary-100)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="text-sm font-medium text-[var(--color-text-secondary)]">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-[var(--color-text-secondary)]">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
