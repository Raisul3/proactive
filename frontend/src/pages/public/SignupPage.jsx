import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { User, Mail, Lock, MailCheck } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AuthShell from '../../components/layout/AuthShell'

export default function SignupPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const { signup } = useAuth()
  const [serverError, setServerError] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = async (values) => {
    setServerError('')
    try {
      await signup(values)
      setDone(true)
    } catch (err) {
      setServerError(err.response?.data?.message || 'Signup failed. Please try again.')
    }
  }

  if (done) {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-100)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
            <MailCheck size={24} />
          </div>
          <h1 className="text-2xl font-bold mb-3">Check your email</h1>
          <p className="text-[var(--color-text-secondary)]">
            We sent a verification link to your inbox. Verify your email, then{' '}
            <Link to="/login" className="text-[var(--color-primary)] font-medium">log in</Link>.
          </p>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold mb-1 text-[var(--color-text-primary)]">Create your account</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">Start managing your life proactively</p>

      {serverError && (
        <p className="mb-4 text-sm text-[var(--color-error)] bg-[var(--color-error-50)] px-4 py-2.5 rounded-lg">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Full name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]" {...register('name', { required: 'Name is required' })} />
          </div>
          {errors.name && <p className="text-xs text-[var(--color-error)] mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]" {...register('email', { required: 'Email is required' })} />
          </div>
          {errors.email && <p className="text-xs text-[var(--color-error)] mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input type="password" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })} />
          </div>
          {errors.password && <p className="text-xs text-[var(--color-error)] mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Confirm password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input type="password" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]" {...register('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords do not match' })} />
          </div>
          {errors.confirmPassword && <p className="text-xs text-[var(--color-error)] mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold shadow-sm hover:shadow-md transition disabled:opacity-60">
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-[var(--color-text-secondary)]">
        Already have an account? <Link to="/login" className="text-[var(--color-primary)] font-medium">Log in</Link>
      </p>
    </AuthShell>
  )
}
