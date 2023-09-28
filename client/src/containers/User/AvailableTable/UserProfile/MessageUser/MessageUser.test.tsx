import React from "react";
import { render, screen } from "@testing-library/react";
import MessageUser from "./MessageUser";

test("renders Home", () => {
  render(<MessageUser />);
  const linkElement = screen.getByText(/MessageUser/i);
  expect(linkElement).toBeInTheDocument();
});
