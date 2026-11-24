import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaBolt,
  FaCloud,
  FaCloudRain,
  FaCloudSun,
  FaSmog,
  FaSnowflake,
  FaSun,
} from 'react-icons/fa';
import './Weather.css';

const WEATHER_REFRESH_INTERVAL = 15 * 60 * 1000;

const WEATHER_CODES = {
  0: { label: 'Clear sky', Icon: FaSun },
  1: { label: 'Mainly clear', Icon: FaSun },
  2: { label: 'Partly cloudy', Icon: FaCloudSun },
  3: { label: 'Overcast', Icon: FaCloud },
  45: { label: 'Fog', Icon: FaSmog },
  48: { label: 'Depositing rime fog', Icon: FaSmog },
  51: { label: 'Light drizzle', Icon: FaCloudRain },
  53: { label: 'Drizzle', Icon: FaCloudRain },
  55: { label: 'Dense drizzle', Icon: FaCloudRain },
  56: { label: 'Freezing drizzle', Icon: FaCloudRain },
  57: { label: 'Freezing drizzle', Icon: FaCloudRain },
  61: { label: 'Light rain', Icon: FaCloudRain },
  63: { label: 'Rain', Icon: FaCloudRain },
  65: { label: 'Heavy rain', Icon: FaCloudRain },
  66: { label: 'Freezing rain', Icon: FaCloudRain },
  67: { label: 'Heavy freezing rain', Icon: FaCloudRain },
  71: { label: 'Light snow', Icon: FaSnowflake },
  73: { label: 'Snow', Icon: FaSnowflake },
  75: { label: 'Heavy snow', Icon: FaSnowflake },
  77: { label: 'Snow grains', Icon: FaSnowflake },
  80: { label: 'Rain showers', Icon: FaCloudRain },
  81: { label: 'Rain showers', Icon: FaCloudRain },
  82: { label: 'Heavy rain showers', Icon: FaCloudRain },
  85: { label: 'Snow showers', Icon: FaSnowflake },
  86: { label: 'Heavy snow showers', Icon: FaSnowflake },
  95: { label: 'Thunderstorm', Icon: FaBolt },
  96: { label: 'Thunderstorm with hail', Icon: FaBolt },
  99: { label: 'Thunderstorm with hail', Icon: FaBolt },
};

const getWeather = (code) =>
  WEATHER_CODES[code] || { label: 'Conditions unavailable', Icon: FaCloud };

const describeLocationError = (error) => {
  if (error.code === 1) {
    return 'Location access is blocked. Allow location access in your browser settings, then try again.';
  }
  if (error.code === 3) {
    return 'Your location took too long to respond. Check your connection and try again.';
  }
  return 'We could not determine your location. Check your browser settings and try again.';
};

const formatDay = (date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));

const formatLongDay = (date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));

const formatHour = (time) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${time}Z`));

const formatTemperature = (temperature, unit) =>
  Math.round(unit === 'celsius' ? ((temperature - 32) * 5) / 9 : temperature);

const Weather = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('locating');
  const [errorMessage, setErrorMessage] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('fahrenheit');
  const [selectedForecastDate, setSelectedForecastDate] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const hasLoadedWeather = useRef(false);

  const requestLocation = useCallback(() => {
    setWeather(null);
    setCoordinates(null);
    setErrorMessage('');
    setLastUpdated(null);
    setIsRefreshing(false);
    hasLoadedWeather.current = false;
    setStatus('locating');

    if (!navigator.geolocation) {
      setErrorMessage(
        'Location is not available in this browser. Try a current browser over a secure connection.'
      );
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ latitude, longitude });
        setStatus('loading');
      },
      (error) => {
        setErrorMessage(describeLocationError(error));
        setStatus('error');
      },
      { enableHighAccuracy: true, maximumAge: 600000, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const refreshWeather = useCallback(() => {
    if (!coordinates) {
      requestLocation();
      return;
    }

    setErrorMessage('');
    setIsRefreshing(true);
    setRefreshKey((current) => current + 1);
  }, [coordinates, requestLocation]);

  useEffect(() => {
    if (!coordinates) return undefined;

    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
      hourly:
        'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
      daily:
        'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'auto',
      forecast_days: '4',
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Weather service returned an error (${response.status}).`);
        }
        return response.json();
      })
      .then((data) => {
        const hourlyFields = [
          'temperature_2m',
          'precipitation_probability',
          'weather_code',
          'wind_speed_10m',
        ];
        const hasHourlyForecast =
          data.hourly?.time?.length &&
          hourlyFields.every(
            (field) => data.hourly[field]?.length === data.hourly.time.length
          );
        if (
          !data.current ||
          !data.daily ||
          data.daily.time?.length !== 4 ||
          !hasHourlyForecast
        ) {
          throw new Error('The weather service returned incomplete forecast data.');
        }
        setWeather(data);
        hasLoadedWeather.current = true;
        setLastUpdated(new Date());
        setErrorMessage('');
        setIsRefreshing(false);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setErrorMessage(error.message || 'Weather data could not be loaded.');
        setIsRefreshing(false);
        if (!hasLoadedWeather.current) setStatus('error');
      });

    const refreshInterval = window.setInterval(() => {
      setErrorMessage('');
      setIsRefreshing(true);
      setRefreshKey((current) => current + 1);
    }, WEATHER_REFRESH_INTERVAL);

    return () => {
      controller.abort();
      window.clearInterval(refreshInterval);
    };
  }, [coordinates, refreshKey]);

  const currentWeather = weather && getWeather(weather.current.weather_code);
  const CurrentIcon = currentWeather?.Icon;
  const currentDate = weather?.current.time.slice(0, 10);
  const selectedDate =
    weather?.daily.time.includes(selectedForecastDate) && selectedForecastDate;
  const selectedDateLabel = selectedDate
    ? selectedDate === currentDate
      ? 'Today'
      : formatLongDay(selectedDate)
    : '';
  const selectedHours = selectedDate
    ? weather.hourly.time.reduce((hours, time, index) => {
        const isSelectedDate = time.slice(0, 10) === selectedDate;
        const isCurrentOrFutureHour =
          selectedDate !== currentDate ||
          time.slice(0, 13) >= weather.current.time.slice(0, 13);

        if (isSelectedDate && isCurrentOrFutureHour) {
          hours.push({ time, index });
        }
        return hours;
      }, [])
    : [];

  return (
    <section className="weather-page" aria-labelledby="weather-title">
      <header className="weather-heading">
        <div>
          <p className="weather-eyebrow">YOUR LOCAL FORECAST</p>
          <h1 id="weather-title">Weather, right where you are.</h1>
          <p className="weather-subtitle">
            A live look at today and the next three days.
          </p>
        </div>
        <button
          className="weather-refresh"
          type="button"
          onClick={refreshWeather}
          disabled={
            status === 'locating' || status === 'loading' || isRefreshing
          }
        >
          <span aria-hidden="true">↻</span>
          Refresh weather
        </button>
      </header>

      {status === 'locating' || status === 'loading' ? (
        <div className="weather-message" role="status" aria-live="polite">
          <span className="weather-spinner" aria-hidden="true" />
          <p>
            {status === 'locating'
              ? 'Getting your location…'
              : 'Finding your local forecast…'}
          </p>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="weather-error" role="alert">
          <span className="weather-error-icon" aria-hidden="true">
            !
          </span>
          <div>
            <h2>We can’t show your local weather yet</h2>
            <p>{errorMessage}</p>
            <button type="button" onClick={requestLocation}>
              Try again
            </button>
          </div>
        </div>
      ) : null}

      {status === 'ready' && isRefreshing ? (
        <p className="weather-refreshing" role="status" aria-live="polite">
          Refreshing the latest forecast…
        </p>
      ) : null}

      {status === 'ready' && weather ? (
        <>
          <div className="weather-hero">
            <div className="weather-hero-copy">
              <p className="weather-location-label">CURRENT LOCATION</p>
              <p className="weather-coordinates">
                {coordinates.latitude.toFixed(3)}°,{' '}
                {coordinates.longitude.toFixed(3)}°
              </p>
              <div className="weather-current">
                <CurrentIcon className="weather-current-icon" aria-hidden="true" />
                <div>
                  <p className="weather-condition">{currentWeather.label}</p>
                  <p className="weather-temperature">
                    {formatTemperature(
                      weather.current.temperature_2m,
                      temperatureUnit
                    )}
                    <span>°</span>
                  </p>
                </div>
              </div>
              <p className="weather-updated">
                Feels like{' '}
                {formatTemperature(
                  weather.current.apparent_temperature,
                  temperatureUnit
                )}
                °
                <span aria-hidden="true"> · </span>
                Updated{' '}
                {new Intl.DateTimeFormat('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                }).format(lastUpdated)}
              </p>
            </div>
            <div className="weather-highlights" aria-label="Current conditions">
              <WeatherMetric
                label="Humidity"
                value={`${weather.current.relative_humidity_2m}%`}
                icon="◌"
              />
              <WeatherMetric
                label="Wind"
                value={`${Math.round(weather.current.wind_speed_10m)} mph`}
                icon="↗"
              />
              <WeatherMetric
                label="Rain"
                value={`${weather.current.precipitation.toFixed(2)} in`}
                icon="⌁"
              />
            </div>
          </div>

          <section className="weather-forecast" aria-labelledby="forecast-title">
            <div className="weather-forecast-heading">
              <div>
                <p className="weather-eyebrow">COMING UP</p>
                <h2 id="forecast-title">4-day forecast</h2>
              </div>
              <div
                className="weather-unit-control"
                role="group"
                aria-label="Temperature units"
              >
                <span>Temperature</span>
                <button
                  type="button"
                  aria-label="Fahrenheit"
                  aria-pressed={temperatureUnit === 'fahrenheit'}
                  onClick={() => setTemperatureUnit('fahrenheit')}
                >
                  °F
                </button>
                <button
                  type="button"
                  aria-label="Celsius"
                  aria-pressed={temperatureUnit === 'celsius'}
                  onClick={() => setTemperatureUnit('celsius')}
                >
                  °C
                </button>
              </div>
            </div>
            <div className="weather-days">
              {weather.daily.time.map((date, index) => {
                const { label, Icon } = getWeather(weather.daily.weather_code[index]);
                const dayLabel = index === 0 ? 'Today' : formatDay(date);
                const accessibleDayLabel =
                  date === currentDate ? 'Today' : formatLongDay(date);
                const isSelected = selectedDate === date;
                return (
                  <button
                    className={`weather-day ${
                      isSelected ? 'weather-day--selected' : ''
                    }`}
                    type="button"
                    key={date}
                    aria-label={`Show hourly forecast for ${accessibleDayLabel}`}
                    aria-expanded={isSelected}
                    aria-controls="weather-hourly"
                    onClick={() =>
                      setSelectedForecastDate(isSelected ? null : date)
                    }
                  >
                    <h3>{dayLabel}</h3>
                    <Icon className="weather-day-icon" aria-hidden="true" />
                    <p className="weather-day-condition">{label}</p>
                    <p className="weather-day-temperatures">
                      <strong>
                        {formatTemperature(
                          weather.daily.temperature_2m_max[index],
                          temperatureUnit
                        )}
                        °
                      </strong>
                      <span>
                        {formatTemperature(
                          weather.daily.temperature_2m_min[index],
                          temperatureUnit
                        )}
                        °
                      </span>
                    </p>
                    <p className="weather-day-rain">
                      <span aria-hidden="true">↗</span>{' '}
                      {weather.daily.precipitation_probability_max[index]}% rain
                    </p>
                  </button>
                );
              })}
            </div>
            {selectedDate ? (
              <section
                className="weather-hourly"
                id="weather-hourly"
                aria-labelledby="hourly-title"
              >
                <div className="weather-hourly-heading">
                  <div>
                    <p className="weather-eyebrow">HOUR BY HOUR</p>
                    <h3 id="hourly-title">
                      Hourly forecast · {selectedDateLabel}
                    </h3>
                  </div>
                  <p>
                    {selectedDate === currentDate
                      ? 'From the current hour through midnight'
                      : 'Local time'}
                  </p>
                </div>
                <div
                  className="weather-hourly-list"
                  aria-label={`Hourly weather for ${selectedDateLabel}`}
                >
                  {selectedHours.map(({ time, index }) => {
                    const { label: hourlyLabel, Icon: HourlyIcon } = getWeather(
                      weather.hourly.weather_code[index]
                    );
                    return (
                      <article className="weather-hour" key={time}>
                        <time dateTime={time}>{formatHour(time)}</time>
                        <HourlyIcon
                          className="weather-hour-icon"
                          aria-hidden="true"
                        />
                        <strong>
                          {formatTemperature(
                            weather.hourly.temperature_2m[index],
                            temperatureUnit
                          )}
                          °
                        </strong>
                        <span className="weather-hour-condition">
                          {hourlyLabel}
                        </span>
                        <span className="weather-hour-rain">
                          {weather.hourly.precipitation_probability[index]}% rain
                        </span>
                        <span className="weather-hour-wind">
                          {Math.round(weather.hourly.wind_speed_10m[index])} mph wind
                        </span>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}
            <p className="weather-attribution">
              Forecast updates every 15 minutes by{' '}
              <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
                Open-Meteo
              </a>
            </p>
            {errorMessage ? (
              <p className="weather-refresh-error" role="status">
                The latest refresh failed. Showing the last available forecast.
              </p>
            ) : null}
          </section>
        </>
      ) : null}
    </section>
  );
};

const WeatherMetric = ({ label, value, icon }) => (
  <div className="weather-metric">
    <span className="weather-metric-icon" aria-hidden="true">
      {icon}
    </span>
    <div>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  </div>
);

export default Weather;
