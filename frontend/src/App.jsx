import { Routes, Route } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

import LandingPage from './pages/public/LandingPage'
import ServicesPage from './pages/public/ServicesPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import LoginPage from './pages/public/LoginPage'
import SignupPage from './pages/public/SignupPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import ResetPasswordPage from './pages/public/ResetPasswordPage'
import VerifyEmailPage from './pages/public/VerifyEmailPage'

import DashboardHome from './pages/dashboard/DashboardHome'
import CareerPage from './pages/dashboard/CareerPage'
import TravelPage from './pages/dashboard/TravelPage'
import HealthcarePage from './pages/dashboard/HealthcarePage'
import AgriculturePage from './pages/dashboard/AgriculturePage'
import BudgetPage from './pages/dashboard/BudgetPage'
import HabitsPage from './pages/dashboard/HabitsPage'
import GoalsPage from './pages/dashboard/GoalsPage'
import PlannerPage from './pages/dashboard/PlannerPage'
import ReportsPage from './pages/dashboard/ReportsPage'
import NotificationsPage from './pages/dashboard/NotificationsPage'
import ProfilePage from './pages/dashboard/ProfilePage'
import SettingsPage from './pages/dashboard/SettingsPage'

// AI Assistant hub (AI Agent) — /dashboard/assistant/*
import AssistantLayout from './pages/dashboard/assistant/AssistantLayout'
import ChatTab from './pages/dashboard/assistant/ChatTab'
import RoadmapTab from './pages/dashboard/assistant/RoadmapTab'
import ResumeTab from './pages/dashboard/assistant/ResumeTab'
import InterviewTab from './pages/dashboard/assistant/InterviewTab'
import SkillGapTab from './pages/dashboard/assistant/SkillGapTab'
import LearningPlanTab from './pages/dashboard/assistant/LearningPlanTab'
import MemoryTab from './pages/dashboard/assistant/MemoryTab'

// Bangladesh Service Hub — /dashboard/bd-hub/*
import BDHubLayout from './pages/dashboard/bd-hub/BDHubLayout'
import FinanceTab from './pages/dashboard/bd-hub/FinanceTab'
import GovernmentServicesTab from './pages/dashboard/bd-hub/GovernmentServicesTab'
import UtilityBillsTab from './pages/dashboard/bd-hub/UtilityBillsTab'
import EmergencyContactsTab from './pages/dashboard/bd-hub/EmergencyContactsTab'

import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth pages — standalone, no marketing header/footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Authenticated dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />

          {/* AI Assistant hub */}
          <Route path="/dashboard/assistant" element={<AssistantLayout />}>
            <Route index element={<ChatTab />} />
            <Route path="roadmap" element={<RoadmapTab />} />
            <Route path="resume" element={<ResumeTab />} />
            <Route path="interview" element={<InterviewTab />} />
            <Route path="skill-gap" element={<SkillGapTab />} />
            <Route path="learning-plan" element={<LearningPlanTab />} />
            <Route path="memory" element={<MemoryTab />} />
          </Route>

          <Route path="/dashboard/career" element={<CareerPage />} />
          <Route path="/dashboard/travel" element={<TravelPage />} />
          <Route path="/dashboard/healthcare" element={<HealthcarePage />} />
          <Route path="/dashboard/agriculture" element={<AgriculturePage />} />

          {/* Bangladesh Service Hub — replaces the standalone Budget Planner
              nav item; the old route below stays available for anyone with
              an existing bookmark, and Finance tab reuses the same backend. */}
          <Route path="/dashboard/bd-hub" element={<BDHubLayout />}>
            <Route index element={<FinanceTab />} />
            <Route path="government" element={<GovernmentServicesTab />} />
            <Route path="utility" element={<UtilityBillsTab />} />
            <Route path="emergency" element={<EmergencyContactsTab />} />
          </Route>
          <Route path="/dashboard/budget" element={<BudgetPage />} />

          <Route path="/dashboard/habits" element={<HabitsPage />} />
          <Route path="/dashboard/goals" element={<GoalsPage />} />
          <Route path="/dashboard/planner" element={<PlannerPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute requireAdmin />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}
