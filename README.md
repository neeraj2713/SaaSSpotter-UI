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

1. Set these in **Vercel → Settings → Environment Variables** (Production):
   - `API_URL` — AWS API Gateway URL
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
2. In **Clerk dashboard**, add `https://saas-spotter-ui.vercel.app` as an allowed domain.
3. Redeploy after adding env vars (required — old builds won't pick them up).
4. Verify API health: `curl $API_URL/health`
5. Verify proxy: `curl "https://saas-spotter-ui.vercel.app/api/v1/painpoints?page=1&page_size=5"`

If you see `MIDDLEWARE_INVOCATION_FAILED`, it is usually missing Clerk keys on Vercel or an outdated `middleware.ts` file (use `src/proxy.ts` on Next.js 16+).

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
