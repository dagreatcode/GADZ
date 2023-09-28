import React from "react";
import { render, screen } from "@testing-library/react";
import User from "./User";

test("renders Home", () => {
  render(<User />);
  const linkElement = screen.getByText(/User/i);
  expect(linkElement).toBeInTheDocument();
});
