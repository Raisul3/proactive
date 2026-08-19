import { useEffect, useState } from 'react'
import { Loader2, Sparkles, FileText, Target, CheckSquare, Repeat, Wallet } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import OverviewCard from '../../components/dashboard/OverviewCard'
import { reportService } from '../../services/reportService'
import { getErrorMessage } from '../../utils/errors'

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setIsLoading(true)
    setError('')
    try {
      setReports(await reportService.list())
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your reports.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function generate() {
    setIsGenerating(true)
    setError('')
    try {
      await reportService.generate()
      await load()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not generate a report.'))
    } finally {
      setIsGenerating(false)
    }
  }

  const latest = reports[0]

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <PageHeader title="Reports" description="Snapshots of your progress across goals, tasks, habits, and budget." />
        <button
          onClick={generate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold shrink-0 disabled:opacity-60"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Generate Report
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="card p-8 text-center text-[var(--color-text-muted)]">
          <FileText size={28} className="mx-auto mb-2 opacity-60" />
          No reports yet. Generate your first one to see a summary.
        </div>
      ) : (
        <>
          {latest?.data && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <OverviewCard label="Goals" value={latest.data.goals} icon={Target} />
              <OverviewCard label="Tasks Done" value={latest.data.completedTasks} icon={CheckSquare} />
              <OverviewCard label="Habits" value={latest.data.habits} icon={Repeat} />
              <OverviewCard label="Budgets" value={latest.data.budgets} icon={Wallet} />
            </div>
          )}

          <div className="card divide-y divide-[var(--color-border-default)]">
            {reports.map((report) => (
              <div key={report.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)] capitalize">{report.type} report</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
                {report.data && (
                  <div className="text-xs text-[var(--color-text-muted)] text-right">
                    {report.data.goals} goals · {report.data.completedTasks} tasks done · {report.data.habits} habits · {report.data.budgets} budgets
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
