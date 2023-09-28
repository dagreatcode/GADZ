import React from "react";
import { render, screen } from "@testing-library/react";
import RoadFreight from "./RoadFreight";

test("renders Home", () => {
  render(<RoadFreight />);
  const linkElement = screen.getByText(/RoadFreight/i);
  expect(linkElement).toBeInTheDocument();
});
