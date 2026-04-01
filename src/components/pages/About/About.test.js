import { render, screen } from '@testing-library/react';
import About from './About';

// Mock the Skills component
jest.mock('./Skills/Skills', () => () => (
  <div data-testid="skills">Skills</div>
));

test('renders About component', () => {
  render(<About />);
  expect(screen.getByText('Who am I?')).toBeInTheDocument();
  expect(
    screen.getByText(/Highly skilled React JS developer/)
  ).toBeInTheDocument();
  expect(screen.getByTestId('skills')).toBeInTheDocument();
});
