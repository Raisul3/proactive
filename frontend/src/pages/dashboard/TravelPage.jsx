import { Plane, MapPin, Lightbulb } from 'lucide-react'
import AIModuleForm from '../../components/dashboard/AIModuleForm'
import BudgetOverviewCard from '../../components/dashboard/BudgetOverviewCard'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'

const fields = [
  { name: 'destination', label: 'Destination or region', type: 'text', required: true },
  { name: 'budget', label: 'Budget (৳)', type: 'number', required: true },
  { name: 'travelDates', label: 'Travel dates', type: 'text' },
  { name: 'preferences', label: 'Preferences', type: 'textarea', span: 2 },
]

const ACCENT = '#C96A3C' // sunset coral

export default function TravelPage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('travel')

  return (
    <div>
      {/* Signature hero: a boarding-pass strip on a dusk-to-sunset gradient */}
      <section
        className="relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(115deg, #163049 0%, #2E5C73 45%, #C96A3C 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-white/60 mb-3">TRAVEL PLANNER</p>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Plan your next journey across Bangladesh
            </h1>
            <p className="text-white/70 max-w-md">
              Routes, transport options, and a day-by-day itinerary — tell us where you're headed
              and what you can spend.
            </p>
          </div>

          {/* Boarding pass card */}
          <div className="bg-white/95 rounded-2xl shadow-2xl p-5 relative max-w-sm">
            <div className="flex items-center justify-between text-[#163049]">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-slate-400">FROM</p>
                <p className="text-xl font-black">DAC</p>
              </div>
              <div className="flex-1 relative mx-3 h-6 flex items-center">
                <svg viewBox="0 0 100 20" className="w-full h-5" preserveAspectRatio="none">
                  <path d="M2 15 Q50 -5 98 15" fill="none" stroke="#C96A3C" strokeWidth="1.5" strokeDasharray="3 4" />
                </svg>
                <Plane size={16} className="absolute left-1/2 -translate-x-1/2 -top-1.5 text-[#C96A3C] rotate-90" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold tracking-widest text-slate-400">TO</p>
                <p className="text-xl font-black">Anywhere</p>
              </div>
            </div>
            <div className="border-t border-dashed border-slate-300 my-4 relative">
              <span className="absolute -left-7 -top-2.5 w-5 h-5 rounded-full bg-[var(--color-bg-secondary)]" />
              <span className="absolute -right-7 -top-2.5 w-5 h-5 rounded-full bg-[var(--color-bg-secondary)]" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={13} />
              64 districts covered — routes, fares, and real transport options
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <AIModuleForm fields={fields} onSubmit={requestRecommendation} accentColor={ACCENT} />
        {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
        {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Planning your trip...</p>}

        {result?.itinerary?.map((stop, i) => {
          if (stop.type === 'budget') {
            return <BudgetOverviewCard key={i} title={stop.name} data={stop.data} accentColor={ACCENT} />
          }

          if (stop.type === 'preference') {
            return (
              <div key={i} className="flex items-start gap-2 mt-4 px-4 py-3 rounded-lg bg-[var(--color-bg-secondary)] border border-dashed border-slate-300">
                <Lightbulb size={16} className="text-[#C96A3C] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--color-text-secondary)]">{stop.notes}</p>
              </div>
            )
          }

          return (
            <div key={i} className="card p-5 mt-4 border-l-4" style={{ borderColor: ACCENT }}>
              <h3 className="font-bold">{stop.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-line">{stop.notes}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}