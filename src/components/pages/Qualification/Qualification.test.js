import { render, screen } from '@testing-library/react';
import Qualification from './Qualification';

// Mock images
jest.mock(
  '../../../images/blog/ScientInstituteOfTechnology.jpg',
  () => 'mock-image'
);
jest.mock(
  '../../../images/blog/ChicagoStateUniversity.jpg',
  () => 'mock-image'
);

test('renders Qualification component with qualification items', () => {
  render(<Qualification />);
  expect(screen.getByText('Bachelors.')).toBeInTheDocument();
  expect(screen.getByText('Masters.')).toBeInTheDocument();
  expect(screen.getByText(/Bachelor of Technology/)).toBeInTheDocument();
  expect(screen.getByText(/Master of Science/)).toBeInTheDocument();
});
