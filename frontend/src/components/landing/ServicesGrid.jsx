import { Link } from 'react-router-dom'
import { services } from '../../constants/content'

export default function ServicesGrid() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">Everything you need, in one place</h2>
        <p className="text-[var(--color-text-secondary)]">AI-powered guidance across the areas that matter most.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Link
            key={s.id}
            to={`/services#${s.id}`}
            className="card p-6 hover:-translate-y-1 hover:shadow-lg transition"
          >
            <span className="text-3xl">{s.icon}</span>
            <h3 className="font-bold text-lg mt-4 mb-2 text-[var(--color-text-primary)]">{s.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{s.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
