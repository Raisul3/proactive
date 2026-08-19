import { TrendingUp } from 'lucide-react'
import AIModuleForm from '../../components/dashboard/AIModuleForm'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'

const fields = [
  { name: 'education', label: 'Highest education', type: 'select', options: ['SSC', 'HSC', 'Bachelor', 'Master'], required: true },
  { name: 'skills', label: 'Key skills', type: 'text', required: true, span: 2 },
  { name: 'interests', label: 'Career interests', type: 'textarea', span: 2 },
]

const ACCENT = '#B8862E' // ambition gold

export default function CareerPage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('career')

  return (
    <div>
      {/* Signature hero: an upward step-trajectory on a confident slate gradient */}
      <section
        className="relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(115deg, #1C2333 0%, #2B3550 60%, #3A4566 100%)' }}
      >
        <svg className="absolute right-0 bottom-0 w-1/2 h-full opacity-40" viewBox="0 0 300 200" preserveAspectRatio="xMaxYMax meet">
          <path d="M20 180 H80 V140 H140 V100 H200 V60 H260 V20" fill="none" stroke="#D9A84E" strokeWidth="3" />
          <circle cx="260" cy="20" r="7" fill="#D9A84E" />
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D9A84E] mb-2">CAREER</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 max-w-lg">
            Match your skills to the right next step
          </h1>
          <p className="text-white/70 max-w-md">
            Share your education, skills, and interests — get roles worth pursuing.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium">
            <TrendingUp size={14} className="text-[#D9A84E]" />
            AI-matched roles, updated as you grow
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <AIModuleForm fields={fields} onSubmit={requestRecommendation} accentColor={ACCENT} />
        {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
        {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Analyzing your profile...</p>}
        {result?.recommendations?.map((job) => (
          <div key={job.title} className="card p-5 mt-4 border-l-4" style={{ borderColor: ACCENT }}>
            <h3 className="font-bold">{job.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
