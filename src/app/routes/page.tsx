import Link from "next/link";

import { RouteCard } from "@/components/RouteCard";
import { routes } from "@/data/routes";

export default function AllRoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-3"
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
          <h1 className="text-2xl font-bold text-gray-900">All Routes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {routes.length} jeepney routes in Iloilo City
          </p>
        </div>
      </header>

      {/* Route list */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>
    </div>
  );
}
