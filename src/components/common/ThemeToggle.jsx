import { useEffect, useRef, useState } from 'react';
import {
  THEME_LOCATION_KEY,
  THEME_STORAGE_KEY,
  DAY_START_HOUR,
  NIGHT_START_HOUR,
} from '../../constants';

export const getTimeBasedTheme = (date = new Date()) => {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? 'light' : 'dark';
};

const normalizeAngle = (angle) => ((angle + 360) % 360);
const normalizeTime = (time) => ((time % 24) + 24) % 24;

export const getSunTimes = (date, latitude, longitude) => {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (new Date(date.getFullYear(), date.getMonth(), date.getDate()) - startOfYear)
      / 86400000
  );

  const calculate = (isSunrise) => {
    const longitudeHour = longitude / 15;
    const approximateTime = isSunrise ? 6 : 18;
    const t = dayOfYear + (approximateTime - longitudeHour) / 24;
    const meanAnomaly = 0.9856 * t - 3.289;
    const trueLongitude =
      meanAnomaly +
      1.916 * Math.sin((meanAnomaly * Math.PI) / 180) +
      0.020 * Math.sin((2 * meanAnomaly * Math.PI) / 180) +
      282.634;
    const normalizedLongitude = normalizeAngle(trueLongitude);

    let rightAscension =
      (Math.atan(0.91764 * Math.tan((normalizedLongitude * Math.PI) / 180)) *
        180) /
      Math.PI;
    rightAscension = normalizeAngle(rightAscension);
    const longitudeQuadrant = Math.floor(normalizedLongitude / 90) * 90;
    const rightAscensionQuadrant = Math.floor(rightAscension / 90) * 90;
    rightAscension =
      (rightAscension + longitudeQuadrant - rightAscensionQuadrant) / 15;

    const declinationSin = 0.39782 * Math.sin((normalizedLongitude * Math.PI) / 180);
    const declinationCos = Math.cos(Math.asin(declinationSin));
    const latitudeRadians = (latitude * Math.PI) / 180;
    const zenithCos = Math.cos((90.833 * Math.PI) / 180);
    const hourAngleCos =
      (zenithCos - declinationSin * Math.sin(latitudeRadians)) /
      (declinationCos * Math.cos(latitudeRadians));

    if (hourAngleCos > 1 || hourAngleCos < -1) return null;

    let hourAngle =
      isSunrise
        ? 360 -
          (Math.acos(hourAngleCos) * 180) / Math.PI
        : (Math.acos(hourAngleCos) * 180) / Math.PI;
    hourAngle /= 15;

    const localMeanTime =
      hourAngle +
      rightAscension -
      0.06571 * t -
      6.622;
    const utcHours = normalizeTime(localMeanTime - longitudeHour);

    const hours = Math.floor(utcHours);
    const minutes = Math.floor((utcHours - hours) * 60);
    const seconds = Math.round((((utcHours - hours) * 60) - minutes) * 60);

    const time = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      seconds
    ));

    if (!isSunrise && time.getUTCHours() < 12) {
      time.setUTCDate(time.getUTCDate() + 1);
    }

    return time;
  };

  return {
    sunrise: calculate(true),
    sunset: calculate(false),
  };
};

export const getSolarTheme = (
  date = new Date(),
  location = null
) => {
  if (!location) return getTimeBasedTheme(date);

  const { latitude, longitude } = location;
  const sunTimes = getSunTimes(date, latitude, longitude);
  if (!sunTimes?.sunrise || !sunTimes?.sunset) return getTimeBasedTheme(date);

  if (date >= sunTimes.sunrise && date < sunTimes.sunset) return 'light';
  return 'dark';
};

export const getStoredLocation = () => {
  try {
    const value = JSON.parse(localStorage.getItem(THEME_LOCATION_KEY));
    if (
      Number.isFinite(value?.latitude) &&
      Number.isFinite(value?.longitude)
    ) {
      return value;
    }
  } catch {
    // Fall back to the fixed schedule.
  }
  return null;
};

const storeTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme still applies for the current visit if storage is unavailable.
  }
};

export const getActiveTheme = (
  date = new Date(),
  location = getStoredLocation()
) => getSolarTheme(date, location);

export default function ThemeToggle() {
  const [location, setLocation] = useState(getStoredLocation);
  const [theme, setTheme] = useState(() => getActiveTheme(new Date(), getStoredLocation()));
  const manualOverride = useRef(null);

  useEffect(() => {
    try {
      localStorage.removeItem('portfolio_theme_sunset_offset_minutes');
      localStorage.removeItem('portfolio_theme_override_at');
      localStorage.removeItem('shopifySelectors');
      localStorage.removeItem(
        'ph_phc_C8xtXKxDp8DDyZ96ZVPoF27P2iiH35iuhh42piHrCpcr_posthog'
      );
    } catch {
      // Obsolete settings are ignored when storage is unavailable.
    }

    if (location || !navigator.geolocation) return undefined;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          updatedAt: Date.now(),
        };
        try {
          localStorage.setItem(
            THEME_LOCATION_KEY,
            JSON.stringify(nextLocation)
          );
        } catch {
          // Theme continues to use the fallback schedule.
        }
        setLocation(nextLocation);
      },
      () => {
        // Permission denial or unavailable location uses the fixed fallback.
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 86400000 }
    );

    return undefined;
  }, [location]);

  useEffect(() => {
    const applyTheme = (nextTheme) => {
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      document.documentElement.style.colorScheme = nextTheme;
      storeTheme(nextTheme);
    };

    const updateTheme = () => {
      const now = new Date();
      const solarTheme = getSolarTheme(now, location);
      const activeTheme =
        manualOverride.current?.solarTheme === solarTheme
          ? manualOverride.current.theme
          : solarTheme;

      if (manualOverride.current?.solarTheme !== solarTheme) {
        manualOverride.current = null;
      }

      setTheme(activeTheme);
      applyTheme(activeTheme);
    };

    updateTheme();
    const timer = window.setInterval(updateTheme, 60 * 1000);
    return () => window.clearInterval(timer);
  }, [location]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    manualOverride.current = {
      solarTheme: getSolarTheme(new Date(), location),
      theme: nextTheme,
    };
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.style.colorScheme = nextTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme still works for the current visit if storage is unavailable.
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  );
}
