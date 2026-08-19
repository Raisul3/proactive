import { Bot, Plane, Stethoscope, Wheat } from 'lucide-react'

const POINTS = [
  { icon: Bot, text: 'One AI agent that routes you to the right tool' },
  { icon: Plane, text: 'Travel routes and transport across 64 districts' },
  { icon: Stethoscope, text: 'Health guidance and nearby hospitals' },
  { icon: Wheat, text: 'Crop advice suited to your land and season' },
]

export default function AuthShowcasePanel() {
  return (
    <div
      className="hidden md:flex flex-col justify-between p-10 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #14503A 0%, #1F6F4F 55%, #2F8F68 100%)' }}
    >
      <div>
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center font-bold">PL</span>
          <span className="font-bold">Proactive Life</span>
        </div>
        <h2 className="text-2xl font-black leading-snug mb-3">Your life guide for Bangladesh</h2>
        <p className="text-white/70 text-sm max-w-xs">
          Career, travel, health, farming, and government services — planned with AI, built for
          everyday life here.
        </p>
      </div>

      <ul className="space-y-4">
        {POINTS.map((p) => (
          <li key={p.text} className="flex items-center gap-3 text-sm text-white/85">
            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <p.icon size={15} />
            </span>
            {p.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
