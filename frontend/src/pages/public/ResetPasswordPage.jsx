import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const onSubmit = async ({ password }) => {
    await authService.resetPassword(params.get('token'), password)
    navigate('/login')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Set a new password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="password" placeholder="New password" className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register('password', { required: true, minLength: 8 })} />
        <button disabled={isSubmitting} className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold">
          Update password
        </button>
      </form>
    </div>
  )
}
