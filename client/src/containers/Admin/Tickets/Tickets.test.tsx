import React from "react";
import { render, screen } from "@testing-library/react";
import TicketsCreated from "./TicketsCreated";

test("renders Home", () => {
  render(<TicketsCreated />);
  const linkElement = screen.getByText(/TicketsCreated/i);
  expect(linkElement).toBeInTheDocument();
});
