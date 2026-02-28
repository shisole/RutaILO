"use client";

import { useState } from "react";

import { routes } from "@/data/routes";
import { stops } from "@/data/stops";
import type { RoutePlan, TransferStep } from "@/data/types";

interface RoutePlanViewProps {
  plan: RoutePlan;
}

/**
 * Get the ordered list of stop IDs between fromStopId and toStopId (inclusive)
 * along the route, handling both forward and reverse travel.
 */
function getSegmentStopIds(routeStopIds: string[], fromStopId: string, toStopId: string): string[] {
  const fromIdx = routeStopIds.indexOf(fromStopId);
  const toIdx = routeStopIds.indexOf(toStopId);
  if (fromIdx === -1 || toIdx === -1) return [fromStopId, toStopId];

  if (fromIdx <= toIdx) {
    return routeStopIds.slice(fromIdx, toIdx + 1);
  }
  // Reverse direction
  return routeStopIds.slice(toIdx, fromIdx + 1).reverse();
}

const COLLAPSE_THRESHOLD = 4;

function StepTimeline({ step, route }: { step: TransferStep; route: typeof routes[number] | null }) {
  const [expanded, setExpanded] = useState(false);
  const routeColor = route?.color ?? "#6B7280";

  const segmentStopIds = route
    ? getSegmentStopIds(route.stopIds, step.fromStopId, step.toStopId)
    : [step.fromStopId, step.toStopId];

  const intermediateIds = segmentStopIds.slice(1, -1);
  const shouldCollapse = intermediateIds.length > COLLAPSE_THRESHOLD && !expanded;
  const visibleIntermediates = shouldCollapse
    ? intermediateIds.slice(0, 2)
    : intermediateIds;
  const hiddenCount = intermediateIds.length - 2;

  return (
    <div className="ml-1">
      {/* Board stop */}
      <div className="flex items-center gap-3 py-1.5">
        <div className="relative flex flex-col items-center">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 z-10"
            style={{ backgroundColor: routeColor, borderColor: routeColor }}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {stops[step.fromStopId]?.name ?? step.fromStopId}
          </p>
          <p className="text-xs font-medium text-emerald-600">Board here</p>
        </div>
      </div>

      {/* Intermediate stops */}
      {visibleIntermediates.map((stopId) => (
        <div key={stopId} className="flex items-center gap-3 py-1">
          <div className="relative flex flex-col items-center">
            <div
              className="w-2.5 h-2.5 rounded-full border-2 bg-white z-10"
              style={{ borderColor: routeColor }}
            />
          </div>
          <p className="text-xs text-gray-500">{stops[stopId]?.name ?? stopId}</p>
        </div>
      ))}

      {/* Collapsed indicator */}
      {shouldCollapse && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-3 py-1 group"
        >
          <div className="relative flex flex-col items-center">
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-dashed bg-white z-10"
              style={{ borderColor: routeColor }}
            />
          </div>
          <p className="text-xs text-gray-400 group-hover:text-gray-600">
            +{hiddenCount} more stop{hiddenCount !== 1 ? "s" : ""}
          </p>
        </button>
      )}

      {/* Alight stop */}
      <div className="flex items-center gap-3 py-1.5">
        <div className="relative flex flex-col items-center">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 z-10"
            style={{ backgroundColor: routeColor, borderColor: routeColor }}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {stops[step.toStopId]?.name ?? step.toStopId}
          </p>
          <p className="text-xs font-medium text-red-500">Get off here</p>
        </div>
      </div>
    </div>
  );
}

export function RoutePlanView({ plan }: RoutePlanViewProps) {
  const routeMap = new Map(routes.map((r) => [r.id, r]));

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      {/* Summary header */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{plan.totalStops} stops</span>
          {" total"}
          {plan.totalTransfers > 0 && (
            <>
              {" \u00B7 "}
              <span className="font-semibold text-gray-900">
                {plan.totalTransfers} transfer
                {plan.totalTransfers !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-1">
        {plan.steps.map((step, index) => {
          const route = step.routeId ? routeMap.get(step.routeId) ?? null : null;
          const routeColor = route?.color ?? "#6B7280";
          const routeNumber = route?.number;
          const routeName = route?.name ?? "Walk";

          return (
            <div key={index}>
              {/* Transfer indicator between segments */}
              {index > 0 && (
                <div className="flex items-center gap-2 py-2 pl-1">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-100">
                    <svg
                      className="w-3 h-3 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-orange-600">
                    Transfer at {stops[step.fromStopId]?.name ?? step.fromStopId}
                  </span>
                </div>
              )}

              {/* Route header */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xs"
                  style={{ backgroundColor: routeColor }}
                >
                  {routeNumber ?? "W"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Route {routeNumber} &mdash; {routeName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {step.stopCount} stop{step.stopCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Stop timeline with colored line */}
              <div
                className="ml-4 border-l-2 pl-4"
                style={{ borderColor: routeColor }}
              >
                <StepTimeline step={step} route={route} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
