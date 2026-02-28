export function ensureLeafletCss(): Promise<void> {
  const LEAFLET_CSS_ID = "leaflet-css";
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
