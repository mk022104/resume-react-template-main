import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Weather from './Weather';

const forecast = {
  timezone: 'America/New_York',
  current: {
    time: '2026-11-24T14:00',
    temperature_2m: 52.4,
    relative_humidity_2m: 40,
    apparent_temperature: 42.4,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 13.5,
  },
  daily: {
    time: ['2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27'],
    weather_code: [0, 61, 3, 2],
    temperature_2m_max: [58, 55, 60, 51],
    temperature_2m_min: [40, 39, 43, 39],
    precipitation_probability_max: [5, 80, 90, 10],
  },
  hourly: {
    time: [
      '2026-11-24T13:00',
      '2026-11-24T14:00',
      '2026-11-24T15:00',
      '2026-11-24T23:00',
      '2026-11-25T00:00',
      '2026-11-25T12:00',
      '2026-11-25T23:00',
      '2026-11-26T00:00',
    ],
    temperature_2m: [50, 52, 53, 40, 39, 50, 45, 43],
    precipitation_probability: [0, 0, 10, 20, 50, 60, 75, 0],
    weather_code: [0, 0, 2, 3, 61, 61, 63, 3],
    wind_speed_10m: [5, 7, 8, 9, 10, 11, 12, 4],
  },
};

describe('Weather', () => {
  let getCurrentPosition;
  let originalFetch;

  beforeEach(() => {
    getCurrentPosition = jest.fn();
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition },
    });
    originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(forecast),
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('uses browser coordinates to show real-time conditions and a four-day forecast', async () => {
    getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 35.7, longitude: -78.8 } })
    );
    const { container } = render(<Weather />);

    expect(await screen.findAllByText('Clear sky')).toHaveLength(2);
    expect(screen.getByText('35.700°, -78.800°')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '4-day forecast' })).toBeInTheDocument();
    expect(screen.getByText(/Feels like/)).toHaveTextContent('Feels like 42°');
    expect(container.querySelector('.weather-temperature')).toHaveTextContent(
      '52°'
    );
    expect(screen.getByText('80% rain')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('latitude=35.7'),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(global.fetch.mock.calls[0][0]).toContain('forecast_days=4');
    expect(global.fetch.mock.calls[0][0]).toContain(
      'hourly=temperature_2m%2Cprecipitation_probability%2Cweather_code%2Cwind_speed_10m'
    );

    const celsiusButton = screen.getByRole('button', { name: 'Celsius' });
    fireEvent.click(celsiusButton);
    expect(celsiusButton).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.weather-temperature')).toHaveTextContent(
      '11°'
    );
    expect(container.querySelectorAll('.weather-day-temperatures')[0]).toHaveTextContent(
      '14°4°'
    );

    const fahrenheitButton = screen.getByRole('button', { name: 'Fahrenheit' });
    fireEvent.click(fahrenheitButton);
    expect(fahrenheitButton).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.weather-temperature')).toHaveTextContent(
      '52°'
    );
  });

  it('explains denied location permission and retries on request', async () => {
    getCurrentPosition.mockImplementation((success, error) =>
      error({ code: 1 })
    );
    render(<Weather />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Allow location access in your browser settings'
    );

    getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 35.7, longitude: -78.8 } })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    expect(await screen.findAllByText('Clear sky')).toHaveLength(2);
  });

  it('refreshes forecast data on demand without requesting location again', async () => {
    getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 35.7, longitude: -78.8 } })
    );
    render(<Weather />);

    expect(await screen.findAllByText('Clear sky')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Refresh weather' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    expect(getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  it('automatically refreshes forecast data every 15 minutes', async () => {
    const intervalSpy = jest.spyOn(window, 'setInterval');
    getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 35.7, longitude: -78.8 } })
    );
    render(<Weather />);

    expect(await screen.findAllByText('Clear sky')).toHaveLength(2);
    const refreshInterval = intervalSpy.mock.calls.find(
      ([, delay]) => delay === 15 * 60 * 1000
    );
    expect(refreshInterval).toBeDefined();

    act(() => refreshInterval[0]());
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  it('shows hourly conditions from the current hour through midnight and for selected future days', async () => {
    getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 35.7, longitude: -78.8 } })
    );
    const { container } = render(<Weather />);

    expect(await screen.findAllByText('Clear sky')).toHaveLength(2);
    fireEvent.click(
      screen.getByRole('button', { name: 'Show hourly forecast for Today' })
    );

    expect(
      screen.getByRole('heading', { name: 'Hourly forecast · Today' })
    ).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll('.weather-hour time')).map((time) =>
        time.textContent
      )
    ).toEqual(['2 PM', '3 PM', '11 PM']);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show hourly forecast for Wednesday, November 25',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: 'Hourly forecast · Wednesday, November 25',
      })
    ).toBeInTheDocument();
    expect(
      Array.from(container.querySelectorAll('.weather-hour time')).map((time) =>
        time.textContent
      )
    ).toEqual(['12 AM', '12 PM', '11 PM']);
  });
});
