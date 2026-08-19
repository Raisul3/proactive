import { Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import ModuleTabNav from '../../../components/dashboard/ModuleTabNav'
import { assistantTabs } from '../../../constants/content'

export default function AssistantLayout() {
  return (
    <div>
      {/* Signature hero: a glowing neural/chat constellation on a violet-to-indigo band */}
      <section
        className="relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(115deg, #241338 0%, #3B2166 55%, #5B3AA6 100%)' }}
      >
        <svg className="absolute right-4 top-0 w-72 h-full opacity-40" viewBox="0 0 260 160">
          <g stroke="#C9A8FF" strokeWidth="1">
            <line x1="30" y1="40" x2="100" y2="20" />
            <line x1="100" y1="20" x2="170" y2="55" />
            <line x1="100" y1="20" x2="90" y2="100" />
            <line x1="170" y1="55" x2="220" y2="30" />
            <line x1="170" y1="55" x2="150" y2="120" />
            <line x1="90" y1="100" x2="150" y2="120" />
          </g>
          <g fill="#E4D3FF">
            <circle cx="30" cy="40" r="4" />
            <circle cx="100" cy="20" r="5" />
            <circle cx="170" cy="55" r="5" />
            <circle cx="220" cy="30" r="4" />
            <circle cx="90" cy="100" r="4" />
            <circle cx="150" cy="120" r="5" />
          </g>
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Sparkles size={20} className="text-[#E4D3FF]" />
          </div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#E4D3FF] mb-2">AI ASSISTANT</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 max-w-lg">
            Meet Aida, your personal AI agent
          </h1>
          <p className="text-white/70 max-w-md">
            Chat, plan your success roadmap, sharpen your resume, and get routed to the right
            module automatically.
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <ModuleTabNav tabs={assistantTabs} />
        <Outlet />
      </div>
    </div>
  )
}
