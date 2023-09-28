import React from "react";
import { render, screen } from "@testing-library/react";
import DispatchAgreement from "./DispatchAgreement";

test("renders Home", () => {
  render(<DispatchAgreement />);
  const linkElement = screen.getByText(/DispatchAgreement/i);
  expect(linkElement).toBeInTheDocument();
});
