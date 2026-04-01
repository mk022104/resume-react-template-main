import { render, screen } from '@testing-library/react';
import Tooltip from './Tooltip';

test('renders Tooltip component with text and link', () => {
  render(
    <Tooltip
      text="Test Tooltip"
      link="https://example.com"
      icon={<span>Icon</span>}
    />
  );
  expect(screen.getByText('Test Tooltip')).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://example.com'
  );
});
