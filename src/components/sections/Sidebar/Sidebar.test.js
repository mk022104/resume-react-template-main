import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

// Mock images
jest.mock('../../../images/portfolio/Madhukar.jpg', () => 'mock-avatar');

test('renders Sidebar component with user info', () => {
  render(<Sidebar />);
  expect(screen.getByText('Madhukar Ganga')).toBeInTheDocument();
  expect(screen.getByText('Frontend React Developer at')).toBeInTheDocument();
  expect(screen.getByText('Pearson Educational.')).toBeInTheDocument();
});
