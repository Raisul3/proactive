import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ requireAdmin = false }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) return <div className="p-10 text-center">Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (requireAdmin && user?.role !== 'ADMIN') return <Navigate to="/dashboard" replace />

  return <Outlet />
}
