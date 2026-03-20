import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer component with developer name and time', () => {
  render(<Footer />);
  expect(
    screen.getByText('Designed and Developed by Madhukar Reddy.:::')
  ).toBeInTheDocument();
});
