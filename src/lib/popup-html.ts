import type { Stop } from "@/data/types";

/**
 * Popup HTML for a stop marker on the full map page.
 */
export function stopPopupHtml(
  stop: Stop,
  servingRoutes: { number: number; name: string; color: string }[],
): string {
  const colorDots = servingRoutes
    .map(
      (r) =>
        `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${r.color};margin-right:3px;" title="Route ${r.number}"></span>`,
    )
    .join("");

  const routeList = servingRoutes
    .map(
      (r) =>
        `<span style="display:flex;align-items:center;gap:4px;font-size:12px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${r.color};flex-shrink:0;"></span>${r.number}. ${r.name}</span>`,
    )
    .join("");

  return `
    <div style="min-width:160px;max-width:260px;">
      <div style="font-weight:600;font-size:14px;margin-bottom:4px;">${stop.name}</div>
      <div style="margin-bottom:6px;">${colorDots}</div>
      <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:8px;">${routeList}</div>
      <a href="/s/${stop.id}" style="color:#2563eb;font-size:12px;text-decoration:underline;">View stop details</a>
    </div>
  `;
}

/**
 * Popup HTML for a route polyline (used on full map and route plan map).
 */
export function routePopupHtml(route: { number: number; name: string; color: string }): string {
  return `
    <div style="min-width:140px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${route.color};flex-shrink:0;"></span>
        <span style="font-weight:600;font-size:14px;">Route ${route.number}</span>
      </div>
      <div style="font-size:13px;color:#374151;">${route.name}</div>
    </div>
  `;
}

/**
 * Popup HTML for origin/destination/transfer markers on route plan maps.
 */
export function markerPopupHtml(name: string, label: string, color: string): string {
  return `<div><strong>${name}</strong><br/><span style="color:${color};font-size:12px;">${label}</span></div>`;
}
