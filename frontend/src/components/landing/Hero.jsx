import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Bot, Sprout } from 'lucide-react'
import { stats } from '../../constants/content'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[var(--color-text-primary)] leading-[1.05] mb-6">
            Your Budget. Your Skills. Our Smart Logic.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl">
            Get personalized recommendations for career, travel, healthcare, agriculture, and budget planning.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[var(--color-text-primary)] font-semibold border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition"
            >
              Explore Services
            </Link>
          </div>

          <div className="flex flex-wrap gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[var(--color-primary)]">{s.value}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-white/40 rounded-[50%] blur-3xl" />
          <div className="relative space-y-4">
            <div className="card p-6 max-w-xs ml-auto">
              <Bot className="text-[var(--color-primary)] mb-3" size={28} />
              <h3 className="font-bold mb-1">AI-Powered Analysis</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Our AI analyzes your unique situation to provide personalized recommendations.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="card p-5 w-40">
                <Briefcase className="text-[var(--color-text-secondary)] mb-2" size={22} />
                <h4 className="font-semibold text-sm">Career Match</h4>
              </div>
              <div className="card p-5 w-40 mt-8">
                <Sprout className="text-[var(--color-success)] mb-2" size={22} />
                <h4 className="font-semibold text-sm">Crop Advisor</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
