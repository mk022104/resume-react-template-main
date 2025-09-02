import { render, screen } from '@testing-library/react';
import About from './About';

test('renders About component', () => {
    render(<About />);
    const linkElement = screen.getByText(/About Us/i);
    expect(linkElement).toBeInTheDocument();
});