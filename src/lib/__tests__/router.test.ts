// @vitest-environment node
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
    const route1 = routes[0];
    const route2 = routes.find(
      (r) =>
        r.id !== route1.id &&
        r.stopIds.some((s) => route1.stopIds.includes(s))
    );
    if (!route2) return;
    const origin = route1.stopIds[0];
    const dest = route2.stopIds.find((s) => !route1.stopIds.includes(s));
    if (!dest) return;
    const result = findRoute(origin, dest, routes, stops);
    expect(result).not.toBeNull();
    expect(result!.totalTransfers).toBeGreaterThanOrEqual(1);
    expect(result!.steps.length).toBeGreaterThanOrEqual(2);
  });

  it("returns null for nonexistent stops", () => {
    const result = findRoute("nonexistent-stop", "city-proper", routes, stops);
    expect(result).toBeNull();
  });

  it("prefers fewer transfers over fewer stops", () => {
    const route = routes[0];
    if (route.stopIds.length < 3) return;
    const origin = route.stopIds[0];
    const dest = route.stopIds[route.stopIds.length - 1];
    const result = findRoute(origin, dest, routes, stops);
    expect(result).not.toBeNull();
    expect(result!.totalTransfers).toBe(0);
  });
});
