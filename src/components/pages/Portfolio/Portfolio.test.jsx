import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "./Portfolio";

describe("Portfolio", () => {
  it("renders experience section and first role", () => {
    render(<Portfolio />);
    expect(screen.getByRole("heading", { name: /experience/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Senior UI developer,Pearson/i)
    ).toBeInTheDocument();
  });
});
