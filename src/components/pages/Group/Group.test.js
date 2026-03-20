import { render, screen } from '@testing-library/react';
import Group from './Group';

test('renders Group component with user information', () => {
  render(<Group />);
  expect(screen.getByText('Madhukar Reddy Gangapuram')).toBeInTheDocument();
  expect(screen.getByText('madhu.ganga2018@gmail.com')).toBeInTheDocument();
  expect(screen.getByText('984-377-1236')).toBeInTheDocument();
});
