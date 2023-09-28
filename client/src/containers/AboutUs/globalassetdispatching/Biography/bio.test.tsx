import React from "react";
import { render, screen } from "@testing-library/react";
import Bio from "./Bio";

test("renders Home", () => {
  render(<Bio />);
  const linkElement = screen.getByText(/Bio/i);
  expect(linkElement).toBeInTheDocument();
});
