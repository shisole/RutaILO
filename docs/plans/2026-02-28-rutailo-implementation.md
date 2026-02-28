# RutaILO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a PWA web app that helps Iloilo City commuters navigate 25 jeepney routes via QR code scanning, color-coded route display, and smart multi-transfer routing.

**Architecture:** Next.js static site with client-side routing algorithm. All 25 routes and stops stored as static JSON (~50KB). Leaflet + OpenStreetMap for map views. Service Worker for offline support. No backend/database — everything runs in the browser.

**Tech Stack:** Next.js 14 (App Router, static export), Tailwind CSS, Leaflet, TypeScript, Vitest for testing, `next-pwa` for Service Worker, `qrcode` library for QR generation.

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `vitest.config.ts`

**Step 1: Initialize Next.js project**

Run:
```bash
cd /Users/stephenkarljeoffreyhisole/Documents/project/claude-apps/RutaILO
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Project scaffolded with Next.js, TypeScript, Tailwind, App Router, `src/` directory.

**Step 2: Install additional dependencies**

Run:
```bash
cd /Users/stephenkarljeoffreyhisole/Documents/project/claude-apps/RutaILO
npm install leaflet react-leaflet qrcode
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/leaflet @types/qrcode
```

**Step 3: Configure Vitest**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `src/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

**Step 4: Configure static export in `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Step 5: Verify setup**

Run: `npm run dev`
Expected: App runs at `http://localhost:3000` with default Next.js page.

Run: `npx vitest run`
Expected: No tests found (clean slate).

**Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js project with Tailwind, Vitest, Leaflet"
```

---

## Task 2: Route & Stop Data Model

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/routes.ts`
- Create: `src/data/stops.ts`
- Create: `src/data/__tests__/data.test.ts`

**Step 1: Write the failing test**

Create `src/data/__tests__/data.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import type { Route, Stop } from "@/data/types";

describe("Route data", () => {
  it("has 25 routes", () => {
    expect(routes).toHaveLength(25);
  });

  it("each route has required fields", () => {
    routes.forEach((route: Route) => {
      expect(route.id).toBeDefined();
      expect(route.number).toBeGreaterThanOrEqual(1);
      expect(route.number).toBeLessThanOrEqual(25);
      expect(route.name).toBeTruthy();
      expect(route.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(route.stopIds.length).toBeGreaterThan(0);
    });
  });

  it("each route has a unique color", () => {
    const colors = routes.map((r: Route) => r.color);
    expect(new Set(colors).size).toBe(colors.length);
  });
});

describe("Stop data", () => {
  it("has stops defined", () => {
    expect(Object.keys(stops).length).toBeGreaterThan(0);
  });

  it("each stop has required fields", () => {
    Object.values(stops).forEach((stop: Stop) => {
      expect(stop.id).toBeTruthy();
      expect(stop.name).toBeTruthy();
      expect(stop.lat).toBeGreaterThan(10); // Iloilo is ~10.7°N
      expect(stop.lat).toBeLessThan(11);
      expect(stop.lng).toBeGreaterThan(122); // Iloilo is ~122.5°E
      expect(stop.lng).toBeLessThan(123);
    });
  });

  it("all route stopIds reference existing stops", () => {
    routes.forEach((route: Route) => {
      route.stopIds.forEach((stopId: string) => {
        expect(stops[stopId]).toBeDefined();
      });
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/__tests__/data.test.ts`
Expected: FAIL — modules not found.

**Step 3: Create the type definitions**

Create `src/data/types.ts`:
```ts
export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  number: number;
  name: string;
  color: string; // hex color e.g. "#3B82F6"
  stopIds: string[]; // ordered list of stop IDs along the route
}

export interface TransferStep {
  type: "ride" | "walk";
  routeId?: string; // only for "ride" steps
  fromStopId: string;
  toStopId: string;
  stopCount?: number; // number of stops for "ride"
}

export interface RoutePlan {
  steps: TransferStep[];
  totalTransfers: number;
  totalStops: number;
}
```

**Step 4: Create sample route data (3 routes for now, expand to 25 later)**

Create `src/data/routes.ts` with all 25 routes. Each route uses real Iloilo route names. Use placeholder stops with approximate GPS coordinates for now — the exact stops can be refined with real ELPTRP data later.

The 25 Iloilo City ELPTRP routes are:
1. Bo. Obrero-Lapuz to City Proper Loop
2. Villa Plaza to City Proper via Calumpang
3. Ungka to City Proper via CPU
4. Ungka to City Proper via Aquino Ave / Festive Walk
5. Festive Walk to City Proper via SM City
6. Lanit to Infante via SM City
7. Compania to City Proper Loop
8. Parola to SM City via Infante Loop
9. Mohon to City Proper
10. Buntatala/Tagbak to City Proper
11. Ticud La Paz to City Proper
12. Mandurriao to City Proper via Festive Walk
13. Hibao-an to City Proper via Tabucan
14. Hibao-an to Jaro via Festive Walk
15. Molo to City Proper via Baluarte Loop
16. Bito-on to Jaro via Balabago Loop
17. Villa Baybay to City Proper
18. Buntatala/Tagbak to City Proper via Lapuz
19. Bito-on to City Proper via La Paz
20. Mohon to ISATU via Sooc / Festive Walk
21. Buntatala/Tagbak to Festive Walk via SM City
22. Ungka to La Paz via CPU / ISATU Loop
23. Mohon to Mandurriao Business District
24. La Paz to Festive Walk via Nabitasan Loop
25. Molo to City Proper via Gen. Luna

Start with 25 routes, each with 5-8 representative stops using real Iloilo landmarks/intersections. GPS coordinates should be approximate but within Iloilo City bounds (lat: 10.67-10.75, lng: 122.5-122.6).

Create `src/data/stops.ts` as a record keyed by stop ID. Stops shared by multiple routes use the same ID (this enables transfer detection).

**Step 5: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/data.test.ts`
Expected: ALL PASS

**Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add route and stop data model with 25 Iloilo jeepney routes"
```

---

## Task 3: Routing Algorithm

**Files:**
- Create: `src/lib/router.ts`
- Create: `src/lib/__tests__/router.test.ts`

**Step 1: Write the failing tests**

Create `src/lib/__tests__/router.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { findRoute } from "@/lib/router";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";

describe("findRoute", () => {
  it("returns null when origin equals destination", () => {
    const result = findRoute("city-proper", "city-proper", routes, stops);
    expect(result).toBeNull();
  });

  it("finds a direct route (no transfers)", () => {
    // Find two stops that share a route in actual data
    const route = routes[0];
    const origin = route.stopIds[0];
    const dest = route.stopIds[route.stopIds.length - 1];

    const result = findRoute(origin, dest, routes, stops);
    expect(result).not.toBeNull();
    expect(result!.totalTransfers).toBe(0);
    expect(result!.steps).toHaveLength(1);
    expect(result!.steps[0].type).toBe("ride");
  });

  it("finds a route with one transfer", () => {
    // Find two stops that DON'T share a direct route but can connect via transfer
    // Use routes that share a common stop (transfer point)
    const route1 = routes[0];
    const route2 = routes.find(
      (r) =>
        r.id !== route1.id &&
        r.stopIds.some((s) => route1.stopIds.includes(s)) // shares at least one stop
    );

    if (!route2) {
      // Skip if no overlapping routes exist in test data
      return;
    }

    const origin = route1.stopIds[0];
    // Find a stop on route2 that is NOT on route1
    const dest = route2.stopIds.find((s) => !route1.stopIds.includes(s));
    if (!dest) return;

    const result = findRoute(origin, dest, routes, stops);
    expect(result).not.toBeNull();
    expect(result!.totalTransfers).toBeGreaterThanOrEqual(1);
    expect(result!.steps.length).toBeGreaterThanOrEqual(2);
  });

  it("returns null for unreachable stops", () => {
    const result = findRoute("nonexistent-stop", "city-proper", routes, stops);
    expect(result).toBeNull();
  });

  it("prefers fewer transfers over fewer stops", () => {
    // A direct route with more stops should be preferred over
    // a shorter path with transfers
    const route = routes[0];
    if (route.stopIds.length < 3) return;

    const origin = route.stopIds[0];
    const dest = route.stopIds[route.stopIds.length - 1];

    const result = findRoute(origin, dest, routes, stops);
    expect(result).not.toBeNull();
    expect(result!.totalTransfers).toBe(0); // direct is always preferred
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/router.test.ts`
Expected: FAIL — `findRoute` not found.

**Step 3: Implement the routing algorithm**

Create `src/lib/router.ts`:

The algorithm uses BFS (breadth-first search) on a route-stop graph:
1. Build an adjacency map: for each stop, list all routes serving it
2. BFS from origin stop, exploring reachable stops via each route
3. Priority: minimize transfers first, then minimize total stops
4. Returns `RoutePlan` with step-by-step transfer instructions

```ts
import type { Route, Stop, RoutePlan, TransferStep } from "@/data/types";

interface BFSNode {
  stopId: string;
  routeId: string | null; // route taken to get here
  transfers: number;
  totalStops: number;
  path: TransferStep[];
}

export function findRoute(
  originId: string,
  destId: string,
  routes: Route[],
  stops: Record<string, Stop>
): RoutePlan | null {
  if (originId === destId) return null;
  if (!stops[originId] || !stops[destId]) return null;

  // Build stop -> routes map
  const stopRoutes: Record<string, Route[]> = {};
  for (const route of routes) {
    for (const stopId of route.stopIds) {
      if (!stopRoutes[stopId]) stopRoutes[stopId] = [];
      stopRoutes[stopId].push(route);
    }
  }

  if (!stopRoutes[originId]) return null;

  // BFS
  const queue: BFSNode[] = [];
  const visited = new Set<string>(); // "stopId:routeId" to avoid cycles

  // Seed: all routes from origin
  for (const route of stopRoutes[originId] || []) {
    const key = `${originId}:${route.id}`;
    visited.add(key);
    queue.push({
      stopId: originId,
      routeId: route.id,
      transfers: 0,
      totalStops: 0,
      path: [],
    });
  }

  while (queue.length > 0) {
    // Sort by transfers first, then total stops (priority queue)
    queue.sort(
      (a, b) => a.transfers - b.transfers || a.totalStops - b.totalStops
    );
    const node = queue.shift()!;

    if (!node.routeId) continue;

    const route = routes.find((r) => r.id === node.routeId)!;
    const currentIdx = route.stopIds.indexOf(node.stopId);

    // Travel along this route in both directions
    for (const direction of [1, -1] as const) {
      for (
        let i = currentIdx + direction;
        i >= 0 && i < route.stopIds.length;
        i += direction
      ) {
        const nextStopId = route.stopIds[i];
        const stopsRidden = Math.abs(i - currentIdx);

        // Build the current step
        const rideStep: TransferStep = {
          type: "ride",
          routeId: route.id,
          fromStopId: node.path.length === 0 ? node.stopId : node.stopId,
          toStopId: nextStopId,
          stopCount: stopsRidden,
        };

        // Reconstruct path: keep existing path, update last ride or add new
        const newPath = [...node.path];
        if (
          newPath.length > 0 &&
          newPath[newPath.length - 1].routeId === route.id
        ) {
          // Extend the last ride step
          newPath[newPath.length - 1] = {
            ...newPath[newPath.length - 1],
            toStopId: nextStopId,
            stopCount:
              (newPath[newPath.length - 1].stopCount || 0) + 1,
          };
        } else {
          // Start a new ride on this route
          const fromStop =
            newPath.length > 0
              ? newPath[newPath.length - 1].toStopId
              : node.stopId;
          newPath.push({
            type: "ride",
            routeId: route.id,
            fromStopId: fromStop,
            toStopId: nextStopId,
            stopCount: stopsRidden,
          });
        }

        // Check if we reached destination
        if (nextStopId === destId) {
          return {
            steps: newPath,
            totalTransfers: node.transfers,
            totalStops: node.totalStops + stopsRidden,
          };
        }

        // Explore transfers at this stop
        for (const transferRoute of stopRoutes[nextStopId] || []) {
          if (transferRoute.id === route.id) continue;
          const key = `${nextStopId}:${transferRoute.id}`;
          if (visited.has(key)) continue;
          visited.add(key);

          queue.push({
            stopId: nextStopId,
            routeId: transferRoute.id,
            transfers: node.transfers + 1,
            totalStops: node.totalStops + stopsRidden,
            path: [...newPath],
          });
        }
      }
    }
  }

  return null;
}
```

Note: This is the initial implementation. The executing engineer should verify the BFS logic handles edge cases correctly and refine as tests reveal issues. The core idea: BFS explores routes from origin, at each intermediate stop checks if a transfer to another route can reach the destination. Sorts by (transfers, totalStops) to prefer direct routes.

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/router.test.ts`
Expected: ALL PASS

**Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: add BFS routing algorithm with transfer optimization"
```

---

## Task 4: Stop View Page (QR Landing)

**Files:**
- Create: `src/app/s/[stopId]/page.tsx`
- Create: `src/app/s/[stopId]/__tests__/StopPage.test.tsx`
- Create: `src/components/RouteCard.tsx`
- Create: `src/components/__tests__/RouteCard.test.tsx`

This is the most important page — what commuters see after scanning a QR code.

**Step 1: Write the failing test for RouteCard component**

Create `src/components/__tests__/RouteCard.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouteCard } from "@/components/RouteCard";

const mockRoute = {
  id: "route-1",
  number: 1,
  name: "Bo. Obrero-Lapuz to City Proper Loop",
  color: "#3B82F6",
  stopIds: ["bo-obrero", "lapuz", "city-proper"],
};

describe("RouteCard", () => {
  it("renders route number and name", () => {
    render(<RouteCard route={mockRoute} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(
      screen.getByText("Bo. Obrero-Lapuz to City Proper Loop")
    ).toBeInTheDocument();
  });

  it("displays the route color indicator", () => {
    render(<RouteCard route={mockRoute} />);
    const colorDot = screen.getByTestId("route-color");
    expect(colorDot).toHaveStyle({ backgroundColor: "#3B82F6" });
  });

  it("shows stop count", () => {
    render(<RouteCard route={mockRoute} />);
    expect(screen.getByText(/3 stops/)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/__tests__/RouteCard.test.tsx`
Expected: FAIL

**Step 3: Implement RouteCard**

Create `src/components/RouteCard.tsx`:
```tsx
"use client";

import { useState } from "react";
import type { Route } from "@/data/types";
import { stops } from "@/data/stops";

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      className="w-full text-left border rounded-xl p-4 mb-3 shadow-sm active:bg-gray-50 transition"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3">
        <div
          data-testid="route-color"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: route.color }}
        >
          {route.number}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{route.name}</p>
          <p className="text-sm text-gray-500">{route.stopIds.length} stops</p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t">
          <ol className="space-y-1">
            {route.stopIds.map((stopId, i) => (
              <li key={stopId} className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-medium"
                  style={{ borderColor: route.color, color: route.color }}>
                  {i + 1}
                </span>
                <span className="text-gray-700">{stops[stopId]?.name ?? stopId}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </button>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/__tests__/RouteCard.test.tsx`
Expected: ALL PASS

**Step 5: Create the Stop page**

Create `src/app/s/[stopId]/page.tsx`:
```tsx
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import { RouteCard } from "@/components/RouteCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface StopPageProps {
  params: Promise<{ stopId: string }>;
}

export function generateStaticParams() {
  return Object.keys(stops).map((stopId) => ({ stopId }));
}

export default async function StopPage({ params }: StopPageProps) {
  const { stopId } = await params;
  const stop = stops[stopId];

  if (!stop) {
    notFound();
  }

  const servingRoutes = routes.filter((r) => r.stopIds.includes(stopId));

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-5">
        <Link href="/" className="text-sm text-blue-600 mb-2 block">
          &larr; RutaILO
        </Link>
        <h1 className="text-xl font-bold text-gray-900">{stop.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {servingRoutes.length} route{servingRoutes.length !== 1 ? "s" : ""} pass through here
        </p>
      </header>

      <section className="p-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Jeepney Routes
        </h2>
        {servingRoutes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </section>

      <section className="p-4 pt-0">
        <Link
          href={`/find?from=${stopId}`}
          className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-xl shadow active:bg-blue-700 transition"
        >
          Where are you going?
        </Link>
      </section>
    </main>
  );
}
```

**Step 6: Verify the page renders**

Run: `npm run build`
Expected: Static pages generated for each stop at `/s/[stopId]`.

Run: `npm run dev` and visit `http://localhost:3000/s/city-proper` (or any valid stop ID from your data).
Expected: Stop page shows with route cards.

**Step 7: Commit**

```bash
git add src/components/ src/app/s/
git commit -m "feat: add Stop View page with color-coded RouteCard components"
```

---

## Task 5: Route Finder Page

**Files:**
- Create: `src/app/find/page.tsx`
- Create: `src/components/RoutePlanView.tsx`
- Create: `src/components/StopSearch.tsx`
- Create: `src/components/__tests__/RoutePlanView.test.tsx`

**Step 1: Write the failing test for RoutePlanView**

Create `src/components/__tests__/RoutePlanView.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoutePlanView } from "@/components/RoutePlanView";
import type { RoutePlan } from "@/data/types";

const mockPlan: RoutePlan = {
  steps: [
    {
      type: "ride",
      routeId: "route-3",
      fromStopId: "jaro-plaza",
      toStopId: "sm-city",
      stopCount: 5,
    },
    {
      type: "ride",
      routeId: "route-12",
      fromStopId: "sm-city",
      toStopId: "molo-church",
      stopCount: 3,
    },
  ],
  totalTransfers: 1,
  totalStops: 8,
};

describe("RoutePlanView", () => {
  it("renders each step of the plan", () => {
    render(<RoutePlanView plan={mockPlan} />);
    expect(screen.getByText(/5 stops/)).toBeInTheDocument();
    expect(screen.getByText(/3 stops/)).toBeInTheDocument();
  });

  it("shows transfer count", () => {
    render(<RoutePlanView plan={mockPlan} />);
    expect(screen.getByText(/1 transfer/)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/__tests__/RoutePlanView.test.tsx`
Expected: FAIL

**Step 3: Implement RoutePlanView**

Create `src/components/RoutePlanView.tsx`:
```tsx
import type { RoutePlan } from "@/data/types";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";

interface RoutePlanViewProps {
  plan: RoutePlan;
}

export function RoutePlanView({ plan }: RoutePlanViewProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <span>{plan.totalStops} stops</span>
        <span>&middot;</span>
        <span>
          {plan.totalTransfers} transfer{plan.totalTransfers !== 1 ? "s" : ""}
        </span>
      </div>

      <ol className="space-y-4">
        {plan.steps.map((step, i) => {
          if (step.type === "ride") {
            const route = routes.find((r) => r.id === step.routeId);
            const fromStop = stops[step.fromStopId];
            const toStop = stops[step.toStopId];

            return (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: route?.color ?? "#6B7280" }}
                  >
                    {route?.number}
                  </div>
                  {i < plan.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-semibold text-gray-900">
                    Route {route?.number} ({route?.name})
                  </p>
                  <p className="text-sm text-gray-600">
                    {fromStop?.name} &rarr; {toStop?.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {step.stopCount} stops
                  </p>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ol>
    </div>
  );
}
```

**Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/__tests__/RoutePlanView.test.tsx`
Expected: ALL PASS

**Step 5: Create StopSearch component**

Create `src/components/StopSearch.tsx`:
```tsx
"use client";

import { useState, useMemo } from "react";
import { stops } from "@/data/stops";

interface StopSearchProps {
  placeholder?: string;
  onSelect: (stopId: string) => void;
  value?: string;
}

export function StopSearch({ placeholder = "Search for a stop...", onSelect, value }: StopSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const allStops = useMemo(() => Object.values(stops), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allStops.slice(0, 10);
    const lower = query.toLowerCase();
    return allStops.filter((s) => s.name.toLowerCase().includes(lower)).slice(0, 10);
  }, [query, allStops]);

  const selectedStop = value ? stops[value] : null;

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={selectedStop ? selectedStop.name : placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-xl mt-1 shadow-lg max-h-60 overflow-y-auto">
          {filtered.map((stop) => (
            <li key={stop.id}>
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 active:bg-gray-100 text-sm"
                onClick={() => {
                  onSelect(stop.id);
                  setQuery("");
                  setIsOpen(false);
                }}
              >
                {stop.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Step 6: Create the Route Finder page**

Create `src/app/find/page.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { StopSearch } from "@/components/StopSearch";
import { RoutePlanView } from "@/components/RoutePlanView";
import { findRoute } from "@/lib/router";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import type { RoutePlan } from "@/data/types";
import Link from "next/link";

function FindContent() {
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get("from") ?? "";

  const [fromStopId, setFromStopId] = useState(initialFrom);
  const [toStopId, setToStopId] = useState("");
  const [plan, setPlan] = useState<RoutePlan | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!fromStopId || !toStopId) return;
    const result = findRoute(fromStopId, toStopId, routes, stops);
    setPlan(result);
    setSearched(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-5">
        <Link href="/" className="text-sm text-blue-600 mb-2 block">
          &larr; RutaILO
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Route Finder</h1>
      </header>

      <section className="p-4 space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">From</label>
          <StopSearch
            placeholder="Where are you?"
            onSelect={setFromStopId}
            value={fromStopId}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">To</label>
          <StopSearch
            placeholder="Where are you going?"
            onSelect={setToStopId}
            value={toStopId}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!fromStopId || !toStopId}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow active:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find Route
        </button>
      </section>

      {searched && (
        <section className="p-4">
          {plan ? (
            <RoutePlanView plan={plan} />
          ) : (
            <div className="bg-white rounded-xl border p-6 text-center text-gray-500">
              No route found between these stops.
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default function FindPage() {
  return (
    <Suspense>
      <FindContent />
    </Suspense>
  );
}
```

**Step 7: Verify the page works**

Run: `npm run dev` and visit `http://localhost:3000/find`
Expected: Two search inputs, select stops, click "Find Route", see the plan.

**Step 8: Commit**

```bash
git add src/components/StopSearch.tsx src/components/RoutePlanView.tsx src/components/__tests__/ src/app/find/
git commit -m "feat: add Route Finder page with stop search and plan display"
```

---

## Task 6: All Routes Browse Page

**Files:**
- Create: `src/app/routes/page.tsx`

**Step 1: Create the All Routes page**

Create `src/app/routes/page.tsx`:
```tsx
import { routes } from "@/data/routes";
import { RouteCard } from "@/components/RouteCard";
import Link from "next/link";

export default function RoutesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-5">
        <Link href="/" className="text-sm text-blue-600 mb-2 block">
          &larr; RutaILO
        </Link>
        <h1 className="text-xl font-bold text-gray-900">All Routes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {routes.length} jeepney routes in Iloilo City
        </p>
      </header>

      <section className="p-4">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </section>
    </main>
  );
}
```

**Step 2: Verify it renders**

Run: `npm run dev` and visit `http://localhost:3000/routes`
Expected: All 25 routes listed with color indicators.

**Step 3: Commit**

```bash
git add src/app/routes/
git commit -m "feat: add All Routes browse page"
```

---

## Task 7: Home Page & Navigation

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Update the home page**

Replace `src/app/page.tsx` with a landing page that has:
- RutaILO branding/logo (text-based for MVP)
- "Find Route" CTA button → links to `/find`
- "Browse All Routes" button → links to `/routes`
- Brief explainer text: "Scan a QR code at any jeep stop, or search for your route below."

**Step 2: Update layout.tsx**

Update `src/app/layout.tsx` to include:
- PWA meta tags (viewport, theme-color, apple-mobile-web-app-capable)
- Title: "RutaILO — Iloilo Jeepney Routes"
- Description meta tag

**Step 3: Verify navigation flow**

Run: `npm run dev`
Expected: Home → Find Route → results. Home → All Routes → expand cards. All back links work.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: add home page with navigation to route finder and browse"
```

---

## Task 8: Leaflet Map Component

**Files:**
- Create: `src/components/RouteMap.tsx`
- Modify: `src/app/s/[stopId]/page.tsx` (add map)
- Modify: `src/app/routes/page.tsx` (add map to expanded route)

**Step 1: Create the RouteMap component**

Create `src/components/RouteMap.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import type { Route } from "@/data/types";
import { stops } from "@/data/stops";

interface RouteMapProps {
  routesToShow: Route[];
  highlightStopId?: string;
  height?: string;
}

export function RouteMap({
  routesToShow,
  highlightStopId,
  height = "200px",
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with Leaflet
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      if (!mapRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      const allCoords: [number, number][] = [];

      routesToShow.forEach((route) => {
        const coords: [number, number][] = route.stopIds
          .map((id) => stops[id])
          .filter(Boolean)
          .map((s) => [s.lat, s.lng]);

        if (coords.length > 0) {
          L.polyline(coords, { color: route.color, weight: 3, opacity: 0.8 }).addTo(map);
          allCoords.push(...coords);
        }
      });

      if (highlightStopId && stops[highlightStopId]) {
        const s = stops[highlightStopId];
        L.circleMarker([s.lat, s.lng], {
          radius: 8,
          color: "#EF4444",
          fillColor: "#EF4444",
          fillOpacity: 1,
        }).addTo(map);
      }

      if (allCoords.length > 0) {
        map.fitBounds(L.latLngBounds(allCoords), { padding: [20, 20] });
      }
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [routesToShow, highlightStopId]);

  return <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-xl" />;
}
```

**Step 2: Add map to Stop View page**

Modify `src/app/s/[stopId]/page.tsx` to import and render `<RouteMap>` in the header area, showing the stop location and all serving routes.

**Step 3: Verify maps render**

Run: `npm run dev` and visit a stop page.
Expected: Small map shows the stop with route lines drawn through it.

**Step 4: Commit**

```bash
git add src/components/RouteMap.tsx src/app/s/ src/app/routes/
git commit -m "feat: add Leaflet route map component to stop and route views"
```

---

## Task 9: QR Code Generation

**Files:**
- Create: `src/scripts/generate-qr.ts`
- Create: `public/qr/` (output directory)

**Step 1: Create QR generation script**

Create `src/scripts/generate-qr.ts`:

This script iterates through all stops and generates a QR code PNG for each one. Each QR encodes the URL `https://rutailo.com/s/{stopId}`. Output goes to `public/qr/{stopId}.png`.

Use the `qrcode` npm package:
```ts
import QRCode from "qrcode";
import { stops } from "../data/stops";
import fs from "fs";
import path from "path";

const BASE_URL = "https://rutailo.com";
const OUTPUT_DIR = path.resolve(__dirname, "../../public/qr");

async function generateAll() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const stop of Object.values(stops)) {
    const url = `${BASE_URL}/s/${stop.id}`;
    const filePath = path.join(OUTPUT_DIR, `${stop.id}.png`);
    await QRCode.toFile(filePath, url, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    });
    console.log(`Generated: ${filePath}`);
  }

  console.log(`Done. ${Object.keys(stops).length} QR codes generated.`);
}

generateAll();
```

**Step 2: Add script to package.json**

Add to `package.json` scripts: `"generate-qr": "npx tsx src/scripts/generate-qr.ts"`

**Step 3: Run the script**

Run: `npm run generate-qr`
Expected: QR code PNGs generated in `public/qr/` for every stop.

**Step 4: Commit**

```bash
git add src/scripts/ public/qr/ package.json
git commit -m "feat: add QR code generation script for all stops"
```

---

## Task 10: PWA / Offline Support

**Files:**
- Create: `public/manifest.json`
- Modify: `src/app/layout.tsx` (add manifest link)
- Create: `public/sw.js` (service worker)

**Step 1: Create PWA manifest**

Create `public/manifest.json`:
```json
{
  "name": "RutaILO",
  "short_name": "RutaILO",
  "description": "Iloilo City Jeepney Route Finder",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F9FAFB",
  "theme_color": "#2563EB",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Step 2: Create a basic Service Worker**

Create `public/sw.js` that uses a cache-first strategy:
- On install: pre-cache the app shell and route data JSON
- On fetch: serve from cache if available, fall back to network
- On activate: clean old caches

**Step 3: Register the Service Worker in layout.tsx**

Add a `<script>` tag or a client component to register `sw.js` on page load.

**Step 4: Add manifest link to layout.tsx**

Add `<link rel="manifest" href="/manifest.json" />` and theme-color meta tag.

**Step 5: Create placeholder icons**

Create simple 192x192 and 512x512 PNG icons (can be placeholder colored squares with "R" text for MVP).

**Step 6: Test offline mode**

Run: `npm run build && npx serve out`
Visit the app, then toggle airplane mode in browser DevTools.
Expected: App still loads and routing works offline.

**Step 7: Commit**

```bash
git add public/manifest.json public/sw.js public/icon-*.png src/app/layout.tsx
git commit -m "feat: add PWA manifest and service worker for offline support"
```

---

## Task 11: Final Polish & Build Verification

**Files:**
- Modify: Various files for styling refinements

**Step 1: Run all tests**

Run: `npx vitest run`
Expected: ALL PASS

**Step 2: Run production build**

Run: `npm run build`
Expected: Static export succeeds with all pages generated.

**Step 3: Test the full flow**

Run: `npx serve out`
1. Visit home page → navigation works
2. Visit `/s/{stopId}` → stop view renders with routes and map
3. Visit `/find` → search works, routing returns results
4. Visit `/routes` → all 25 routes displayed
5. Test offline: disconnect network → app still works

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final polish and build verification for RutaILO MVP"
```

---

## Task Summary

| Task | Description | Estimated Complexity |
|------|-------------|---------------------|
| 1 | Project scaffolding | Low |
| 2 | Route & stop data model (25 routes) | Medium |
| 3 | BFS routing algorithm | High |
| 4 | Stop View page (QR landing) | Medium |
| 5 | Route Finder page | Medium |
| 6 | All Routes browse page | Low |
| 7 | Home page & navigation | Low |
| 8 | Leaflet map component | Medium |
| 9 | QR code generation script | Low |
| 10 | PWA / offline support | Medium |
| 11 | Final polish & build verification | Low |

**Dependencies:** Task 1 must complete first. Tasks 2 and 3 are sequential (3 depends on 2). Tasks 4-8 depend on tasks 2+3. Tasks 9-10 can be done in parallel with 4-8. Task 11 is last.
