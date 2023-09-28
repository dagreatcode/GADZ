import React from "react";
import { render, screen } from "@testing-library/react";
import Dash from "./Dash";

test("renders Home", () => {
  render(<Dash />);
  const linkElement = screen.getByText(/Dash/i);
  expect(linkElement).toBeInTheDocument();
});
