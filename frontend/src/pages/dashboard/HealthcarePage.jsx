import { Stethoscope, Plus, AlertCircle } from 'lucide-react'
import AIModuleForm from '../../components/dashboard/AIModuleForm'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'

const fields = [
  { name: 'symptoms', label: 'Symptoms', type: 'textarea', required: true, span: 2 },
  { name: 'district', label: 'District', type: 'text', required: true },
]

const ACCENT = '#1D8A7A' // clinical teal

export default function HealthcarePage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('healthcare')

  return (
    <div>
      {/* Signature hero: a vital-sign pulse line across a calm clinical teal band */}
      <section className="relative overflow-hidden mb-8 bg-[#0F4A44]">
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100 H260 L285 60 L305 150 L325 20 L345 100 H800"
            fill="none"
            stroke="#5FE0C8"
            strokeWidth="2.5"
          />
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <Stethoscope size={20} className="text-[#5FE0C8]" />
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#C94A4A] flex items-center justify-center">
              <Plus size={16} className="text-white" />
            </span>
          </div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#5FE0C8] mb-2">HEALTHCARE</p>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 max-w-lg">
            Tell us how you feel — we'll guide you to care
          </h1>
          <p className="text-white/70 max-w-md">
            Describe your symptoms and district to get specialist guidance and nearby hospitals.
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-10">
        <AIModuleForm
          fields={fields}
          onSubmit={requestRecommendation}
          submitLabel="Get Guidance"
          accentColor={ACCENT}
        />
        
        {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
        {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Reviewing your symptoms...</p>}
        
        {/* Hospitals / AI Result Section */}
        {result?.aiAnalysis?.hospitals?.map((h, idx) => (
          <div key={idx} className="card p-5 mt-4 border-l-4" style={{ borderColor: ACCENT }}>
            <h3 className="font-bold">{h.name}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{h.address}</p>
          </div>
        ))}

        {/* Medicines Data Section with Dosages */}
        {result?.medicines?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: ACCENT }}>Suggested Medicines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.medicines.map((med, idx) => (
                <div key={idx} className="card p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-gray-800">
                    {med.name} <span className="text-sm font-normal text-gray-500">({med.strength})</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-2"><strong>Indication:</strong> {med.indication}</p>
                  
                  {/* Dosage Section */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm border border-gray-100">
                    <p className="text-gray-700"><strong>Standard Dose:</strong> {med.standardDosage || 'N/A'}</p>
                    {med.mildDosage && <p className="text-gray-600 mt-1"><strong>Mild:</strong> {med.mildDosage}</p>}
                    {med.severeDosage && <p className="text-[#C94A4A] mt-1"><strong>Severe:</strong> {med.severeDosage}</p>}
                  </div>

                  <p className="text-xs text-gray-400 mt-3">{med.company}</p>
                </div>
              ))}
            </div>

            {/* Medical Disclaimer Note */}
            <div className="mt-8 p-4 bg-[#F9FAFB] border-l-4 border-[#C94A4A] rounded-r-lg flex items-start gap-3">
              <AlertCircle className="text-[#C94A4A] shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Medical Disclaimer</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  These suggestions are provided for temporary relief and general guidance only. For an accurate diagnosis and proper treatment, please consult a certified healthcare professional or visit a nearby hospital.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}