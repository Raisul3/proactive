import { useState } from 'react'
import { Plane, MapPin, Lightbulb, Sparkles } from 'lucide-react'
import BudgetOverviewCard from '../../components/dashboard/BudgetOverviewCard'
import AttractionsCard from '../../components/dashboard/AttractionsCard'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'

const DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 'Brahmanbaria',
  'Chandpur', 'Chapainawabganj', 'Chattogram', 'Chuadanga', "Cox's Bazar", 'Cumilla',
  'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
  'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokathi', 'Jhenaidah', 'Joypurhat',
  'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur',
  'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar',
  'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
  'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
  'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur',
  'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
  'Tangail', 'Thakurgaon',
]

const ACCENT = '#C96A3C' // sunset coral

const inputClass =
  'w-full box-border px-4 py-3 rounded-2xl border border-[#E3D3B8] bg-white text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-[#C96A3C]'
const labelClass = 'block text-sm font-semibold mb-2'

export default function TravelPage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('travel')

  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    origin: 'Dhaka',
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    preferences: '',
  })

  const update = (key, value) =>
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      // departure change hole return date er age hole reset
      if (key === 'startDate' && next.endDate && value > next.endDate) next.endDate = ''
      return next
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    const travelDates = form.startDate
      ? form.endDate
        ? `${form.startDate} to ${form.endDate}`
        : form.startDate
      : ''

    requestRecommendation({
      origin: form.origin,
      destination: form.destination,
      budget: form.budget,
      startDate: form.startDate,
      endDate: form.endDate,
      travelDates, // ager field name, backend e jate kaj kore
      preferences: form.preferences,
    })
  }

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
            <div className="flex items-center justify-between text-[#163049] gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-widest text-slate-400">FROM</p>
                <p className="text-xl font-black truncate">{form.origin || 'Dhaka'}</p>
              </div>
              <div className="flex-1 relative mx-3 h-6 flex items-center shrink-0 min-w-[60px]">
                <svg viewBox="0 0 100 20" className="w-full h-5" preserveAspectRatio="none">
                  <path d="M2 15 Q50 -5 98 15" fill="none" stroke="#C96A3C" strokeWidth="1.5" strokeDasharray="3 4" />
                </svg>
                <Plane size={16} className="absolute left-1/2 -translate-x-1/2 -top-1.5 text-[#C96A3C] rotate-90" />
              </div>
              <div className="text-right min-w-0">
                <p className="text-[10px] font-bold tracking-widest text-slate-400">TO</p>
                <p className="text-xl font-black truncate">{form.destination || 'Anywhere'}</p>
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
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="origin" className={labelClass}>From</label>
              <input
                id="origin"
                list="district-list"
                className={inputClass}
                value={form.origin}
                onChange={(e) => update('origin', e.target.value)}
                placeholder="Where are you leaving from?"
                required
              />
            </div>

            <div>
              <label htmlFor="destination" className={labelClass}>Destination or region</label>
              <input
                id="destination"
                list="district-list"
                className={inputClass}
                value={form.destination}
                onChange={(e) => update('destination', e.target.value)}
                placeholder="Where are you heading?"
                required
              />
            </div>

            <div>
              <label htmlFor="startDate" className={labelClass}>Departure date</label>
              <input
                id="startDate"
                type="date"
                className={inputClass}
                min={today}
                value={form.startDate}
                onChange={(e) => update('startDate', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="endDate" className={labelClass}>Return date</label>
              <input
                id="endDate"
                type="date"
                className={inputClass}
                min={form.startDate || today}
                value={form.endDate}
                onChange={(e) => update('endDate', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="budget" className={labelClass}>Budget (৳)</label>
              <input
                id="budget"
                type="number"
                min="0"
                className={inputClass}
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                placeholder="e.g. 15000"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="preferences" className={labelClass}>Preferences</label>
              <textarea
                id="preferences"
                rows={4}
                className={inputClass}
                value={form.preferences}
                onChange={(e) => update('preferences', e.target.value)}
                placeholder="Bus/train/air, hotel type, food, activities..."
              />
            </div>
          </div>

          <datalist id="district-list">
            {DISTRICTS.map((d) => <option key={d} value={d} />)}
          </datalist>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: ACCENT }}
          >
            <Sparkles size={18} />
            {isLoading ? 'Planning...' : 'Get AI Recommendations'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
        {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Planning your trip...</p>}

        {result?.itinerary?.map((stop, i) => {
          if (stop.type === 'budget') {
            return <BudgetOverviewCard key={i} title={stop.name} data={stop.data} accentColor={ACCENT} />
          }

          if (stop.type === 'attractions') {
            return <AttractionsCard key={i} title={stop.name} data={stop.data} accentColor={ACCENT} />
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