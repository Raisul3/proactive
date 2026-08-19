import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import DashboardFooter from '../components/layout/DashboardFooter'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-main)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  )
}
