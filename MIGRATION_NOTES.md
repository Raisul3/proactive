# Migration Notes

## Original app (Raisul3/PCEmaisha)
- Vite + vanilla JavaScript, no framework
- `main.js` (1,661 lines): one global mutable `state` object, pages rendered by
  injecting template-literal HTML strings into `#app`, a `switch` statement for
  routing (no real URLs)
- `style.css` (2,147 lines): hand-written, but with a well-structured design-token
  system (`:root` CSS variables for color/spacing/radius/shadows/font)
- All data (services list, stats, testimonials, FAQ, per-module "recommendations")
  was hardcoded — no backend, no database, no auth, no AI

## What was ported as-is
- **Design tokens** — colors (`--primary #2563EB`, success/accent/error scales),
  spacing scale, radius scale, shadows, `Inter` font — copied into
  `frontend/src/styles/index.css` as a Tailwind v4 `@theme` block, so the visual
  identity is unchanged.
- **Copy and mock content** — services list, stats, testimonials, FAQ text — moved
  to `frontend/src/constants/content.js`, now used to seed the UI while real data
  wiring is added.
- **Page structure and flow** — landing page section order, dashboard sidebar
  concept, per-module "form → AI result" pattern — all carried over into the
  React version.

## What was rebuilt (not portable line-by-line)
Template-string HTML can't be mechanically converted to JSX — it had to be
rewritten component-by-component:
- `innerHTML` string templates → JSX components (`Hero`, `ServicesGrid`, `Stats`,
  `Testimonials`, `FAQ`, `Sidebar`, `Topbar`, etc.)
- Inline `onclick="navigate(...)"` → React Router (`<Link>`, `<NavLink>`, `useNavigate`)
- One global mutable `state` object → `AuthContext` + `ThemeContext` + component-local
  state via `useState`/React Hook Form
- Fake `setTimeout`-based "AI analysis" → real backend calls through
  `useAIRecommendation` (hook) → `moduleService` (Axios) → Express → `aiService` →
  actual AI provider → Postgres via Prisma

## New: backend (didn't exist before)
Express + Prisma, layered as **Route → Controller → Service → Repository**:
- Routes: HTTP method + path only, delegates to a controller
- Controllers: thin — parse `req`, call a service, shape the response
- Services: business logic, including AI calls and email sending
- Repositories: the *only* files that import Prisma — isolates the ORM so it could
  be swapped later without touching business logic

## New: AI service layer
`backend/src/ai/aiService.js` exposes `complete({ system, prompt })` and
`completeJSON(system, prompt)`. Three adapters (`providers/openaiProvider.js`,
`claudeProvider.js`, `geminiProvider.js`) each implement the same
`{ name, complete({ system, prompt }) }` shape. Switching providers is one env
var (`AI_PROVIDER`); no service or controller code changes.

## Endpoint reference (what's live right now)

| Module | Endpoints | Frontend page |
|---|---|---|
| Auth | `POST /auth/signup`, `/login`, `/google`, `/refresh`, `/logout`, `/verify-email`, `/forgot-password`, `/reset-password`, `GET /auth/me` | Login/Signup/Forgot/Reset/VerifyEmail pages |
| Career | `POST /career/recommendations`, `GET /career/history` | `CareerPage.jsx` |
| Travel | `POST /travel/recommendations`, `GET /travel/history` | `TravelPage.jsx` |
| Healthcare | `POST /healthcare/recommendations`, `GET /healthcare/history` | `HealthcarePage.jsx` |
| Agriculture | `POST /agriculture/recommendations`, `GET /agriculture/history` | `AgriculturePage.jsx` |
| Budget | `POST /budget/recommendations`, `GET /budget/history` | `BudgetPage.jsx` |
| AI Assistant | `POST /assistant/chat` | `AssistantPage.jsx` |
| Goals | `GET/POST /goals`, `GET/PATCH/DELETE /goals/:id` | placeholder (`GoalsPage.jsx`) |
| Tasks | `GET/POST /tasks`, `PATCH/DELETE /tasks/:id` | placeholder (`PlannerPage.jsx`) |
| Habits | `GET/POST /habits`, `POST /habits/:id/check-in`, `DELETE /habits/:id` | placeholder (`HabitsPage.jsx`) |
| Reports | `GET /reports`, `POST /reports/generate` | placeholder (`ReportsPage.jsx`) |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read` | placeholder (`NotificationsPage.jsx`) |
| Settings | `GET/PATCH /settings` | placeholder (`SettingsPage.jsx`) |
| Profile | `PATCH /profile` | placeholder (`ProfilePage.jsx`) |
| Admin | `GET /admin/users`, `GET /admin/stats`, `PATCH /admin/users/:id/role` | `AdminDashboard.jsx` (stats/list UI not built) |

All routes except auth's public ones require a valid JWT (`Authorization: Bearer <token>`).
Admin routes additionally require `role: ADMIN` on the user record.
