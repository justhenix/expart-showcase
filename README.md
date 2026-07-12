# ExPart

Modern Next.js rewrite of ExPart, an Indonesian marketplace for discovering,
comparing, and validating products before purchase.

**Live site:** [expart.store](https://expart.store)

## Features

- Product discovery, categories, search, and detail pages
- Exa AI quick scans and deeper product analysis
- Price, rating, specification, and seller comparisons
- Community content and account flows
- Responsive light and dark themes
- Google OAuth support
- Daily AI usage limits
- Cloudflare Workers deployment through OpenNext

The public showcase currently uses deterministic catalog data while preserving
the original ExPart interface and core user journeys.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Google Gemini
- OpenNext for Cloudflare
- Cloudflare Workers

## Local development

Requirements:

- Node.js 22
- npm

```powershell
git clone https://github.com/justhenix/expart-showcase.git
Set-Location expart-showcase
npm install
Copy-Item .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Most showcase pages work without external credentials. Add the relevant values
to `.env` to test Google sign-in, Gemini analysis, or Turso-backed features.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Public application URL |
| `AUTH_URL` | Authentication origin |
| `AUTH_SECRET` | Session-signing secret |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `GEMINI_API_KEY` | Gemini API key for Exa AI |
| `GEMINI_MODEL_QUICK` | Model used for quick scans |
| `GEMINI_MODEL_DEEP` | Model used for deep analysis |
| `EXPART_LIMIT_FREE_QUICK` | Daily quick-scan allowance |
| `EXPART_LIMIT_FREE_DEEP` | Daily deep-analysis allowance |
| `TURSO_DATABASE_URL` | Turso database URL |
| `TURSO_AUTH_TOKEN` | Turso authentication token |

For Google OAuth, register:

```text
http://localhost:3000/auth/google/callback
https://expart.store/auth/google/callback
```

Generate a strong, unique `AUTH_SECRET`; never commit real credentials.

## Quality checks

```powershell
npm run check
npm run build:cloudflare
```

## Deployment

Pushes to `main` run linting, type checks, an OpenNext build, then deploy to
Cloudflare Workers through GitHub Actions.

For a manual preview or deployment:

```powershell
npm run preview
npm run deploy
```

Cloudflare credentials and production secrets must be configured outside the
repository.

## Project status

This repository is a portfolio showcase and modernization of the original
Laravel/Livewire application. Production database persistence and supporting
infrastructure remain separate deployment concerns.
