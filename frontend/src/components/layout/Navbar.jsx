import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Menu, X, LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { navbarPrimaryItems, navbarMenuItems } from '../../constants/content'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--color-border-light)] bg-[var(--color-bg-card)]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 font-bold shrink-0">
            <span className="w-9 h-9 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-sm">
              PL
            </span>
            <span className="hidden sm:inline text-[var(--color-text-primary)]">Proactive Life</span>
          </Link>

          {/* Primary module links */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {navbarPrimaryItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User menu */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 pl-2 pr-3 h-10 rounded-full bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border-light)] transition border border-[var(--color-border-light)]"
            >
              <span className="w-7 h-7 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center text-sm font-bold">
                {(user?.name || 'U').slice(0, 1).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {user?.name?.split(' ')[0] || 'Account'}
              </span>
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-card)] shadow-xl z-50 py-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--color-border-light)]">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{user?.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    {navbarMenuItems.map((item) => {
                      const Icon = Icons[item.icon] || Icons.Circle
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition"
                        >
                          <Icon size={16} />
                          {item.label}
                        </Link>
                      )
                    })}
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition"
                      >
                        <ShieldCheck size={16} />
                        Admin Panel
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-[var(--color-border-light)] pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error-50)] transition"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--color-bg-secondary)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-[var(--color-border-light)] pt-3">
            {navbarPrimaryItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2 mt-2 border-t border-[var(--color-border-light)]">
              {navbarMenuItems.map((item) => {
                const Icon = Icons[item.icon] || Icons.Circle
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                >
                  <ShieldCheck size={16} />
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-sm text-[var(--color-error)] hover:bg-[var(--color-error-50)]"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
