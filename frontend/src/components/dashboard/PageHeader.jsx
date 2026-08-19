export default function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
      {description && <p className="text-sm text-[var(--color-text-secondary)] mt-1">{description}</p>}
    </div>
  )
}
