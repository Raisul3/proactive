import { Star } from 'lucide-react'
import { testimonials } from '../../constants/content'

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)]">What our users say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="card p-6">
            <div className="flex gap-1 mb-3 text-[var(--color-accent)]">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-center">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
