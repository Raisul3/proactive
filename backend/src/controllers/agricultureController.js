import { agricultureService } from '../services/agricultureService.js'
import { agriKnowledgeService } from '../services/agriKnowledgeService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const notFound = (res, what) => res.status(404).json({ message: `${what} not found` })

export const agricultureController = {
  getRecommendation: asyncHandler(async (req, res) => {
    res.json(await agricultureService.getRecommendation(req.user.id, req.body))
  }),

  getHistory: asyncHandler(async (req, res) => {
    res.json({ history: await agricultureService.getHistory(req.user.id) })
  }),

  listDistricts: asyncHandler(async (req, res) => {
    res.json({ districts: await agriKnowledgeService.listDistricts() })
  }),

  getDistrictCrops: asyncHandler(async (req, res) => {
    const data = await agriKnowledgeService.getDistrictCrops({
      district: req.params.name,
      season: req.query.season,
      landSize: req.query.landSize,
    })
    if (!data) return notFound(res, 'District')
    res.json(data)
  }),

  getSoilCrops: asyncHandler(async (req, res) => {
    const data = await agriKnowledgeService.getSoilCrops({
      soil: req.params.name,
      season: req.query.season,
      landSize: req.query.landSize,
      limit: 15,
    })
    if (!data) return notFound(res, 'Soil')
    res.json(data)
  }),

  getCropDistricts: asyncHandler(async (req, res) => {
    const data = await agriKnowledgeService.getCropDistricts({ crop: req.params.name, limit: 15 })
    if (!data) return notFound(res, 'Crop')
    res.json(data)
  }),
}