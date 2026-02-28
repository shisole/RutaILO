"use client";

import { useState } from "react";

import { stops } from "@/data/stops";
import type { Route } from "@/data/types";

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left rounded-xl border border-gray-200 bg-white shadow-sm p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        {/* Color dot with route number */}
        <div
          data-testid="route-color"
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm"
          style={{ backgroundColor: route.color }}
        >
          {route.number}
        </div>

        {/* Route name and stop count */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm leading-tight">{route.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{route.stopIds.length} stops</p>
        </div>

        {/* Chevron icon */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Expanded stop list */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <ol className="space-y-1.5">
            {route.stopIds.map((stopId, index) => {
              const stop = stops[stopId];
              const stopName = stop ? stop.name : stopId;
              return (
                <li key={stopId} className="flex items-center gap-2 text-sm text-gray-700">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
                    style={{ backgroundColor: route.color }}
                  >
                    {index + 1}
                  </span>
                  <span>{stopName}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </button>
  );
}
