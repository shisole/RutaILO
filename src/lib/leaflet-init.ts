import type L from "leaflet";

const LEAFLET_CSS_ID = "leaflet-css";

function ensureLeafletCss(): Promise<void> {
  const existing = document.getElementById(LEAFLET_CSS_ID);
  if (existing) return Promise.resolve();
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.id = LEAFLET_CSS_ID;
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.onload = () => resolve();
    link.onerror = () => resolve(); // still proceed if CDN fails
    document.head.appendChild(link);
  });
}

interface CreateMapOptions {
  interactive?: boolean; // default true — controls zoom/drag/scroll/touch
  attribution?: boolean; // default false
}

interface LeafletMapResult {
  leaflet: typeof L;
  map: L.Map;
}

export async function createLeafletMap(
  container: HTMLElement,
  options?: CreateMapOptions,
): Promise<LeafletMapResult> {
  const interactive = options?.interactive ?? true;
  const attribution = options?.attribution ?? false;

  const leaflet = await import("leaflet");
  await ensureLeafletCss();

  // If this container already has a Leaflet map (e.g. from a racing concurrent
  // call in React strict mode), clean it up to prevent "Map container is
  // already initialized" error.
  if ("_leaflet_id" in container) {
    delete (container as unknown as { _leaflet_id?: number })._leaflet_id;
    container.innerHTML = "";
  }

  const map = leaflet.map(container, {
    zoomControl: interactive,
    attributionControl: attribution,
    dragging: interactive,
    scrollWheelZoom: interactive,
    doubleClickZoom: interactive,
    boxZoom: interactive,
    keyboard: interactive,
    touchZoom: interactive,
  });

  leaflet
    .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      ...(attribution
        ? { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
        : {}),
    })
    .addTo(map);

  return { leaflet, map };
}
