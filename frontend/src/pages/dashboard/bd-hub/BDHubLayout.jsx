import { Outlet } from 'react-router-dom'
import { Landmark } from 'lucide-react'
import ModuleTabNav from '../../../components/dashboard/ModuleTabNav'
import { bdHubTabs } from '../../../constants/content'

export default function BDHubLayout() {
  return (
    <div>
      {/* Signature hero: government-building columns silhouette on a deep emerald band */}
      <section
        className="relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(115deg, #0B2E22 0%, #14503A 55%, #B8862E 130%)' }}
      >
        <svg className="absolute right-0 bottom-0 w-64 h-full opacity-25" viewBox="0 0 200 160" preserveAspectRatio="xMaxYMax meet">
          <rect x="10" y="60" width="180" height="12" fill="#E8D9A8" />
          {[20, 50, 80, 110, 140, 170].map((x) => (
            <rect key={x} x={x} y="70" width="10" height="70" fill="#E8D9A8" />
          ))}
          <polygon points="10,60 100,20 190,60" fill="#E8D9A8" />
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Landmark size={20} className="text-[#E8D9A8]" />
          </div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#E8D9A8] mb-2">BANGLADESH SERVICE HUB</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 max-w-lg">
            Government, finance & emergency — all in one place
          </h1>
          <p className="text-white/70 max-w-md">
            Budget planning, official service guidance, utility help, and emergency contacts for
            everyday life in Bangladesh.
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <ModuleTabNav tabs={bdHubTabs} />
        <Outlet />
      </div>
    </div>
  )
}
