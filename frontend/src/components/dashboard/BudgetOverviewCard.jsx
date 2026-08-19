// frontend/src/components/dashboard/BudgetOverviewCard.jsx
import { CheckCircle2, AlertTriangle } from 'lucide-react'

const fmt = (n) => Number(n).toLocaleString('en-BD')

function OptionRow({ label, price, suffix, withinBudget }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 text-sm">
      <span className="flex items-center gap-2 capitalize text-[var(--color-text-secondary)]">
        {withinBudget ? (
          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
        ) : (
          <AlertTriangle size={15} className="text-amber-600 shrink-0" />
        )}
        {label}
      </span>
      <span className={`font-semibold ${withinBudget ? 'text-emerald-700' : 'text-amber-700'}`}>
        ৳{fmt(price)}{suffix ? <span className="font-normal text-[var(--color-text-muted)]">{suffix}</span> : null}
      </span>
    </div>
  )
}

export default function BudgetOverviewCard({ title, data, accentColor }) {
  const { userBudget, baseCost, nights, pickReason, recommended, transportOptions, hotelOptions } = data

  return (
    <div className="card p-5 mt-4 border-l-4" style={{ borderColor: accentColor }}>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-xs text-[var(--color-text-muted)] mb-4">
        Your target budget: <span className="font-semibold">৳{fmt(userBudget)}</span>
      </p>

      {/* Recommended pick */}
      <div
        className={`rounded-lg border px-4 py-3 mb-4 ${
          recommended.fitsBudget ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div className="flex items-center gap-2 text-sm font-semibold mb-1">
          {recommended.fitsBudget ? (
            <CheckCircle2 size={16} className="text-emerald-600" />
          ) : (
            <AlertTriangle size={16} className="text-amber-600" />
          )}
          <span className="capitalize">{recommended.transportLabel} + {recommended.hotelLabel} hotel</span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mb-1">
          {pickReason} — ৳{fmt(recommended.total)} total
          <span className="text-[var(--color-text-muted)]">
            {' '}(food/guide ৳{fmt(baseCost)} + transport + {nights} night hotel)
          </span>
        </p>
        <p className={`text-xs font-semibold ${recommended.fitsBudget ? 'text-emerald-700' : 'text-amber-700'}`}>
          {recommended.fitsBudget
            ? `Fits your budget, with ৳${fmt(recommended.diff)} to spare.`
            : `Over your budget by ৳${fmt(recommended.diff)}.`}
        </p>
      </div>

      {/* Itemized options */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-[var(--color-text-muted)] uppercase mb-1 px-3">
            Transport (round trip)
          </p>
          <div className="rounded-lg border border-[var(--color-border,#e5e7eb)] divide-y divide-[var(--color-border,#e5e7eb)]">
            {transportOptions.map((t) => (
              <OptionRow key={t.mode} label={t.label} price={t.price} withinBudget={t.withinBudget} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-wide text-[var(--color-text-muted)] uppercase mb-1 px-3">
            Hotel (per night)
          </p>
          <div className="rounded-lg border border-[var(--color-border,#e5e7eb)] divide-y divide-[var(--color-border,#e5e7eb)]">
            {hotelOptions.map((h) => (
              <OptionRow key={h.tier} label={h.label} price={h.pricePerNight} suffix="/night" withinBudget={h.withinBudget} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
