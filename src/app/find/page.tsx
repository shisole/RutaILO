"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";

import { RoutePlanMap } from "@/components/RoutePlanMap";
import { RoutePlanView } from "@/components/RoutePlanView";
import { StopSearch } from "@/components/StopSearch";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import type { RoutePlan } from "@/data/types";
import { findRoute } from "@/lib/router";

const allStops = Object.values(stops);

function findNearestStopId(lat: number, lng: number): string | null {
  let bestId: string | null = null;
  let bestDist = Infinity;
  for (const stop of allStops) {
    const dlat = stop.lat - lat;
    const dlng = stop.lng - lng;
    const dist = dlat * dlat + dlng * dlng;
    if (dist < bestDist) {
      bestDist = dist;
      bestId = stop.id;
    }
  }
  return bestId;
}

function RouteFinderContent() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") ?? "";

  const [fromStopId, setFromStopId] = useState(fromParam);
  const [toStopId, setToStopId] = useState("");
  const [plan, setPlan] = useState<RoutePlan | null>(null);
  const [searched, setSearched] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  function handleFindRoute() {
    if (!fromStopId || !toStopId) return;
    const result = findRoute(fromStopId, toStopId, routes, stops);
    setPlan(result);
    setSearched(true);
  }

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestId = findNearestStopId(position.coords.latitude, position.coords.longitude);
        if (nearestId) {
          setFromStopId(nearestId);
        }
        setLocating(false);
      },
      () => {
        setLocError("Unable to get your location");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mb-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          RutaILO
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Route Finder</h1>
      </header>

      {/* Search inputs */}
      <main className="px-4 py-6 space-y-4">
        <div className="relative z-10">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            From
          </label>
          <StopSearch placeholder="Where are you?" value={fromStopId} onSelect={setFromStopId} />
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locating}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {locating ? "Getting location..." : "Use my location"}
          </button>
          {locError && <p className="mt-1 text-xs text-red-500">{locError}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            To
          </label>
          <StopSearch placeholder="Where are you going?" value={toStopId} onSelect={setToStopId} />
        </div>

        <button
          type="button"
          onClick={handleFindRoute}
          disabled={!fromStopId || !toStopId}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find Route
        </button>

        {/* Results */}
        {searched && (
          <div className="mt-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Results
            </h2>
            {plan ? (
              <>
                <RoutePlanMap plan={plan} />
                <div className="mt-4">
                  <RoutePlanView plan={plan} />
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
                <p className="text-sm text-gray-500">No route found between these stops</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function FindPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      }
    >
      <RouteFinderContent />
    </Suspense>
  );
}
