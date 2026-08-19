import { useForm } from 'react-hook-form'
import { Sparkles } from 'lucide-react'

/**
 * Generic form renderer for AI-powered modules (Career, Travel, Healthcare,
 * Agriculture, Budget). Each module page passes its own `fields` config and
 * `onSubmit` handler, avoiding a duplicated form component per module.
 */
export default function AIModuleForm({ fields, onSubmit, submitLabel = 'Get AI Recommendations', accentColor, SubmitIcon = Sparkles }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.span === 2 ? 'sm:col-span-2' : ''}>
            <label className="text-sm font-medium block mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register(field.name, { required: field.required })}>
                <option value="">Select...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register(field.name, { required: field.required })} />
            ) : (
              <input type={field.type || 'text'} className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border-default)]" {...register(field.name, { required: field.required })} />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        style={accentColor ? { backgroundColor: accentColor } : undefined}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold disabled:opacity-60"
      >
        <SubmitIcon size={16} />
        {isSubmitting ? 'Analyzing...' : submitLabel}
      </button>
    </form>
  )
}
