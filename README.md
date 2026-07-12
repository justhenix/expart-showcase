# ExPart Showcase

Next.js rewrite of the original Laravel/Livewire ExPart marketplace. The app is a
portfolio showcase using deterministic demo data, real ExPart assets, Google
OAuth, and Cloudflare Workers deployment configuration.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env`, then configure Google OAuth with these redirect
URIs:

```text
http://localhost:3000/auth/google/callback
http://localhost:3001/auth/google/callback
https://expart.store/auth/google/callback
```

Use the matching origin for `AUTH_URL`. Generate `AUTH_SECRET` with at least 32
random bytes.

## Verification

```powershell
npm run check
npm run build:cloudflare
```

## Cloudflare

Production runs on the Nebula Chokeberry Cloudflare account:

- `https://expart.store`
- `https://www.expart.store`
- `https://expart-showcase.nebula-chokeberry.workers.dev`

Pushes to `main` run checks, build the OpenNext Worker, then deploy through
GitHub Actions.

```powershell
npm run preview
npm run deploy
```

## Future service boundaries

- Replace `src/data/catalog.ts` with a Turso-backed repository.
- Replace stateless showcase sessions with Turso-backed user accounts when
  persistent profiles are required.
- Add Turso-backed Exa AI quota and analysis history.
