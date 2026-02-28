"use client";

import { useEffect, useRef } from "react";
import type { Route } from "@/data/types";
import { stops } from "@/data/stops";
import type L from "leaflet";

interface RouteMapProps {
  routesToShow: Route[];
  highlightStopId?: string;
  height?: string;
}

function ensureLeafletCss() {
  const LEAFLET_CSS_ID = "leaflet-css";
  if (document.getElementById(LEAFLET_CSS_ID)) return;
  const link = document.createElement("link");
  link.id = LEAFLET_CSS_ID;
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

export function RouteMap({
  routesToShow,
  highlightStopId,
  height = "200px",
}: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      const leaflet = await import("leaflet");
      ensureLeafletCss();

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

        if (coords.length > 1) {
          leaflet
            .polyline(coords, {
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
