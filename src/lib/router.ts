import type { Route, Stop, RoutePlan, TransferStep } from "@/data/types";

/**
 * BFS node representing a state in the route search.
 */
interface BFSNode {
  stopId: string;
  routeId: string;
  transfers: number;
  totalStops: number;
  steps: TransferStep[];
}

/**
 * Build a map from stop ID to the set of route IDs that serve that stop.
 */
function buildStopRoutesMap(routes: Route[]): Map<string, Set<string>> {
  const stopRoutes = new Map<string, Set<string>>();
  for (const route of routes) {
    for (const stopId of route.stopIds) {
      if (!stopRoutes.has(stopId)) {
        stopRoutes.set(stopId, new Set());
      }
      stopRoutes.get(stopId)!.add(route.id);
    }
  }
  return stopRoutes;
}

/**
 * Build a map from route ID to Route object for quick lookup.
 */
function buildRouteMap(routes: Route[]): Map<string, Route> {
  const routeMap = new Map<string, Route>();
  for (const route of routes) {
    routeMap.set(route.id, route);
  }
  return routeMap;
}

/**
 * Find the optimal jeepney route between two stops using BFS.
 *
 * The algorithm minimizes transfers first, then minimizes total stops.
 * It explores all reachable stops via each route, supporting unlimited transfers.
 *
 * @param originId - The starting stop ID
 * @param destId - The destination stop ID
 * @param routes - Array of all available routes
 * @param stops - Record of all stops keyed by stop ID
 * @returns A RoutePlan with step-by-step transfer instructions, or null if unreachable
 */
export function findRoute(
  originId: string,
  destId: string,
  routes: Route[],
  stops: Record<string, Stop>,
): RoutePlan | null {
  // Return null if origin equals destination
  if (originId === destId) {
    return null;
  }

  // Return null if either stop doesn't exist
  if (!stops[originId] || !stops[destId]) {
    return null;
  }

  const stopRoutes = buildStopRoutesMap(routes);
  const routeMap = buildRouteMap(routes);

  // If origin or destination has no routes serving it, unreachable
  if (!stopRoutes.has(originId) || !stopRoutes.has(destId)) {
    return null;
  }

  // Visited set keyed by "stopId:routeId" to avoid cycles
  const visited = new Set<string>();

  // BFS queue - we use a priority approach: process by (transfers, totalStops)
  // Since BFS naturally explores by level, we use a sorted queue approach
  const queue: BFSNode[] = [];

  // Seed the queue with all routes available at the origin
  for (const routeId of stopRoutes.get(originId)!) {
    const key = `${originId}:${routeId}`;
    if (!visited.has(key)) {
      visited.add(key);
      queue.push({
        stopId: originId,
        routeId,
        transfers: 0,
        totalStops: 0,
        steps: [],
      });
    }
  }

  // Best result found so far
  let bestResult: RoutePlan | null = null;

  while (queue.length > 0) {
    // Sort by transfers first, then by totalStops (priority queue behavior)
    queue.sort((a, b) => {
      if (a.transfers !== b.transfers) return a.transfers - b.transfers;
      return a.totalStops - b.totalStops;
    });

    const node = queue.shift()!;

    // Prune: if we already have a result and this node can't beat it
    if (bestResult) {
      if (
        node.transfers > bestResult.totalTransfers ||
        (node.transfers === bestResult.totalTransfers && node.totalStops >= bestResult.totalStops)
      ) {
        continue;
      }
    }

    const route = routeMap.get(node.routeId);
    if (!route) continue;

    // Find the index of the current stop in this route
    const currentIndex = route.stopIds.indexOf(node.stopId);
    if (currentIndex === -1) continue;

    // Travel along the route in both directions from the current stop
    // Direction: forward (increasing index) and backward (decreasing index)
    for (const direction of [1, -1] as const) {
      let stopsRidden = 0;
      let idx = currentIndex + direction;

      while (idx >= 0 && idx < route.stopIds.length) {
        const nextStopId = route.stopIds[idx];
        stopsRidden++;

        const newTotalStops = node.totalStops + stopsRidden;

        // Check if we reached the destination
        if (nextStopId === destId) {
          const newStep: TransferStep = {
            type: "ride",
            routeId: node.routeId,
            fromStopId: node.stopId,
            toStopId: nextStopId,
            stopCount: stopsRidden,
          };
          const newSteps = [...node.steps, newStep];
          const plan: RoutePlan = {
            steps: newSteps,
            totalTransfers: node.transfers,
            totalStops: newTotalStops,
          };

          // Keep the best result
          if (
            !bestResult ||
            plan.totalTransfers < bestResult.totalTransfers ||
            (plan.totalTransfers === bestResult.totalTransfers &&
              plan.totalStops < bestResult.totalStops)
          ) {
            bestResult = plan;
          }

          // No need to continue in this direction past the destination
          break;
        }

        // Check for transfer opportunities at this stop
        const availableRoutes = stopRoutes.get(nextStopId);
        if (availableRoutes) {
          for (const transferRouteId of availableRoutes) {
            if (transferRouteId === node.routeId) continue; // Don't transfer to same route

            const transferKey = `${nextStopId}:${transferRouteId}`;
            if (!visited.has(transferKey)) {
              visited.add(transferKey);

              const newStep: TransferStep = {
                type: "ride",
                routeId: node.routeId,
                fromStopId: node.stopId,
                toStopId: nextStopId,
                stopCount: stopsRidden,
              };

              queue.push({
                stopId: nextStopId,
                routeId: transferRouteId,
                transfers: node.transfers + 1,
                totalStops: newTotalStops,
                steps: [...node.steps, newStep],
              });
            }
          }
        }

        idx += direction;
      }
    }
  }

  return bestResult;
}
