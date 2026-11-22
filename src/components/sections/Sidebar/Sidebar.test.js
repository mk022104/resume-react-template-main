import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

// Mock images
jest.mock('../../../images/portfolio/Madhukar.jpg', () => 'mock-avatar');

test('renders Sidebar component with user info', () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  expect(screen.getByText('Madhukar Ganga')).toBeInTheDocument();
  expect(screen.getByText('Senior UI Developer')).toBeInTheDocument();
  expect(screen.getByText('Pearson Educational')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Download resume as DOCX' })).toHaveAttribute(
    'href',
    '/MadhukarReddyUpdated%20Resume.docx'
  );
});
