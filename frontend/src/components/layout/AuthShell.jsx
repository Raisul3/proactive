import { Bot, Plane, Stethoscope, Wheat } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Bot, text: 'An AI agent that routes you to the right tool' },
  { icon: Plane, text: 'Plan trips and find transport across Bangladesh' },
  { icon: Stethoscope, text: 'Symptom guidance and nearby hospitals' },
  { icon: Wheat, text: 'Crop advice suited to your land and season' },
]

export default function AuthShell({ children }) {
  return (
    <div className="min-h-[calc(100vh-1px)] grid lg:grid-cols-2">
      {/* Brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2E22 0%, #14503A 55%, #1F6F4F 100%)' }}
      >
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-white/5" />

        <div className="relative flex items-center gap-2.5 font-bold text-white">
          <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">PL</span>
          Proactive Life
        </div>

        <div className="relative">
          <h1 className="text-4xl font-black text-white leading-tight mb-3">
            Your Life Guide for Bangladesh
          </h1>
          <p className="text-white/70 max-w-sm mb-10">
            From finding the right hospital to planning your journey — everything you need, in
            one place.
          </p>
          <div className="space-y-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.text} className="flex items-center gap-3 text-white/85 text-sm">
                <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <h.icon size={16} />
                </span>
                {h.text}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/40">© {new Date().getFullYear()} Proactive Life</p>
      </div>

      {/* Form area */}
      <div className="flex items-center justify-center px-6 py-16 bg-[var(--color-bg-main)]">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
