/**
 * Generates road-snapped waypoints for all routes using the OSRM public API.
 *
 * OSRM takes a list of coordinates and returns the actual road geometry
 * between them, so our map lines follow real streets.
 *
 * Usage: npx tsx src/scripts/generate-waypoints.ts
 */

import { routes } from "../data/routes";
import { stops } from "../data/stops";
import fs from "fs";
import path from "path";

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

interface OSRMResponse {
  code: string;
  routes: {
    geometry: {
      coordinates: [number, number][]; // [lng, lat] pairs
      type: string;
    };
  }[];
}

async function getRouteGeometry(
  coordinates: [number, number][] // [lng, lat] pairs for OSRM
): Promise<[number, number][] | null> {
  const coordString = coordinates.map(([lng, lat]) => `${lng},${lat}`).join(";");
  const url = `${OSRM_BASE}/${coordString}?overview=full&geometries=geojson`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`  OSRM returned ${response.status}`);
      return null;
    }
    const data: OSRMResponse = await response.json();
    if (data.code !== "Ok" || !data.routes[0]) {
      console.error(`  OSRM error: ${data.code}`);
      return null;
    }

    // OSRM returns [lng, lat], we need [lat, lng] for Leaflet
    return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
  } catch (err) {
    console.error(`  Fetch error:`, err);
    return null;
  }
}

async function main() {
  const waypointsMap: Record<string, [number, number][]> = {};

  for (const route of routes) {
    console.log(`Processing Route ${route.number}: ${route.name}`);

    // Build coordinate list from stops [lng, lat] for OSRM
    const coords: [number, number][] = [];
    for (const stopId of route.stopIds) {
      const stop = stops[stopId];
      if (stop) {
        coords.push([stop.lng, stop.lat]); // OSRM wants [lng, lat]
      }
    }

    if (coords.length < 2) {
      console.log(`  Skipping - not enough stops`);
      continue;
    }

    const geometry = await getRouteGeometry(coords);
    if (geometry) {
      waypointsMap[route.id] = geometry;
      console.log(`  Got ${geometry.length} waypoints`);
    } else {
      console.log(`  Failed - keeping stop-based coordinates`);
    }

    // Be polite to the public OSRM API
    await new Promise((r) => setTimeout(r, 1000));
  }

  // Write the waypoints to a separate file
  const output = `// Auto-generated road-snapped waypoints from OSRM
// Run: npx tsx src/scripts/generate-waypoints.ts

export const routeWaypoints: Record<string, [number, number][]> = ${JSON.stringify(waypointsMap, null, 2)};
`;

  const outputPath = path.resolve(__dirname, "../data/waypoints.ts");
  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`\nWaypoints written to ${outputPath}`);
  console.log(`Total routes with waypoints: ${Object.keys(waypointsMap).length}`);
}

main();
