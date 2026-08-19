import { useState } from 'react'
import { moduleService } from '../services/moduleService'

export function useAIRecommendation(moduleId) {
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestRecommendation = async (formValues) => {
    setIsLoading(true)
    setError('')
    try {
      const data = await moduleService.getRecommendation(moduleId, formValues)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { result, error, isLoading, requestRecommendation }
}
