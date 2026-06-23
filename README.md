# SaaSSpotter Frontend

Consumer-facing UI for **SaaSSpotter** — browse validated business pain points and Micro-SaaS ideas.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + [Aceternity UI](https://ui.aceternity.com)
- TanStack Query + Motion

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `API_URL` | Backend API base URL (server-side proxy target) |
| `NEXT_PUBLIC_API_URL` | Optional fallback for `API_URL` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key (server-side) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route (default `/sign-in`) |

The browser calls `/api/v1/*` on the same origin. Next.js proxies that to `API_URL`, so **you do not need to add your Vercel domain to backend CORS** for the feed to work.

Authenticated features (saved ideas, alerts) use `/api/user/*` BFF routes that forward the Clerk session token to the backend. Set **`CLERK_ISSUER`** on the backend to match your Clerk instance.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment checklist

1. Set **`API_URL`** in Vercel (e.g. `https://f6rj7peypk.execute-api.ap-south-1.amazonaws.com`)
2. Redeploy after adding the env var
3. Verify API health: `curl $API_URL/health`
4. Verify proxy: `curl "https://your-app.vercel.app/api/v1/painpoints?page=1&page_size=5"`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Paginated pain point feed |
| `/tag/[industry_tag]` | Feed filtered by industry tag |
| `/idea/[id]` | Idea detail with evidence and score explainer |
| `/digest` | Weekly digest of top ideas |
| `/compare` | Side-by-side comparison (up to 3 ideas) |
| `/saved` | Saved ideas (requires sign-in) |
| `/alerts` | Alert watches (requires sign-in) |
| `/sign-in` | Clerk sign-in (Google OAuth) |
