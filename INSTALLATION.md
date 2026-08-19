# Installation Guide

## Prerequisites
- Node.js 20+ and npm
- A PostgreSQL database — either:
  - Local Postgres (`brew install postgresql` / `apt install postgresql`), or
  - A free [Supabase](https://supabase.com) project (gives you a `DATABASE_URL` instantly)
- At least one AI provider API key: [OpenAI](https://platform.openai.com/api-keys),
  [Anthropic](https://console.anthropic.com/settings/keys), or
  [Google AI Studio](https://aistudio.google.com/apikey) (for Gemini)
- (Optional) A [Google Cloud OAuth client ID](https://console.cloud.google.com/apis/credentials)
  for Google Sign-In
- (Optional) SMTP credentials for real emails — without them, verification/reset
  links are logged to the backend console instead of sent, which is fine for local dev

## 1. Clone and install

```bash
git clone <your-repo-url>
cd <repo>
```

## 2. Backend setup

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — your Postgres connection string
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` — generate with `openssl rand -hex 32`
  (use a different value for each)
- `AI_PROVIDER` — `openai`, `claude`, or `gemini`
- The matching `*_API_KEY` for whichever provider you chose
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — only needed if you want Google login working

Install dependencies and set up the database:

```bash
npm install
npm run prisma:generate   # generates the Prisma client from schema.prisma
npm run prisma:migrate    # creates all tables in your database
```

Start the API:

```bash
npm run dev
```

You should see `Proactive Life API listening on http://localhost:4000`.
Check it: `curl http://localhost:4000/api/health` → `{"status":"ok"}`.

## 3. Frontend setup

In a new terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173`. The dev server proxies `/api/*` requests to
`http://localhost:4000` (configured in `vite.config.js`), so no CORS setup is
needed locally.

## 4. Verify the full flow
1. Sign up on `/signup`
2. Check the backend terminal — if SMTP isn't configured, the verification link
   is logged there. Copy it and open it in the browser.
3. Log in on `/login`
4. Go to any of Career / Travel / Healthcare / Agriculture / Budget under the
   dashboard, submit the form, and confirm you get back an AI-generated result
   (this confirms your AI provider key is working end-to-end)

## Troubleshooting
- **`Cannot find module '.prisma/client/default'`** — run `npm run prisma:generate`
  in `backend/` (needs network access to Prisma's engine download).
- **`ECONNREFUSED` on API calls** — the backend isn't running, or `DATABASE_URL`
  is wrong and it failed to start; check the backend terminal for errors.
- **AI requests fail with a 401/403** — the API key for your selected `AI_PROVIDER`
  is missing or invalid.
- **Google login fails** — `GOOGLE_CLIENT_ID` must match on both backend `.env` and
  frontend `.env` (`VITE_GOOGLE_CLIENT_ID`), and your OAuth consent screen must allow
  `http://localhost:5173` as an authorized origin.
