"use client";

import type L from "leaflet";
import { useEffect, useRef } from "react";

import { stops } from "@/data/stops";
import type { Route } from "@/data/types";
import { routeWaypoints } from "@/data/waypoints";
import { ensureLeafletCss } from "@/lib/leaflet-css";

interface RouteMapProps {
  routesToShow: Route[];
  highlightStopId?: string;
  height?: string;
}

export function RouteMap({ routesToShow, highlightStopId, height = "200px" }: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      const leaflet = await import("leaflet");
      await ensureLeafletCss();

      if (cancelled || !mapContainerRef.current) return;

      // Clean up previous map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = leaflet.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
      });

      mapInstanceRef.current = map;

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        })
        .addTo(map);

      const allLatLngs: L.LatLngTuple[] = [];

      // Draw polylines for each route
      for (const route of routesToShow) {
        const coords: L.LatLngTuple[] = [];

        for (const stopId of route.stopIds) {
          const stop = stops[stopId];
          if (stop) {
            const latLng: L.LatLngTuple = [stop.lat, stop.lng];
            coords.push(latLng);
            allLatLngs.push(latLng);
          }
        }

        // Use OSRM road-snapped waypoints if available, otherwise fall back to stop coords
        const waypoints: [number, number][] | undefined = routeWaypoints[route.id];
        const polyCoords: L.LatLngTuple[] = waypoints ?? coords;

        if (polyCoords.length > 1) {
          leaflet
            .polyline(polyCoords, {
              color: route.color,
              weight: 3,
              opacity: 0.8,
            })
            .addTo(map);
        }
      }

      // Highlight the specified stop with a red circle marker
      if (highlightStopId) {
        const highlightStop = stops[highlightStopId];
        if (highlightStop) {
          leaflet
            .circleMarker([highlightStop.lat, highlightStop.lng], {
              radius: 8,
              color: "#DC2626",
              fillColor: "#DC2626",
              fillOpacity: 1,
              weight: 2,
            })
            .addTo(map);
        }
      }

      // Fit bounds to show all routes
      if (allLatLngs.length > 0) {
        const bounds = leaflet.latLngBounds(allLatLngs);
        map.fitBounds(bounds, { padding: [20, 20] });
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
  }, [routesToShow, highlightStopId]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: "100%" }}
      className="rounded-xl overflow-hidden"
    />
  );
}
