import { healthcareRepository } from '../repositories/healthcareRepository.js'
import { aiService } from '../ai/aiService.js'

import { prisma } from '../config/prisma.js' 

const SYSTEM_PROMPT = `You are a healthcare guidance assistant for Bangladesh. You do NOT diagnose. 
Given symptoms and a district, return JSON: { "possibleConditions": string[], 
"recommendedSpecialists": string[], "hospitals": [ { "name": string, "address": string } ] }. 
Always include a note to see a licensed doctor for an actual diagnosis.`

export const healthcareService = {
  async getRecommendation(userId, { symptoms, district }) {
    
    let aiResult = {};
    
    // Template for dummy data fallback
    const dummyData = {
      possibleConditions: ['Common Cold', 'General Weakness'],
      recommendedSpecialists: ['General Physician', 'Internal Medicine Specialist'],
      hospitals: [
        { name: 'Dhaka Medical College Hospital', address: 'Dhaka' },
        { name: 'Local General Hospital', address: district || 'Your Area' }
      ]
    };

    // 1. Smart Check: Verify if API Key exists (Takes 0 seconds delay if missing!)
    if (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY) {
      try {
        aiResult = await aiService.completeJSON(
          SYSTEM_PROMPT,
          `Symptoms: ${symptoms}\nDistrict: ${district || 'N/A'}`
        )
      } catch (error) {
        console.log("AI API Error or Invalid Key. Using dummy data...");
        aiResult = dummyData;
      }
    } else {
      console.log("No API Key found. Skipping AI and using fast dummy data.");
      aiResult = dummyData;
    }

    let matchingMedicines = [];
    
    const keywords = symptoms
      ? symptoms
          .toLowerCase()
          .split(/[,\s]+/) 
          .filter((w) => w.length > 2) 
      : [];

    if (keywords.length > 0) {
      matchingMedicines = await prisma.medicine.findMany({
        where: {
          OR: keywords.flatMap((word) => [
            { name: { contains: word, mode: 'insensitive' } },
            { indication: { contains: word, mode: 'insensitive' } }
          ])
        },
        take: 10,
        distinct: ['id'] 
      });
    }

    await healthcareRepository.create(userId, { 
      symptoms, 
      district, 
      aiAnalysis: aiResult 
    });

    return {
      success: true,
      aiAnalysis: aiResult,
      medicines: matchingMedicines,
      message: `Found ${matchingMedicines.length} matching medicine(s) from database.`
    }
  },

  getHistory(userId) {
    return healthcareRepository.findByUser(userId)
  }
}