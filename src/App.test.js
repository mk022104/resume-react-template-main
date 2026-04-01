import { render, screen } from '@testing-library/react';
import App from './App';

<<<<<<< HEAD
test('renders main layout shell', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
=======
test('renders app with user name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Madhukar Ganga/i);
  expect(nameElement).toBeInTheDocument();
>>>>>>> c9b8197936da6081da9391d537b6fb388f380a60
});
