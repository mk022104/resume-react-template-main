import React from "react";
import { render, screen, act } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders attribution and advances clock on interval", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByText(/Designed and Developed by Madhukar Reddy/i)
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
