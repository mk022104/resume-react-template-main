import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Qualification from "./Qualification";
import QualificationList from "./QualificationList";

describe("Qualification", () => {
  it("renders qualification entries from data", () => {
    render(<Qualification />);
    expect(screen.getByText(/Bachelors/i)).toBeInTheDocument();
    expect(screen.getByText(/Masters/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Scient Institute of Technology/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Chicago state University/i)
    ).toBeInTheDocument();
  });
});

describe("QualificationList", () => {
  const desc = {
    id: 1,
    title: "Test degree",
    image: "https://example.com/img.png",
    description: "Test description body",
    link: "https://example.com/school",
  };

  it("renders card content and shows link on hover", () => {
    render(<QualificationList desc={desc} />);
    expect(screen.getByText("Test degree")).toBeInTheDocument();
    expect(screen.getByText("Test description body")).toBeInTheDocument();
    const card = screen.getByText("Test degree").closest(".group");
    userEvent.hover(card);
    const link = screen.getByRole("link", { name: desc.link });
    expect(link).toHaveAttribute("href", desc.link);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
