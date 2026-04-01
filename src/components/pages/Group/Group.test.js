import React from "react";
import { render, screen } from "@testing-library/react";
import Group from "./Group";

describe("Group", () => {
  it("renders name and contact details", () => {
    render(<Group />);
    expect(
      screen.getByText(/Madhukar Reddy Gangapuram/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/madhu\.ganga2018@gmail\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/984-377-1236/)).toBeInTheDocument();
  });
});
