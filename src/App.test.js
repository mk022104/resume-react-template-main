import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with user name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Madhukar Ganga/i);
  expect(nameElement).toBeInTheDocument();
});
