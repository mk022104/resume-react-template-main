import React from "react";
import { render, screen } from "@testing-library/react";
import Group from "./Group";

describe("Group", () => {
  it("renders name and contact details", () => {
    render(<Group />);
    expect(
      screen.getAllByText(/Madhukar Reddy Gangapuram/i)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/madhu\.ganga2018@gmail\.com/i)[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText(/984-377-1236/)[0]).toBeInTheDocument();
  });
});
