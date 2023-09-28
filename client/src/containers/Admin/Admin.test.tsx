import React from "react";
import { render, screen } from "@testing-library/react";
import Admin from "./Admin";

test("renders Home", () => {
  render(<Admin />);
  const linkElement = screen.getByText(/Admin/i);
  expect(linkElement).toBeInTheDocument();
});
