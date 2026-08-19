export default function OverviewCard({ label, value, icon: Icon, accent = 'primary' }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl bg-[var(--color-${accent}-100,var(--color-primary-100))] text-[var(--color-${accent})] flex items-center justify-center`}>
        {Icon && <Icon size={20} />}
      </div>
      <div>
        <div className="text-xl font-bold text-[var(--color-text-primary)]">{value}</div>
        <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
      </div>
    </div>
  )
}
