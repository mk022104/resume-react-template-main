import { render, screen } from '@testing-library/react';
import ProfileCover from './ProfileCover';

jest.mock('../../../images/londonbuilding.jpg', () => 'mock-image');

test('renders ProfileCover component with image', () => {
  render(<ProfileCover />);
  const img = screen.getByAltText('cover');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'mock-image');
});
