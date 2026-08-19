import { useEffect, useState } from 'react'
import { Loader2, Users, Target, Plane, Stethoscope, Wheat, Wallet, MessageSquare, ShieldCheck } from 'lucide-react'
import PageHeader from '../../components/dashboard/PageHeader'
import OverviewCard from '../../components/dashboard/OverviewCard'
import { adminService } from '../../services/adminService'
import { useAuth } from '../../contexts/AuthContext'
import { getErrorMessage } from '../../utils/errors'

export default function AdminDashboard() {
  const { user: currentUser } = useAuth()
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const pageSize = 20
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  async function load(currentPage = page) {
    setIsLoading(true)
    setError('')
    try {
      const [statsData, usersData] = await Promise.all([
        adminService.stats(),
        adminService.listUsers(currentPage),
      ])
      setStats(statsData)
      setUsers(usersData.users)
      setTotal(usersData.total)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load admin data.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  async function toggleRole(targetUser) {
    const nextRole = targetUser.role === 'ADMIN' ? 'USER' : 'ADMIN'
    if (targetUser.id === currentUser?.id) {
      if (!confirm(`Change your own role to ${nextRole}? You may lose admin access.`)) return
    }
    setBusyId(targetUser.id)
    try {
      const updated = await adminService.setUserRole(targetUser.id, nextRole)
      setUsers((prev) => prev.map((u) => (u.id === targetUser.id ? { ...u, role: updated.role } : u)))
    } catch (err) {
      setError(getErrorMessage(err, 'Could not update this user\u2019s role.'))
    } finally {
      setBusyId(null)
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div>
      <PageHeader title="Admin Dashboard" description="User management, module analytics, and system health." />

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--color-error-50)] text-[var(--color-error)] text-sm">
          {error}
        </div>
      )}

      {isLoading && !stats ? (
        <div className="card p-8 flex items-center justify-center text-[var(--color-text-muted)]">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading admin data...
        </div>
      ) : (
        <>
          {stats && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <OverviewCard label="Total Users" value={total} icon={Users} />
              <OverviewCard label="Goals" value={stats.goals} icon={Target} />
              <OverviewCard label="Travel Plans" value={stats.travelPlans} icon={Plane} />
              <OverviewCard label="Medical Records" value={stats.medicalRecords} icon={Stethoscope} />
              <OverviewCard label="Agriculture Records" value={stats.agricultureRecords} icon={Wheat} />
              <OverviewCard label="Budgets" value={stats.budgets} icon={Wallet} />
              <OverviewCard label="Assistant Messages" value={stats.chatMessages} icon={MessageSquare} />
            </div>
          )}

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[var(--color-text-muted)] border-b border-[var(--color-border-default)]">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Verified</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-default)]">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="p-4 text-[var(--color-text-primary)] font-medium">{u.name}</td>
                    <td className="p-4 text-[var(--color-text-secondary)]">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          u.role === 'ADMIN'
                            ? 'bg-[var(--color-primary-100)] text-[var(--color-primary)]'
                            : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]'
                        }`}
                      >
                        {u.role === 'ADMIN' && <ShieldCheck size={12} />}
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)]">
                      {u.isEmailVerified ? 'Yes' : 'No'}
                    </td>
                    <td className="p-4 text-[var(--color-text-muted)] text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleRole(u)}
                        disabled={busyId === u.id}
                        className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] disabled:opacity-50"
                      >
                        {busyId === u.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : u.role === 'ADMIN' ? (
                          'Revoke admin'
                        ) : (
                          'Make admin'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-xs text-[var(--color-text-muted)]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-default)] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
