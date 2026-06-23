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
| `NEXT_PUBLIC_API_URL` | SaaSSpotter API base URL |



## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment checklist

1. Set `NEXT_PUBLIC_API_URL` in your hosting provider (Vercel, Netlify, etc.)
2. Add your production frontend URL to the backend `cors_origins` in Terraform, then `terraform apply`
3. Verify API health: `curl $NEXT_PUBLIC_API_URL/health`
4. Verify feed: `curl "$NEXT_PUBLIC_API_URL/api/v1/painpoints?page=1&page_size=5"`

## Routes

| Route | Description |
|-------|-------------|
| `/` | Paginated pain point feed |
| `/tag/[industry_tag]` | Feed filtered by industry tag |
