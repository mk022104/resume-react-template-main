import { render, screen } from '@testing-library/react';
import ProfileCover from './ProfileCover';

// Mock the image
jest.mock('../../../images/pexels-souvenirpixels.jpg', () => 'mock-image');

test('renders ProfileCover component with image', () => {
  render(<ProfileCover />);
  const img = screen.getByAltText('cover');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'mock-image');
});
