import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { installVercelAnalytics } from './plausibleAnalyticsUtils';
import PlausibleAnalytics from './PlausibleAnalytics';

jest.mock('./plausibleAnalyticsUtils', () => ({
  installGoogleAnalytics: jest.fn(),
  installPlausibleAnalytics: jest.fn(),
  installVercelAnalytics: jest.fn(),
  normalizePlausibleDomain: jest.fn(() => ''),
  setGoogleConsent: jest.fn(),
}));

describe('analytics consent', () => {
  beforeEach(() => {
    localStorage.clear();
    installVercelAnalytics.mockClear();
  });

  it('installs Vercel Analytics only after consent is accepted', async () => {
    render(<PlausibleAnalytics />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(installVercelAnalytics).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    await waitFor(() => {
      expect(installVercelAnalytics).toHaveBeenCalledTimes(1);
    });
    expect(localStorage.getItem('portfolio_analytics_consent')).toBe('granted');
  });

  it('does not install Vercel Analytics when consent is declined', () => {
    render(<PlausibleAnalytics />);
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));

    expect(installVercelAnalytics).not.toHaveBeenCalled();
    expect(localStorage.getItem('portfolio_analytics_consent')).toBe('denied');
  });
});
