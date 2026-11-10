import { useState } from 'react'
import { MapPin, Sprout, Layers } from 'lucide-react'
import api from '../../services/api' // path ta tomar api.js onujayi thik koro

const ACCENT = '#5B7B3F'
const SOILS = ['Clay', 'Loamy', 'Sandy', 'Silty']
const SEASONS = ['Rabi', 'Kharif-1', 'Kharif-2']
const selectCls = 'w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm'

function Dots({ rating }) {
  return (
    <span className="flex gap-0.5 shrink-0 mt-1" title={`Suitability ${rating}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i <= rating ? ACCENT : '#D9D4C3' }}
        />
      ))}
    </span>
  )
}

function CropRow({ c }) {
  const meta = [
    c.category,
    c.seasons?.join(', '),
    c.waterNeed && `${c.waterNeed} water`,
    c.durationDays && `${c.durationDays} days`,
    c.yieldPerAcre && `${c.yieldPerAcre.min}-${c.yieldPerAcre.max} t/acre`,
  ].filter(Boolean)

  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-black/5 last:border-0">
      <div className="min-w-0">
        <p className="font-semibold">
          {c.name} {c.nameBn && <span className="text-xs font-normal opacity-60">{c.nameBn}</span>}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">{meta.join(' · ')}</p>
        {c.estimatedTotalTon && (
          <p className="text-xs mt-0.5" style={{ color: ACCENT }}>
            Estimated for your land: {c.estimatedTotalTon.min}-{c.estimatedTotalTon.max} tons
          </p>
        )}
        {c.bestSoil && <p className="text-xs text-[var(--color-text-muted)]">Best soil here: {c.bestSoil}</p>}
        {c.seasonMatch === false && (
          <p className="text-xs text-[var(--color-text-muted)]">Not in the selected season</p>
        )}
      </div>
      <Dots rating={c.rating} />
    </div>
  )
}

function Section({ icon: Icon, title, sub, children }) {
  return (
    <div className="card p-5 mt-4 border-l-4" style={{ borderColor: ACCENT }}>
      <h3 className="font-bold flex items-center gap-2">
        <Icon size={18} style={{ color: ACCENT }} /> {title}
      </h3>
      {sub && <p className="text-xs text-[var(--color-text-muted)] mb-2">{sub}</p>}
      {children}
    </div>
  )
}

// Crop advice form submit er por dekhano hoy
export function KnowledgeResults({ kb }) {
  if (!kb) return null
  const { districtCrops, soilCrops, cropDistricts } = kb

  return (
    <div>
      {districtCrops && (
        <Section
          icon={MapPin}
          title={`${districtCrops.district} district: crops that suit it`}
          sub={`${districtCrops.division} division · Soil: ${districtCrops.soils.join(', ')}`}
        >
          {districtCrops.crops.map((c) => <CropRow key={c.name} c={c} />)}
        </Section>
      )}

      {soilCrops && (
        <Section
          icon={Layers}
          title={`Best crops for ${soilCrops.soil} soil`}
          sub={soilCrops.season ? `Season: ${soilCrops.season}` : undefined}
        >
          {soilCrops.crops.length === 0 && <p className="text-sm">No match found for this season.</p>}
          {soilCrops.crops.map((c) => <CropRow key={c.name} c={c} />)}
        </Section>
      )}

      {cropDistricts?.length > 0 && (
        <Section icon={Sprout} title="Where these crops grow best (districts)">
          {cropDistricts.map((cd) => (
            <div key={cd.crop} className="py-2.5 border-b border-black/5 last:border-0">
              <p className="font-semibold mb-1.5">{cd.crop}</p>
              <div className="flex flex-wrap gap-1.5">
                {cd.districts.map((d) => (
                  <span
                    key={d.name}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: `${ACCENT}1A`, color: '#3E5A27' }}
                    title={`Soil: ${d.soils.join(', ')}`}
                  >
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Section>
      )}

      <p className="text-xs text-[var(--color-text-muted)] mt-3">
        Ratings are general agronomic guidance. Local conditions can differ, so check with your Upazila Agriculture Office.
      </p>
    </div>
  )
}

// Standalone: district select kore dekho kon fosol bhalo
export function DistrictExplorer({ districts }) {
  const [district, setDistrict] = useState('')
  const [season, setSeason] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (d, s) => {
    if (!d) {
      setData(null)
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await api.get(`/agriculture/districts/${encodeURIComponent(d)}/crops`, {
        params: s ? { season: s } : {},
      })
      setData(res.data)
    } catch (e) {
      setError(e.response?.data?.message || 'Could not load district data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-5 mt-8">
      <h2 className="font-bold text-lg flex items-center gap-2">
        <MapPin size={20} style={{ color: ACCENT }} /> Explore by district
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">Which crops are best suited for cultivation in each district of Bangladesh?</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <select
          className={selectCls}
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value)
            load(e.target.value, season)
          }}
        >
          <option value="">Select district...</option>
          {districts.map((d) => (
            <option key={d.name} value={d.name}>{d.name}</option>
          ))}
        </select>
        <select
          className={selectCls}
          value={season}
          onChange={(e) => {
            setSeason(e.target.value)
            load(district, e.target.value)
          }}
        >
          <option value="">All seasons</option>
          {SEASONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {loading && <p className="text-sm mt-3">Loading...</p>}
      {error && <p className="text-sm mt-3 text-[var(--color-error)]">{error}</p>}
      {data && !loading && (
        <div className="mt-3">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">
            {data.division} division · Soil: {data.soils.join(', ')}
          </p>
          {data.crops.map((c) => <CropRow key={c.name} c={c} />)}
        </div>
      )}
    </div>
  )
}

// Standalone: soil wise fosol guide
export function SoilGuide() {
  const [soil, setSoil] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async (s) => {
    setSoil(s)
    setLoading(true)
    try {
      const res = await api.get(`/agriculture/soils/${encodeURIComponent(s)}/crops`)
      setData(res.data)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-5 mt-6">
      <h2 className="font-bold text-lg flex items-center gap-2">
        <Layers size={20} style={{ color: ACCENT }} /> Soil guide
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-3">Which crops are most suitable for different soil types?</p>
      <div className="flex flex-wrap gap-2">
        {SOILS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => load(s)}
            className="px-4 py-1.5 rounded-full text-sm border"
            style={
              soil === s
                ? { background: ACCENT, color: '#fff', borderColor: ACCENT }
                : { borderColor: '#0000001A' }
            }
          >
            {s}
          </button>
        ))}
      </div>
      {loading && <p className="text-sm mt-3">Loading...</p>}
      {data && !loading && <div className="mt-3">{data.crops.map((c) => <CropRow key={c.name} c={c} />)}</div>}
    </div>
  )
}