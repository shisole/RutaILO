import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex flex-col items-center gap-8 px-6 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            RutaILO
          </h1>
          <p className="text-lg text-gray-600">
            Iloilo City Jeepney Routes
          </p>
        </div>

        <p className="max-w-sm text-base leading-relaxed text-gray-500">
          Scan a QR code at any jeep stop,
          <br />
          or search for your route below.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/find"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-medium text-white transition-colors hover:bg-blue-700"
          >
            Find Route
          </Link>
          <Link
            href="/map"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-600 px-8 text-base font-medium text-white transition-colors hover:bg-emerald-700"
          >
            View Map
          </Link>
          <Link
            href="/routes"
            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-blue-600 px-8 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            Browse All Routes
          </Link>
        </div>
      </main>
    </div>
  );
}
