// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { RoutePlanView } from "@/components/RoutePlanView";
import type { RoutePlan } from "@/data/types";

const mockPlan: RoutePlan = {
  steps: [
    {
      type: "ride",
      routeId: "route-3",
      fromStopId: "jaro-plaza",
      toStopId: "sm-city",
      stopCount: 5,
    },
    {
      type: "ride",
      routeId: "route-12",
      fromStopId: "sm-city",
      toStopId: "molo-church",
      stopCount: 3,
    },
  ],
  totalTransfers: 1,
  totalStops: 8,
};

describe("RoutePlanView", () => {
  it("renders each step of the plan", () => {
    render(<RoutePlanView plan={mockPlan} />);
    expect(screen.getByText(/5 stops/)).toBeInTheDocument();
    expect(screen.getByText(/3 stops/)).toBeInTheDocument();
  });

  it("shows ride count and stop & switch", () => {
    render(<RoutePlanView plan={mockPlan} />);
    expect(screen.getByText(/2 rides/)).toBeInTheDocument();
    expect(screen.getByText(/1 stop & switch/)).toBeInTheDocument();
  });
});
