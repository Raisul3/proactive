import PageHeader from '../../components/dashboard/PageHeader'
import AIModuleForm from '../../components/dashboard/AIModuleForm'
import { useAIRecommendation } from '../../hooks/useAIRecommendation'

const fields = [
  { name: 'monthlyIncome', label: 'Monthly income (৳)', type: 'number', required: true },
  { name: 'monthlyExpenses', label: 'Monthly expenses (৳)', type: 'number', required: true },
  { name: 'savingsGoal', label: 'Savings goal (৳)', type: 'number' },
]

export default function BudgetPage() {
  const { result, error, isLoading, requestRecommendation } = useAIRecommendation('budget')

  return (
    <div>
      <PageHeader title="Budget Planner" description="AI-driven budget analysis and savings recommendations." />
      <AIModuleForm fields={fields} onSubmit={requestRecommendation} submitLabel="Analyze Budget" />
      {error && <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>}
      {isLoading && <p className="mt-4 text-sm text-[var(--color-text-muted)]">Crunching the numbers...</p>}
      {result?.tips?.map((tip, i) => (
        <div key={i} className="card p-5 mt-4">
          <p className="text-sm text-[var(--color-text-secondary)]">{tip}</p>
        </div>
      ))}
    </div>
  )
}
