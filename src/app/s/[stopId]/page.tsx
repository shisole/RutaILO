import Link from "next/link";
import { notFound } from "next/navigation";
import { stops } from "@/data/stops";
import { routes } from "@/data/routes";
import { RouteCard } from "@/components/RouteCard";
import { RouteMap } from "@/components/RouteMap";

export function generateStaticParams() {
  return Object.keys(stops).map((stopId) => ({
    stopId,
  }));
}

export default async function StopViewPage({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const { stopId } = await params;
  const stop = stops[stopId];

  if (!stop) {
    notFound();
  }

  const servingRoutes = routes.filter((route) =>
    route.stopIds.includes(stopId)
  );

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
        <h1 className="text-2xl font-bold text-gray-900">{stop.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {servingRoutes.length} route{servingRoutes.length !== 1 ? "s" : ""}{" "}
          pass{servingRoutes.length === 1 ? "es" : ""} through here
        </p>
      </header>

      {/* Map */}
      <div className="px-4 pt-4">
        <RouteMap routesToShow={servingRoutes} highlightStopId={stopId} />
      </div>

      {/* Route list */}
      <main className="px-4 py-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Jeepney Routes
        </h2>
        <div className="space-y-3">
          {servingRoutes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </main>

      {/* CTA button */}
      <div className="px-4 pb-8">
        <Link
          href={`/find?from=${stopId}`}
          className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Where are you going?
          <span className="ml-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
