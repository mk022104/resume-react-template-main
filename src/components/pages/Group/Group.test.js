<<<<<<< HEAD
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
=======
import { render, screen } from '@testing-library/react';
import Group from './Group';

test('renders Group component with user information', () => {
  render(<Group />);
  expect(screen.getByText('Madhukar Reddy Gangapuram')).toBeInTheDocument();
  expect(screen.getByText('madhu.ganga2018@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('984-377-1236')).toBeInTheDocument();
>>>>>>> c9b8197936da6081da9391d537b6fb388f380a60
});
