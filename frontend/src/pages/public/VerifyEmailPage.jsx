import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function VerifyEmailPage() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    const token = params.get('token')
    if (!token) return setStatus('error')
    authService.verifyEmail(token).then(() => setStatus('success')).catch(() => setStatus('error'))
  }, [params])

  return (
    <div className="max-w-md mx-auto px-6 py-20 text-center">
      {status === 'verifying' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <>
          <h1 className="text-2xl font-bold mb-3">Email verified 🎉</h1>
          <Link to="/login" className="text-[var(--color-primary)] font-medium">Continue to login</Link>
        </>
      )}
      {status === 'error' && <p className="text-[var(--color-error)]">This verification link is invalid or expired.</p>}
    </div>
  )
}
