// @vitest-environment node
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
      expect(stop.lat).toBeGreaterThan(10);
      expect(stop.lat).toBeLessThan(11);
      expect(stop.lng).toBeGreaterThan(122);
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
