import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { authService } from '../../services/authService'

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [sent, setSent] = useState(false)

  const onSubmit = async ({ email }) => {
    await authService.forgotPassword(email)
    setSent(true)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
      {sent ? (
        <p className="text-[var(--color-text-secondary)]">If that email exists, a reset link is on its way.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register('email', { required: true })} />
          <button disabled={isSubmitting} className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold">
            Send reset link
          </button>
        </form>
      )}
    </div>
  )
}
