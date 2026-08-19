import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'

/**
 * Horizontal pill tab-bar used to sub-navigate within a module hub (e.g. the
 * AI Assistant or Bangladesh Service Hub), each tab rendering its own nested
 * route via <Outlet/> in the parent layout. Kept generic so every future
 * multi-feature module reuses the same component instead of a bespoke tab bar.
 */
export default function ModuleTabNav({ tabs }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6 border-b border-[var(--color-border-light)]">
      {tabs.map((tab) => {
        const Icon = Icons[tab.icon] || Icons.Circle
        return (
          <NavLink
            key={tab.id}
            to={tab.path}
            end={tab.end ?? true}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition border-b-2 ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`
            }
          >
            <Icon size={16} />
            {tab.label}
          </NavLink>
        )
      })}
    </div>
  )
}
