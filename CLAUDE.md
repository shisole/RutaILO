# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Code Rules

- **No `as` type assertions in components.** Use explicit type annotations instead of `as` casts. Enforced by ESLint in `src/components/`.
- **Dynamic imports — use `next/dynamic` only when justified.** Apply for: (1) components with heavy third-party deps like Leaflet maps; (2) components behind user interaction (modals, drawers); (3) components requiring `ssr: false` (browser-only APIs like Leaflet).
- **Import ordering.** ESLint enforces strict alphabetical imports with group separation (builtin > external > internal > parent > sibling > index), with newlines between groups. Use inline type imports: `import { type X }` (not `import type { X }`).
- **Prettier.** Print width is 100 (not default 80). Double quotes, semicolons, trailing commas everywhere.

## Branch Workflow

Before making any code changes, check the current branch. If on `main`, create a new descriptive branch:

```bash
git checkout -b <type>/<short-description>
```

Use these prefixes: `feat/`, `fix/`, `refactor/`, `chore/`, `docs/`. Keep the description short and kebab-cased. Do NOT commit directly to `main`.

## Commands

```bash
npm run dev              # Start dev server (Next.js, port 3003)
npm run build            # Production build (static export)
npm run lint             # ESLint
npm run typecheck        # TypeScript type checking (tsc --noEmit)
npm run format           # Prettier — format all files
npm run format:check     # Prettier — check formatting
npm run test             # Run Vitest tests
npm run generate-qr      # Generate QR code PNGs for all stops
npm run generate-waypoints  # Regenerate OSRM road-snapped waypoints
```

## Architecture

**RutaILO** is an Iloilo City jeepney commuter web app built on **Next.js 16 (App Router)** + **React 19** + **Tailwind CSS v4** as a static PWA. No backend/database — all data is static JSON.

### Pages

- `/` — Home page with RutaILO branding and navigation
- `/find` — Route Finder with stop search and smart routing
- `/routes` — Browse all 25 jeepney routes
- `/map` — Full interactive Leaflet map with all routes and legend
- `/s/[stopId]` — Stop View (QR landing) showing routes at a stop

### Data Layer

All data is static — no database. Key files:

- `src/data/types.ts` — TypeScript interfaces (Stop, Route, TransferStep, RoutePlan)
- `src/data/routes.ts` — 25 Iloilo ELPTRP jeepney routes with color codes
- `src/data/stops.ts` — 46 stops with GPS coordinates
- `src/data/waypoints.ts` — OSRM road-snapped route geometry (auto-generated, do not hand-edit)

### Routing Algorithm

`src/lib/router.ts` — BFS algorithm that finds optimal jeepney routes between any two stops with unlimited transfers. Runs client-side in the browser. Optimizes for fewest transfers first, then fewest stops.

### Map

Leaflet + OpenStreetMap tiles. Maps use dynamic `import("leaflet")` to avoid SSR issues. Two map components:

- `src/components/RouteMap.tsx` — Static preview map (used on stop pages)
- `src/app/map/page.tsx` — Full interactive map with route filtering

Both use `src/data/waypoints.ts` for road-snapped polylines.

### PWA / Offline

- `public/manifest.json` — PWA manifest
- `public/sw.js` — Service Worker with cache-first strategy
- Works fully offline after first visit

### QR Codes

Each stop has a QR code that encodes `https://rutailo.com/s/{stopId}`. Generated via `npm run generate-qr` into `public/qr/`. These are gitignored (regenerate as needed).

### Path Aliases

- `@/*` → `./src/*`

### Styling

Tailwind CSS v4 (configured via CSS, not tailwind.config). Mobile-first responsive design optimized for phone browsers (QR scan entry point).
