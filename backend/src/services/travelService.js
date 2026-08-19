import { prisma } from '../config/prisma.js'
import { travelRepository } from '../repositories/travelRepository.js'
import { findBestMatch } from '../utils/fuzzyMatch.js'
// FUTURE: import { aiService } from '../ai/aiService.js'

const SYSTEM_PROMPT = `You are a travel planner for Bangladesh. Given a destination, budget,
travel dates, and preferences, return JSON: { "itinerary": [ { "name": string, "notes": string } ] }.
Include 3-6 stops covering destinations, hotels, and transportation.`

function tierHintFromPreferences(preferences = '') {
  const text = preferences.toLowerCase()
  if (/budget|cheap|economy|shosto|kom taka/i.test(text)) return { hotelTier: '3_star', transportMode: 'bus_non_ac', label: 'budget-friendly' }
  if (/luxury|premium|comfort|5.?star|deluxe/i.test(text)) return { hotelTier: '5_star', transportMode: 'plane', label: 'luxury' }
  if (/family|kids|comfortable/i.test(text)) return { hotelTier: '4_star', transportMode: 'bus_ac', label: 'family-friendly' }
  return null
}

export const travelService = {
  async getRecommendation(userId, { destination, budget, travelDates, preferences }) {
    const budgetNum = Number(budget) || 0

    const allPackages = await prisma.travelPackage.findMany({
      where: { isActive: true },
      include: { transportOptions: true, hotelOptions: true },
    })
    const packageData = findBestMatch(destination, allPackages, (p) => p.destination)

    let aiResult = null

    // =================================================================
    // 🤖 FUTURE AI BLOCK
    // =================================================================
    /*
    const raw = await aiService.completeJSON(
      SYSTEM_PROMPT,
      `Destination: ${destination}\nBudget: ${budgetNum}\nDates: ${travelDates || 'flexible'}\nPreferences: ${preferences || 'N/A'}\n` +
      (packageData ? `Verified local data: ${JSON.stringify(packageData)}` : 'No local data available, use your global knowledge.')
    )
    aiResult = { itinerary: raw.itinerary }
    */

    if (!aiResult) {
      if (packageData) {
        const baseCost = Number(packageData.baseBudget?.['1_person']) || 0
        const nights = 1 

        const transports = [...packageData.transportOptions]
          .sort((a, b) => a.price - b.price)
          .map((t) => ({
            mode: t.mode,
            label: t.mode.replace(/_/g, ' '),
            price: Number(t.price),
            withinBudget: Number(t.price) <= budgetNum - baseCost,
          }))
        const hotels = [...packageData.hotelOptions]
          .sort((a, b) => a.pricePerNight - b.pricePerNight)
          .map((h) => ({
            tier: h.tier,
            label: h.tier.replace(/_/g, ' '),
            pricePerNight: Number(h.pricePerNight),
            withinBudget: Number(h.pricePerNight) * nights <= budgetNum - baseCost,
          }))

        const hint = tierHintFromPreferences(preferences)
        const pickedTransport = transports.find((t) => t.mode === hint?.transportMode) || transports[0]
        const pickedHotel = hotels.find((h) => h.tier === hint?.hotelTier) || hotels[0]
        const recommendedTotal = baseCost + (pickedTransport?.price || 0) + (pickedHotel?.pricePerNight || 0) * nights
        const fitsBudget = recommendedTotal <= budgetNum

        const itinerary = [
          {
            type: 'day',
            name: `🚀 Day 1: Welcome to ${packageData.destination}!`,
            notes: `Arrival and check-in. Explore traditional local spots: ${packageData.traditionalPlaces.join(', ')}.`,
          },
          {
            type: 'day',
            name: `🌿 Day 2: Nature & Adventure`,
            notes: `Visit the best nature and sightseeing areas: ${packageData.bestVisitingAreas.join(', ')}.`,
          },
          {
            type: 'budget',
            name: `💰 Budget Overview`,
            data: {
              userBudget: budgetNum,
              baseCost,
              nights,
              pickReason: hint ? `picked for your "${hint.label}" preference` : 'cheapest available combo',
              recommended: {
                transportLabel: pickedTransport?.label,
                hotelLabel: pickedHotel?.label,
                total: recommendedTotal,
                fitsBudget,
                diff: Math.abs(budgetNum - recommendedTotal),
              },
              transportOptions: transports,
              hotelOptions: hotels,
            },
          },
        ]

        if (preferences?.trim()) {
          itinerary.push({
            type: 'preference',
            name: `💡 Based on your preferences`,
            notes: `"${preferences}" → steered the pick above toward a ${hint ? hint.label : 'closest-matching'} option.`,
          })
        }

        aiResult = { itinerary }
      } else {
        aiResult = {
          itinerary: [
            {
              type: 'day',
              name: `🔍 Searching for: ${destination}`,
              notes: `We couldn't match "${destination}" with our 20 verified destinations. Your target budget was ৳${budgetNum.toLocaleString('en-BD')}. Once AI integration is live, you'll get a fully custom plan here regardless of location!`,
            },
          ],
        }
      }
    }

    await travelRepository.create(userId, {
      destination,
      budget: budgetNum,
      travelDates,
      preferences,
      aiItinerary: aiResult.itinerary,
      packageId: packageData?.id ?? null,
    })

    return aiResult
  },

  getHistory(userId) {
    return travelRepository.findByUser(userId)
  },
}