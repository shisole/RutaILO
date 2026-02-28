"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type L from "leaflet";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";

function ensureLeafletCss() {
  const LEAFLET_CSS_ID = "leaflet-css";
  if (document.getElementById(LEAFLET_CSS_ID)) return;
  const link = document.createElement("link");
  link.id = LEAFLET_CSS_ID;
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

// Build a lookup: stopId -> list of routes serving it
function buildStopRoutesMap() {
  const map: Record<string, { number: number; name: string; color: string }[]> =
    {};
  for (const route of routes) {
    for (const stopId of route.stopIds) {
      if (!map[stopId]) map[stopId] = [];
      map[stopId].push({
        number: route.number,
        name: route.name,
        color: route.color,
      });
    }
  }
  return map;
}

const stopRoutesMap = buildStopRoutesMap();

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<
    Map<string, { polyline: L.Polyline; markers: L.CircleMarker[] }>
  >(new Map());

  const [visibleRoutes, setVisibleRoutes] = useState<Set<string>>(() => {
    return new Set(routes.map((r) => r.id));
  });
  const [legendOpen, setLegendOpen] = useState(false);

  const toggleRoute = useCallback(
    (routeId: string) => {
      setVisibleRoutes((prev) => {
        const next = new Set(prev);
        if (next.has(routeId)) {
          next.delete(routeId);
        } else {
          next.add(routeId);
        }
        return next;
      });
    },
    []
  );

  // Sync layer visibility with visibleRoutes state
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    for (const route of routes) {
      const layers = routeLayersRef.current.get(route.id);
      if (!layers) continue;

      const isVisible = visibleRoutes.has(route.id);

      if (isVisible && !map.hasLayer(layers.polyline)) {
        layers.polyline.addTo(map);
        for (const marker of layers.markers) {
          marker.addTo(map);
        }
      } else if (!isVisible && map.hasLayer(layers.polyline)) {
        map.removeLayer(layers.polyline);
        for (const marker of layers.markers) {
          map.removeLayer(marker);
        }
      }
    }
  }, [visibleRoutes]);

  // Initialize the Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    async function initMap() {
      const leaflet = await import("leaflet");
      ensureLeafletCss();

      if (cancelled || !mapContainerRef.current) return;

      // Clean up previous map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = leaflet.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        touchZoom: true,
      });

      mapInstanceRef.current = map;

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      // Track which stops we have already placed markers for
      const placedStopMarkers = new Set<string>();

      // Draw all routes
      for (const route of routes) {
        const coords: L.LatLngTuple[] = [];
        const markers: L.CircleMarker[] = [];

        for (const stopId of route.stopIds) {
          const stop = stops[stopId];
          if (stop) {
            const latLng: L.LatLngTuple = [stop.lat, stop.lng];
            coords.push(latLng);

            // Only place one marker per stop (not per route)
            if (!placedStopMarkers.has(stopId)) {
              placedStopMarkers.add(stopId);

              const servingRoutes = stopRoutesMap[stopId] || [];
              const colorDots = servingRoutes
                .map(
                  (r) =>
                    `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${r.color};margin-right:3px;" title="Route ${r.number}"></span>`
                )
                .join("");

              const routeList = servingRoutes
                .map(
                  (r) =>
                    `<span style="display:flex;align-items:center;gap:4px;font-size:12px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${r.color};flex-shrink:0;"></span>${r.number}. ${r.name}</span>`
                )
                .join("");

              const popupHtml = `
                <div style="min-width:160px;max-width:260px;">
                  <div style="font-weight:600;font-size:14px;margin-bottom:4px;">${stop.name}</div>
                  <div style="margin-bottom:6px;">${colorDots}</div>
                  <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:8px;">${routeList}</div>
                  <a href="/s/${stop.id}" style="color:#2563eb;font-size:12px;text-decoration:underline;">View stop details</a>
                </div>
              `;

              const marker = leaflet
                .circleMarker([stop.lat, stop.lng], {
                  radius: 5,
                  color: "#374151",
                  fillColor: "#F9FAFB",
                  fillOpacity: 1,
                  weight: 2,
                })
                .bindPopup(popupHtml)
                .addTo(map);

              markers.push(marker);
            }
          }
        }

        if (coords.length > 1) {
          const routePopupHtml = `
            <div style="min-width:140px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${route.color};flex-shrink:0;"></span>
                <span style="font-weight:600;font-size:14px;">Route ${route.number}</span>
              </div>
              <div style="font-size:13px;color:#374151;">${route.name}</div>
            </div>
          `;

          const polyline = leaflet
            .polyline(coords, {
              color: route.color,
              weight: 4,
              opacity: 0.85,
            })
            .bindPopup(routePopupHtml)
            .addTo(map);

          routeLayersRef.current.set(route.id, { polyline, markers });
        }
      }

      // Fit map to Iloilo City area
      map.setView([10.71, 122.555], 14);
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const allVisible = visibleRoutes.size === routes.length;
  const noneVisible = visibleRoutes.size === 0;

  return (
    <div className="flex h-dvh flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Iloilo Routes Map</h1>
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Legend
        </button>
      </header>

      {/* Map */}
      <div className="relative flex-1">
        <div ref={mapContainerRef} className="h-full w-full" />

        {/* Legend Panel */}
        {legendOpen && (
          <div className="absolute inset-x-0 bottom-0 z-[1000] max-h-[60vh] overflow-y-auto rounded-t-2xl bg-white shadow-lg">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
              <h2 className="text-base font-semibold text-gray-900">
                Route Legend
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (allVisible) {
                      setVisibleRoutes(new Set());
                    } else {
                      setVisibleRoutes(new Set(routes.map((r) => r.id)));
                    }
                  }}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  {allVisible ? "Hide All" : "Show All"}
                </button>
                <button
                  onClick={() => setLegendOpen(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <ul className="divide-y divide-gray-50 px-2 pb-4">
              {routes.map((route) => {
                const isVisible = visibleRoutes.has(route.id);
                return (
                  <li key={route.id}>
                    <button
                      onClick={() => toggleRoute(route.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isVisible
                          ? "hover:bg-gray-50"
                          : "opacity-50 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className="h-4 w-4 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <span className="flex-1 text-sm text-gray-800">
                        <span className="font-semibold">{route.number}.</span>{" "}
                        {route.name}
                      </span>
                      <svg
                        className={`h-5 w-5 flex-shrink-0 ${
                          isVisible ? "text-blue-500" : "text-gray-300"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {isVisible ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.05 6.05m3.828 3.828l4.242 4.242m0 0L17.95 17.95M12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21l-3-3"
                          />
                        )}
                        {isVisible && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        )}
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
