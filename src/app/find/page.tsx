"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { StopSearch } from "@/components/StopSearch";
import { RoutePlanView } from "@/components/RoutePlanView";
import { findRoute } from "@/lib/router";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import type { RoutePlan } from "@/data/types";

function RouteFinderContent() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") ?? "";

  const [fromStopId, setFromStopId] = useState(fromParam);
  const [toStopId, setToStopId] = useState("");
  const [plan, setPlan] = useState<RoutePlan | null>(null);
  const [searched, setSearched] = useState(false);

  function handleFindRoute() {
    if (!fromStopId || !toStopId) return;
    const result = findRoute(fromStopId, toStopId, routes, stops);
    setPlan(result);
    setSearched(true);
  }

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          RutaILO
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Route Finder</h1>
      </header>

      {/* Search inputs */}
      <main className="px-4 py-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            From
          </label>
          <StopSearch
            placeholder="Where are you?"
            value={fromStopId}
            onSelect={setFromStopId}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            To
          </label>
          <StopSearch
            placeholder="Where are you going?"
            value={toStopId}
            onSelect={setToStopId}
          />
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
              <RoutePlanView plan={plan} />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 text-center">
                <p className="text-sm text-gray-500">
                  No route found between these stops
                </p>
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
