import React from "react";
import { render, screen } from "@testing-library/react";
import Service from "./Service";
import ServiceItem from "./ServiceItem";

describe("Service", () => {
  it("renders all service cards", () => {
    render(<Service />);
    expect(screen.getByText("Web Design")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Bootstrap Template")).toBeInTheDocument();
    expect(screen.getByText("Tailwindcss Template")).toBeInTheDocument();
    expect(screen.getByText("React Template")).toBeInTheDocument();
  });
});

describe("ServiceItem", () => {
  it("renders icon, title, and description", () => {
    const service = {
      id: 1,
      icon: <span data-testid="svc-icon">Ic</span>,
      title: "Custom service",
      description: "Custom description text",
    };
    render(<ServiceItem service={service} />);
    expect(screen.getByTestId("svc-icon")).toBeInTheDocument();
    expect(screen.getByText("Custom service")).toBeInTheDocument();
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });
});
