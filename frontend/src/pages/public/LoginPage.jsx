import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AuthShell from '../../components/layout/AuthShell'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [serverError, setServerError] = useState('')

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await login(values)
      const next = searchParams.get('next')
      navigate(next && next.startsWith('/') ? next : '/dashboard')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold mb-1 text-[var(--color-text-primary)]">Welcome back</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">Log in to your account</p>

      {serverError && (
        <p className="mb-4 text-sm text-[var(--color-error)] bg-[var(--color-error-50)] px-4 py-2.5 rounded-lg">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]"
              {...register('email', { required: 'Email is required' })}
            />
          </div>
          {errors.email && <p className="text-xs text-[var(--color-error)] mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]"
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
            />
          </div>
          {errors.password && <p className="text-xs text-[var(--color-error)] mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-[var(--color-primary)] font-medium">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-sm hover:shadow-md transition disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
        Don't have an account? <Link to="/signup" className="text-[var(--color-primary)] font-medium">Sign up</Link>
      </p>
    </AuthShell>
  )
}
