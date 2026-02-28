import { stops } from "@/data/stops";
import type { Route } from "@/data/types";

/**
 * Build a map from route ID to Route object for quick lookup.
 */
export function buildRouteMap(routes: Route[]): Map<string, Route> {
  const routeMap = new Map<string, Route>();
  for (const route of routes) {
    routeMap.set(route.id, route);
  }
  return routeMap;
}

/**
 * For each stop in the route (in order), find its closest waypoint index,
 * constrained so indices are monotonically non-decreasing. This prevents
 * a stop from matching a waypoint on a different segment when the road
 * geometry loops near another part of the route.
 */
export function buildStopWaypointIndices(
  waypoints: [number, number][],
  stopIds: string[],
): number[] {
  const indices: number[] = [];
  let searchFrom = 0;

  for (const stopId of stopIds) {
    const stop = stops[stopId];
    if (!stop) {
      indices.push(searchFrom);
      continue;
    }

    let bestIdx = searchFrom;
    let bestDist = Infinity;
    for (let i = searchFrom; i < waypoints.length; i++) {
      const dlat = waypoints[i][0] - stop.lat;
      const dlng = waypoints[i][1] - stop.lng;
      const dist = dlat * dlat + dlng * dlng;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    indices.push(bestIdx);
    searchFrom = bestIdx;
  }

  return indices;
}
