import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
  const [sent, setSent] = useState(false)

  const onSubmit = async () => {
    setSent(true)
    reset()
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Contact us</h1>
      {sent && <p className="mb-4 text-[var(--color-success)]">Thanks — we'll get back to you soon.</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input placeholder="Name" className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register('name', { required: true })} />
        <input type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register('email', { required: true })} />
        <textarea placeholder="Message" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register('message', { required: true })} />
        <button disabled={isSubmitting} className="w-full py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold">Send message</button>
      </form>
    </div>
  )
}
