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
    screen.getByText(/Senior React JS \/ Frontend Developer with 10\+ years/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Currently Senior UI Developer at Pearson/)
  ).toBeInTheDocument();
  expect(screen.getByTestId('skills')).toBeInTheDocument();
});
