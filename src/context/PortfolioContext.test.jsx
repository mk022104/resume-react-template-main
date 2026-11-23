import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  PortfolioProvider,
  usePortfolioData,
} from './PortfolioContext';

const DataConsumer = () => {
  const data = usePortfolioData();

  return (
    <button
      type="button"
      onClick={() =>
        data.updateData((current) => ({
          ...current,
          profile: { ...current.profile, name: 'Updated Name' },
        }))
      }
    >
      {data.profile.name}
    </button>
  );
};

describe('PortfolioProvider', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('uses default portfolio data when no URL is provided', () => {
    render(
      <PortfolioProvider>
        <DataConsumer />
      </PortfolioProvider>
    );

    expect(screen.getByRole('button', { name: 'Madhukar Ganga' })).toBeInTheDocument();
  });

  test('loads and deep-merges remote data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        profile: { name: 'Remote Name' },
      }),
    });

    render(
      <PortfolioProvider dataUrl="/portfolio-data.json">
        <DataConsumer />
      </PortfolioProvider>
    );

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Remote Name' })).toBeInTheDocument()
    );
  });

  test('supports local data updates', () => {
    render(
      <PortfolioProvider>
        <DataConsumer />
      </PortfolioProvider>
    );

    screen.getByRole('button').click();

    expect(screen.getByRole('button', { name: 'Updated Name' })).toBeInTheDocument();
  });

  test('logs an unsuccessful remote data response', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    });

    render(
      <PortfolioProvider dataUrl="/portfolio-data.json">
        <DataConsumer />
      </PortfolioProvider>
    );

    await waitFor(() =>
      expect(consoleError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Unable to load portfolio data (503)',
        })
      )
    );
  });

  test('aborts in-flight data loading on unmount', () => {
    const abort = jest.fn();
    jest.spyOn(global, 'AbortController').mockImplementation(() => ({
      abort,
      signal: {},
    }));
    jest.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );

    const { unmount } = render(
      <PortfolioProvider dataUrl="/portfolio-data.json">
        <DataConsumer />
      </PortfolioProvider>
    );

    unmount();
    expect(abort).toHaveBeenCalled();
  });
});
