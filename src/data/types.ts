export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  number: number;
  name: string;
  color: string; // hex color e.g. "#3B82F6"
  stopIds: string[]; // ordered list of stop IDs along the route
  waypoints?: [number, number][]; // detailed [lat, lng] path for map rendering
}

export interface TransferStep {
  type: "ride" | "walk";
  routeId?: string; // only for "ride" steps
  fromStopId: string;
  toStopId: string;
  stopCount?: number; // number of stops for "ride"
}

export interface RoutePlan {
  steps: TransferStep[];
  totalTransfers: number;
  totalStops: number;
}
