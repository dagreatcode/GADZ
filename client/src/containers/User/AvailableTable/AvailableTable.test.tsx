import React from "react";
import { render, screen } from "@testing-library/react";
import AvailableTable from "./AvailableTable";

test("renders Home", () => {
  render(<AvailableTable />);
  const linkElement = screen.getByText(/AvailableTable/i);
  expect(linkElement).toBeInTheDocument();
});
