import { prisma } from '../config/prisma.js' // <-- agricultureRepository.js er moto kore thik koro

const round = (n) => Math.round(n * 100) / 100
const ci = (value) => ({ equals: value, mode: 'insensitive' })

const cropInclude = {
  seasons: { include: { season: true } },
  cultivation: true,
}

function shapeCrop(crop, rating, landSize, extra = {}) {
  const c = crop.cultivation
  const yMin = c?.yieldMin ?? null
  const yMax = c?.yieldMax ?? null
  const land = Number(landSize)
  const hasLand = Number.isFinite(land) && land > 0
  return {
    name: crop.nameEn,
    nameBn: crop.nameBn,
    category: crop.category,
    seasons: crop.seasons.map((s) => s.season.name),
    rating,
    yieldPerAcre: yMin != null && yMax != null ? { min: yMin, max: yMax } : null,
    durationDays: c?.durationDays ?? null,
    waterNeed: c?.waterNeed ?? null,
    seedRateKgPerAcre: c?.seedRateKgPerAcre ?? null,
    estimatedTotalTon:
      hasLand && yMin != null && yMax != null
        ? { min: round(yMin * land), max: round(yMax * land) }
        : null,
    ...extra,
  }
}

const inSeason = (crop, season) =>
  !season || crop.seasons.some((s) => s.season.name.toLowerCase() === String(season).toLowerCase())

export async function listDistricts() {
  const rows = await prisma.district.findMany({
    orderBy: [{ division: 'asc' }, { nameEn: 'asc' }],
    include: { soils: { include: { soil: true } } },
  })
  return rows.map((d) => ({
    name: d.nameEn,
    division: d.division,
    soils: d.soils.map((s) => s.soil.name),
  }))
}

// Kon soil e kon fosol bhalo
export async function getSoilCrops({ soil, season, landSize, limit = 10 }) {
  const soilRow = await prisma.soil.findFirst({ where: { name: ci(soil) } })
  if (!soilRow) return null

  const rows = await prisma.cropSoil.findMany({
    where: { soilId: soilRow.id },
    include: { crop: { include: cropInclude } },
  })

  const crops = rows
    .filter((r) => inSeason(r.crop, season))
    .sort((a, b) => b.rating - a.rating || a.crop.nameEn.localeCompare(b.crop.nameEn))
    .slice(0, limit)
    .map((r) => shapeCrop(r.crop, r.rating, landSize))

  return { soil: soilRow.name, season: season || null, crops }
}

// Kon district e kon fosol bhalo
export async function getDistrictCrops({ district, season, landSize }) {
  const d = await prisma.district.findFirst({
    where: { nameEn: ci(district) },
    include: {
      soils: { include: { soil: true } },
      crops: {
        include: {
          crop: { include: { ...cropInclude, soils: { include: { soil: true } } } },
        },
      },
    },
  })
  if (!d) return null

  const soilNames = d.soils.map((s) => s.soil.name)
  const seen = new Map()

  for (const dc of d.crops) {
    if (seen.has(dc.cropId)) continue
    const fits = dc.crop.soils.filter((cs) => soilNames.includes(cs.soil.name))
    const best = [...fits].sort((a, b) => b.rating - a.rating)[0]
    seen.set(
      dc.cropId,
      shapeCrop(dc.crop, best?.rating ?? 0, landSize, {
        bestSoil: best?.soil.name ?? null,
        seasonMatch: inSeason(dc.crop, season),
        productionTon: dc.productionTon ?? null,
      })
    )
  }

  const crops = [...seen.values()].sort(
    (a, b) =>
      Number(b.seasonMatch) - Number(a.seasonMatch) ||
      b.rating - a.rating ||
      a.name.localeCompare(b.name)
  )

  return { district: d.nameEn, division: d.division, soils: soilNames, season: season || null, crops }
}

// Ei fosol kon kon district e bhalo hoy
export async function getCropDistricts({ crop, limit = 8 }) {
  const c = await prisma.crop.findFirst({
    where: { nameEn: ci(crop) },
    include: {
      soils: { include: { soil: true } },
      districts: { include: { district: { include: { soils: { include: { soil: true } } } } } },
    },
  })
  if (!c) return null

  const ratingBySoil = Object.fromEntries(c.soils.map((s) => [s.soil.name, s.rating]))
  const seen = new Map()

  for (const dc of c.districts) {
    if (seen.has(dc.districtId)) continue
    const soils = dc.district.soils.map((s) => s.soil.name)
    seen.set(dc.districtId, {
      name: dc.district.nameEn,
      division: dc.district.division,
      soils,
      soilFit: Math.max(0, ...soils.map((s) => ratingBySoil[s] ?? 0)),
      productionTon: dc.productionTon ?? null,
    })
  }

  const districts = [...seen.values()]
    .sort(
      (a, b) =>
        b.soilFit - a.soilFit ||
        (b.productionTon ?? 0) - (a.productionTon ?? 0) ||
        a.name.localeCompare(b.name)
    )
    .slice(0, limit)

  return { crop: c.nameEn, districts }
}

// Crop advice form submit er por combined result
export async function getAdvice({ soilType, season, district, landSize }) {
  const soilCrops = soilType ? await getSoilCrops({ soil: soilType, season, landSize, limit: 6 }) : null
  const districtCrops = district ? await getDistrictCrops({ district, season, landSize }) : null

  const top = soilCrops?.crops.slice(0, 4) ?? []
  const cropDistricts = (
    await Promise.all(
      top.map(async (c) => {
        const r = await getCropDistricts({ crop: c.name, limit: 6 })
        return r ? { crop: c.name, districts: r.districts } : null
      })
    )
  ).filter(Boolean)

  return { soilCrops, districtCrops, cropDistricts }
}

export const agriKnowledgeService = {
  listDistricts,
  getSoilCrops,
  getDistrictCrops,
  getCropDistricts,
  getAdvice,
}