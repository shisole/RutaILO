"use client";

import type L from "leaflet";
import { useEffect, useRef } from "react";

import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import { type RoutePlan } from "@/data/types";
import { routeWaypoints } from "@/data/waypoints";
import { createLeafletMap } from "@/lib/leaflet-init";
import { markerPopupHtml, routePopupHtml } from "@/lib/popup-html";
import { buildRouteMap, buildStopWaypointIndices } from "@/lib/route-utils";

interface RoutePlanMapProps {
  plan: RoutePlan;
  height?: string;
}

export function RoutePlanMap({ plan, height = "250px" }: RoutePlanMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      if (cancelled || !mapContainerRef.current) return;

      // Clean up previous map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const { leaflet, map } = await createLeafletMap(mapContainerRef.current);

      if (cancelled) {
        map.remove();
        return;
      }

      mapInstanceRef.current = map;

      const routeMap = buildRouteMap(routes);
      const allLatLngs: L.LatLngTuple[] = [];

      for (const step of plan.steps) {
        if (step.type !== "ride" || !step.routeId) continue;

        const route = routeMap.get(step.routeId);
        if (!route) continue;

        const fromStop = stops[step.fromStopId];
        const toStop = stops[step.toStopId];
        if (!fromStop || !toStop) continue;

        const waypoints = routeWaypoints[route.id];
        const fromRouteIdx = route.stopIds.indexOf(step.fromStopId);
        const toRouteIdx = route.stopIds.indexOf(step.toStopId);

        let segmentCoords: L.LatLngTuple[];

        if (waypoints && waypoints.length > 1 && fromRouteIdx !== -1 && toRouteIdx !== -1) {
          // Map each stop to its waypoint index (monotonically ordered)
          const stopWpIndices = buildStopWaypointIndices(waypoints, route.stopIds);
          const startRouteIdx = Math.min(fromRouteIdx, toRouteIdx);
          const endRouteIdx = Math.max(fromRouteIdx, toRouteIdx);
          const wpStart = stopWpIndices[startRouteIdx];
          const wpEnd = stopWpIndices[endRouteIdx];
          segmentCoords = waypoints.slice(wpStart, wpEnd + 1);
        } else {
          // Fallback: use stop coordinates along the route between from and to
          const startIdx = Math.min(fromRouteIdx, toRouteIdx);
          const endIdx = Math.max(fromRouteIdx, toRouteIdx);
          segmentCoords = route.stopIds.slice(startIdx, endIdx + 1).flatMap((sid) => {
            const s = stops[sid];
            if (!s) return [];
            const coord: L.LatLngTuple = [s.lat, s.lng];
            return [coord];
          });
        }

        if (segmentCoords.length > 1) {
          leaflet
            .polyline(segmentCoords, {
              color: route.color,
              weight: 4,
              opacity: 0.9,
            })
            .bindPopup(routePopupHtml(route))
            .addTo(map);

          for (const coord of segmentCoords) {
            allLatLngs.push(coord);
          }
        }
      }

      // Add markers for origin, destination, and transfers
      const originStop = stops[plan.steps[0]?.fromStopId];
      const lastStep = plan.steps[plan.steps.length - 1];
      const destStop = lastStep ? stops[lastStep.toStopId] : null;

      // Collect transfer stop IDs (intermediate from-stops, excluding origin)
      const transferStopIds = new Set<string>();
      for (let i = 1; i < plan.steps.length; i++) {
        transferStopIds.add(plan.steps[i].fromStopId);
      }

      // Draw transfer markers first (so origin/dest render on top)
      for (const transferId of transferStopIds) {
        const transferStop = stops[transferId];
        if (!transferStop) continue;
        leaflet
          .circleMarker([transferStop.lat, transferStop.lng], {
            radius: 7,
            color: "#FFFFFF",
            fillColor: "#F97316",
            fillOpacity: 1,
            weight: 2,
          })
          .bindPopup(markerPopupHtml(transferStop.name, "Transfer point", "#F97316"))
          .addTo(map);
        allLatLngs.push([transferStop.lat, transferStop.lng]);
      }

      // Origin marker (green)
      if (originStop) {
        leaflet
          .circleMarker([originStop.lat, originStop.lng], {
            radius: 8,
            color: "#FFFFFF",
            fillColor: "#16A34A",
            fillOpacity: 1,
            weight: 2,
          })
          .bindPopup(markerPopupHtml(originStop.name, "Origin", "#16A34A"))
          .addTo(map);
        allLatLngs.push([originStop.lat, originStop.lng]);
      }

      // Destination marker (red)
      if (destStop) {
        leaflet
          .circleMarker([destStop.lat, destStop.lng], {
            radius: 8,
            color: "#FFFFFF",
            fillColor: "#DC2626",
            fillOpacity: 1,
            weight: 2,
          })
          .bindPopup(markerPopupHtml(destStop.name, "Destination", "#DC2626"))
          .addTo(map);
        allLatLngs.push([destStop.lat, destStop.lng]);
      }

      // Fit bounds to all drawn geometry
      if (allLatLngs.length > 0) {
        const bounds = leaflet.latLngBounds(allLatLngs);
        map.fitBounds(bounds, { padding: [30, 30] });
      }

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [plan]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: "100%", position: "relative", zIndex: 0 }}
      className="rounded-xl overflow-hidden"
    />
  );
}
