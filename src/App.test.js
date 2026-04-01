import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main layout shell', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
