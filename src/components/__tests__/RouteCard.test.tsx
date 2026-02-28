// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { RouteCard } from "@/components/RouteCard";

const mockRoute = {
  id: "route-1",
  number: 1,
  name: "Bo. Obrero-Lapuz to City Proper Loop",
  color: "#3B82F6",
  stopIds: ["bo-obrero", "lapuz", "city-proper"],
};

describe("RouteCard", () => {
  it("renders route number and name", () => {
    render(<RouteCard route={mockRoute} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Bo. Obrero-Lapuz to City Proper Loop")).toBeInTheDocument();
  });

  it("displays the route color indicator", () => {
    render(<RouteCard route={mockRoute} />);
    const colorDot = screen.getByTestId("route-color");
    expect(colorDot).toHaveStyle({ backgroundColor: "#3B82F6" });
  });

  it("shows stop count", () => {
    render(<RouteCard route={mockRoute} />);
    expect(screen.getByText(/3 stops/)).toBeInTheDocument();
  });
});
