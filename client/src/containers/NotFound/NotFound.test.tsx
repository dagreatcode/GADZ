import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders Home", () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/NotFound/i);
  expect(linkElement).toBeInTheDocument();
});
