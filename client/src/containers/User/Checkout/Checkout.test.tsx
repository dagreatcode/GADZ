import React from "react";
import { render, screen } from "@testing-library/react";
import Checkout from "./Checkout";

test("renders Home", () => {
  render(<Checkout />);
  const linkElement = screen.getByText(/Checkout/i);
  expect(linkElement).toBeInTheDocument();
});
