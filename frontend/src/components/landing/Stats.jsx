import { stats } from '../../constants/content'

export default function Stats() {
  return (
    <section className="bg-[var(--color-primary)] py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold text-white">{s.value}</div>
            <div className="text-sm text-white/80">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
