# Testing Guide

No automated tests exist yet in this scaffold. This document lays out how to add
them, since testing an AI-integrated app requires a couple of specific patterns.

## Backend

**Recommended stack:** Vitest (or Jest) + Supertest + an isolated test database.

```bash
cd backend
npm install -D vitest supertest
```

### Key pattern: mock `aiService`, don't call real AI providers in tests
Every AI module (career/travel/healthcare/agriculture/budget/assistant) goes
through `src/ai/aiService.js`. Mock that module so tests are fast, free, and
deterministic:

```js
// backend/src/services/careerService.test.js
import { vi, describe, it, expect } from 'vitest'
import { careerService } from './careerService.js'
import { aiService } from '../ai/aiService.js'

vi.mock('../ai/aiService.js', () => ({
  aiService: { completeJSON: vi.fn() },
}))

describe('careerService.getRecommendation', () => {
  it('returns AI recommendations and persists them', async () => {
    aiService.completeJSON.mockResolvedValue({
      recommendations: [{ title: 'Frontend Developer', description: '...', matchedSkills: [], missingSkills: [] }],
    })
    const result = await careerService.getRecommendation('user-1', {
      education: 'Bachelor', skills: ['JavaScript'], interests: 'web dev',
    })
    expect(result.recommendations).toHaveLength(1)
  })
})
```

### Route-level tests (Supertest)
Use a separate `DATABASE_URL` (e.g. `pce_test`) so tests don't touch dev data.
Run `prisma migrate deploy` against it before the test suite, and either wrap
each test in a transaction that's rolled back, or truncate tables in
`afterEach`.

```js
import request from 'supertest'
import { app } from '../app.js'

it('rejects unauthenticated requests', async () => {
  const res = await request(app).post('/api/career/recommendations').send({})
  expect(res.status).toBe(401)
})
```

### What to prioritize testing first
1. Auth: signup validation, login with wrong password, JWT expiry/refresh flow
2. Each module's controller: auth required, validation errors return 422
3. `aiService.completeJSON`: throws cleanly when the provider returns non-JSON
4. Repository layer: mostly thin passthroughs — lower priority than services

## Frontend

**Recommended stack:** Vitest + React Testing Library for components/hooks;
Playwright for end-to-end flows.

```bash
cd frontend
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Priority order
1. `useAIRecommendation` hook — loading/error/success states
2. `AIModuleForm` — required-field validation, submit calls `onSubmit` with form values
3. `AuthContext` — login sets user + stores token; logout clears both
4. `ProtectedRoute` — redirects to `/login` when unauthenticated

### End-to-end (Playwright), against a real running backend + test DB
- Sign up → verify (read the link from a test SMTP catcher like Mailhog) → log in
- Submit the Career form → assert a recommendation card renders
- Log out → confirm dashboard routes redirect to `/login`

## CI suggestion
Run backend and frontend test suites in parallel GitHub Actions jobs; spin up
Postgres as a service container for backend tests:

```yaml
services:
  postgres:
    image: postgres:16
    env:
      POSTGRES_PASSWORD: postgres
    ports: ['5432:5432']
```
