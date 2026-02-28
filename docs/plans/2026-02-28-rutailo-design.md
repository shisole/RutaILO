# RutaILO - Design Document

**Date:** 2026-02-28
**Status:** Approved

## Overview

RutaILO is a web app for Iloilo City commuters that helps them navigate the jeepney system. Commuters scan a QR code at any jeep stop, and the app instantly shows which jeeps pass through, their color-coded routes, and how to transfer to reach any destination.

## MVP Flow

1. Commuter arrives at a jeep stop and scans the QR code posted there
2. Web app opens in the phone's browser (no install needed)
3. App shows: stop name, color-coded jeep routes serving it, where each route goes, and stops along the way
4. If the destination isn't on a direct route, the app suggests optimal transfers (Jeep A -> walk to Stop X -> Jeep B, etc.)

## Data Model

### Routes (25 total for Iloilo City)
- Unique color code + route number (e.g., Route 1 = Blue, "Jaro-SM City")
- Ordered list of stops
- Fare info per segment (future)

### Stops
- Unique ID + name + GPS coordinates
- List of routes serving this stop
- QR code URL: `rutailo.com/s/{stop-id}`

### Route Graph (for smart routing)
- Stops are nodes, routes are edges
- Transfer points: where routes share a stop or have walkable proximity (< 200m)
- Routing algorithm finds shortest path (fewest transfers, then fewest stops)

### QR Codes
- Generated per stop, printed and posted at physical locations
- Encode a simple URL — no app install needed

## User Interface

### Screen 1: Stop View (after QR scan)
- Header: Stop name + small map showing location
- Color-coded list of jeep routes passing through this stop
- Each route shows: color dot, route number, direction/endpoint, next major landmarks
- Tap a route to expand and see all stops on that route

### Screen 2: Route Finder
- "Where are you going?" search bar at the top
- User types a destination stop or landmark
- App calculates optimal path with step-by-step transfers
- Example:
  - You are at: Jaro Plaza
  - Take Route 3 (Blue) -> ride 5 stops -> SM City
  - Transfer to Route 12 (Green) -> ride 3 stops -> Molo Church
  - Arrive at: Molo Church

### Screen 3: All Routes (browse mode)
- Full list of all 25 routes with their colors
- Tap any route to see its full stop list and a static map trace

### Design Principles
- Mobile-first responsive web (QR scan = phone browser)
- Fast load time — minimal JS
- High contrast colors for readability in sunlight
- English UI

## Tech Stack

### Frontend (MVP Web App)
- Next.js (static export / SSG) — fast page loads, SEO-friendly
- Tailwind CSS — rapid UI development, responsive
- Leaflet + OpenStreetMap tiles for static route map views

### Backend / Data
- Route and stop data stored as static JSON files (~50KB for 25 routes)
- Routing algorithm runs client-side in the browser (graph traversal)
- No database needed for MVP — all data is static/pre-computed
- QR codes generated as part of the build process

### Hosting
- Vercel (free tier) — perfect for Next.js, instant deploys
- Custom domain: rutailo.com

### Offline Support
- Service Worker caches the entire app and route data after first visit
- First scan: loads from network, caches everything
- Subsequent visits: works fully offline (routing, stop lookup, everything)
- PWA manifest for "Add to Home Screen" capability

## MVP Scope

### In Scope
- QR scan -> Stop View with color-coded routes
- Route Finder with smart multi-transfer routing (unlimited transfers)
- Browse all 25 routes
- Static route maps per route
- Mobile-responsive web app
- QR code generation for all stops
- English UI only
- Offline mode via Service Worker (PWA)

### Out of Scope (Future)
- Ilonggo language support
- Real-time jeep tracking / GPS
- Fare calculator
- User accounts / saved routes
- Native mobile app (React Native / Expo)
- Driver/operator portal
- Live schedule / wait times

## Architecture Decision: Custom vs OpenTripPlanner

Chose custom lightweight routing over OpenTripPlanner (OTP) because:
- 25 routes is small enough for a simple graph-based algorithm
- Zero server costs (runs client-side)
- No dependency on Java backend (OTP requirement)
- Can migrate to OTP later if Iloilo transit expands significantly

## References
- Sakay.ph — similar architecture for Metro Manila transit
- Iloilo ELPTRP — official 25-route system
- OpenTripPlanner — potential future upgrade path
