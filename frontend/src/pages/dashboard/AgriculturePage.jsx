import { useEffect, useMemo, useState } from 'react'
import { Wheat, Sun } from 'lucide-react'
import AIModuleForm from '../../components/dashboard/AIModuleForm'
import { KnowledgeResults, DistrictExplorer, SoilGuide } from '../../components/agriculture/AgriKnowledge'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'
import api from '../../services/api' // path thik koro

const baseFields = [
  { name: 'soilType', label: 'Soil type', type: 'select', options: ['Clay', 'Loamy', 'Sandy', 'Silty'], required: true },
  { name: 'landSize', label: 'Land size (acres)', type: 'number', required: true },
  { name: 'season', label: 'Season', type: 'select', options: ['Rabi', 'Kharif-1', 'Kharif-2'], required: true },
]

const ACCENT = '#5B7B3F' // field green

export default function AgriculturePage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('agriculture')
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    api
      .get('/agriculture/districts')
      .then(({ data }) => setDistricts(data.districts || []))
      .catch(() => {})
  }, [])

  const fields = useMemo(
    () => [
      ...baseFields,
      {
        name: 'district',
        label: 'District (optional)',
        type: 'select',
        options: districts.map((d) => d.name),
        required: false,
      },
    ],
    [districts]
  )

  return (
    <div>
      <section
        className="relative overflow-hidden mb-8"
        style={{ background: 'linear-gradient(180deg, #F2E7C4 0%, #E4D49B 45%, #7A8F4A 100%)' }}
      >
        <Sun size={64} className="absolute right-10 top-8 text-[#E0A030]/70" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-6 md:pt-16">
          <p className="text-xs font-bold tracking-[0.2em] text-[#4A5D2E] mb-2">AGRICULTURE</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#31401D] leading-tight mb-3 max-w-lg">
            Grow with confidence, season after season
          </h1>
          <p className="text-[#4A5D2E]/80 max-w-md">
            Tell us your soil, land size, season and district — get crop picks suited to your field.
          </p>
        </div>
        <div className="relative flex justify-center gap-3 pb-3 flex-wrap px-4">
          {Array.from({ length: 14 }).map((_, i) => (
            <Wheat key={i} size={20} className="text-[#5B4A1F]/70" />
          ))}
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <AIModuleForm
          fields={fields}
          onSubmit={requestRecommendation}
          submitLabel="Get Crop Advice"
          accentColor={ACCENT}
        />
        {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
        {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Analyzing your land...</p>}
        {result?.aiError && (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            AI suggestions are unavailable right now. Showing results from our crop database.
          </p>
        )}

        {result?.crops?.map((crop) => (
          <div key={crop.name} className="card p-5 mt-4 border-l-4" style={{ borderColor: ACCENT }}>
            <h3 className="font-bold">{crop.name}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Estimated yield: {crop.estimatedYield}</p>
            {crop.reason && <p className="text-sm mt-1">{crop.reason}</p>}
            {crop.buyers?.length > 0 && (
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Buyers: {crop.buyers.join(', ')}</p>
            )}
          </div>
        ))}

        <KnowledgeResults kb={result?.knowledgeBase} />

        <DistrictExplorer districts={districts} />
        <SoilGuide />
      </div>
    </div>
  )
}