import type { RoutePlan } from "@/data/types";
import { routes } from "@/data/routes";
import { stops } from "@/data/stops";

interface RoutePlanViewProps {
  plan: RoutePlan;
}

export function RoutePlanView({ plan }: RoutePlanViewProps) {
  const routeMap = new Map(routes.map((r) => [r.id, r]));

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      {/* Summary header */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {plan.totalStops} stops
          </span>
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

      {/* Steps list */}
      <ol className="space-y-0">
        {plan.steps.map((step, index) => {
          const route = step.routeId ? routeMap.get(step.routeId) : null;
          const fromStop = stops[step.fromStopId];
          const toStop = stops[step.toStopId];
          const routeColor = route?.color ?? "#6B7280";
          const routeNumber = route?.number;
          const routeName = route?.name ?? "Walk";
          const fromName = fromStop?.name ?? step.fromStopId;
          const toName = toStop?.name ?? step.toStopId;

          return (
            <li key={index} className="relative flex gap-3">
              {/* Vertical connector line */}
              {index < plan.steps.length - 1 && (
                <div
                  className="absolute left-5 top-10 bottom-0 w-0.5"
                  style={{ backgroundColor: routeColor }}
                />
              )}

              {/* Color-coded circle with route number */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm z-10"
                style={{ backgroundColor: routeColor }}
              >
                {routeNumber ?? "W"}
              </div>

              {/* Step details */}
              <div className="flex-1 pb-4">
                <p className="font-semibold text-gray-900 text-sm">
                  Route {routeNumber} &mdash; {routeName}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">
                  {fromName} &rarr; {toName}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {step.stopCount} stop{step.stopCount !== 1 ? "s" : ""}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
