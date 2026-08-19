# Deployment Guide

## Overview
Deploy the backend and frontend as two separate services, plus a managed Postgres database.

```
Frontend (static)  →  Vercel / Netlify / Cloudflare Pages
Backend (Node API) →  Railway / Render / Fly.io
Database           →  Supabase / Neon / Railway Postgres / RDS
```

## 1. Database
Any managed PostgreSQL works. Supabase and Neon both have free tiers and give you
a ready-to-use `DATABASE_URL`. After provisioning:

```bash
cd backend
DATABASE_URL="<production-url>" npm run prisma:migrate
```

Run migrations from CI or manually before each deploy — never run
`prisma migrate dev` against production (it can prompt for destructive resets;
use `prisma migrate deploy` in CI instead).

## 2. Backend deployment (Railway/Render/Fly.io — any Node host works)

1. Set the start command: `npm start` (runs `node src/server.js`)
2. Set environment variables (mirror `.env.example`):
   - `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
   - `CLIENT_URL` → your deployed frontend URL (required for CORS + cookie settings)
   - `AI_PROVIDER` + the matching API key
   - `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` if using Google login
   - `SMTP_*` for real verification/reset emails
   - `NODE_ENV=production`
3. Build step: `npm install && npm run prisma:generate`
4. Health check path: `/api/health`

### Dockerfile (optional, for container-based hosts)
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npx prisma generate
EXPOSE 4000
CMD ["node", "src/server.js"]
```

## 3. Frontend deployment (Vercel/Netlify)

1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variable: `VITE_API_URL=https://<your-backend-domain>/api`
4. Update `frontend/src/services/api.js` to use `import.meta.env.VITE_API_URL` as
   the `baseURL` instead of the `/api` dev-proxy path (the proxy in `vite.config.js`
   only applies to `npm run dev`, not the production build).

## 4. Post-deploy checklist
- [ ] Update backend `CLIENT_URL` to the real frontend origin (CORS + cookie `SameSite`)
- [ ] Confirm cookies work cross-origin: if frontend and backend are on different
      domains, set `sameSite: 'none'` and `secure: true` on the refresh-token cookie
      in `authController.js`, and ensure both are served over HTTPS
- [ ] Add your production domain to the Google OAuth consent screen's authorized
      origins/redirect URIs
- [ ] Set up log aggregation for the backend (pino output is JSON in production —
      pipe it to your host's log viewer or a service like Logtail)
- [ ] Set up DB backups (most managed Postgres providers offer automatic daily backups)
- [ ] Put the API behind a rate limiter at the edge too if you expect abuse (the
      app already has `express-rate-limit`, but a CDN/WAF layer is extra protection)

## Scaling notes
- The backend is stateless (JWT auth, no server-side sessions) so it can run as
  multiple instances behind a load balancer without sticky sessions.
- Prisma's connection pool defaults are usually fine for small-to-medium traffic;
  for serverless deployments (e.g. Vercel functions) use Prisma's connection
  pooling mode or a pooler like PgBouncer to avoid exhausting Postgres connections.
