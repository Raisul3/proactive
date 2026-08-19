import api from './api'

// One generic service for all AI-recommendation modules (career, travel,
// healthcare, agriculture, budget). Each hits its own backend route but
// shares the same request/response shape, so no per-module service files
// are needed.
export const moduleService = {
  async getRecommendation(moduleId, payload) {
    const { data } = await api.post(`/${moduleId}/recommendations`, payload)
    return data
  },
  async getHistory(moduleId) {
    const { data } = await api.get(`/${moduleId}/history`)
    return data
  },
}
