import React from "react";
import { render, screen } from "@testing-library/react";
import B2BMessages from "./App";

test("renders Home", () => {
  render(<B2BMessages />);
  const linkElement = screen.getByText(/B2BMessages/i);
  expect(linkElement).toBeInTheDocument();
});