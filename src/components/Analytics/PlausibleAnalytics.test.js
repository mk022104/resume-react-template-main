import {
  installGoogleAnalytics,
  installPlausibleAnalytics,
  normalizeGoogleMeasurementId,
  normalizePlausibleDomain,
} from './plausibleAnalyticsUtils';

afterEach(() => {
  document
    .querySelectorAll(
      'script[data-plausible-analytics], script[data-google-analytics]'
    )
    .forEach((script) => script.remove());
  delete window.gtag;
  delete window.dataLayer;
});

test('installs Plausible once for the configured production domain', () => {
  expect(
    installPlausibleAnalytics('portfolio.example.com', {
      environment: 'production',
    })
  ).toBe(true);
  expect(
    installPlausibleAnalytics('portfolio.example.com', {
      environment: 'production',
    })
  ).toBe(false);

  const script = document.querySelector('script[data-plausible-analytics]');
  expect(script).toHaveAttribute('src', 'https://plausible.io/js/script.js');
  expect(script).toHaveAttribute('data-domain', 'portfolio.example.com');
  expect(
    document.querySelectorAll('script[data-plausible-analytics]')
  ).toHaveLength(1);
});

test('does not install analytics without a domain or outside production', () => {
  expect(installPlausibleAnalytics('', { environment: 'production' })).toBe(
    false
  );
  expect(
    installPlausibleAnalytics('portfolio.example.com', {
      environment: 'development',
    })
  ).toBe(false);
  expect(document.querySelector('script[data-plausible-analytics]')).toBeNull();
});

test('allows local development tracking only when explicitly enabled', () => {
  expect(
    installPlausibleAnalytics('localhost', {
      environment: 'development',
      enabledInDevelopment: true,
    })
  ).toBe(true);

  expect(
    document.querySelector('script[data-plausible-analytics]')
  ).toHaveAttribute('data-domain', 'localhost');
});

test('normalizes a domain or URL to the hostname expected by Plausible', () => {
  expect(
    normalizePlausibleDomain('  https://portfolio.example.com/path  ')
  ).toBe('portfolio.example.com');
  expect(normalizePlausibleDomain('localhost')).toBe('localhost');
  expect(normalizePlausibleDomain('')).toBe('');
});

test('installs Google Analytics once for a valid production measurement ID', () => {
  expect(
    installGoogleAnalytics('G-ABC123', { environment: 'production' })
  ).toBe(true);
  expect(
    installGoogleAnalytics('G-ABC123', { environment: 'production' })
  ).toBe(false);

  const script = document.querySelector('script[data-google-analytics]');
  expect(script).toHaveAttribute(
    'src',
    'https://www.googletagmanager.com/gtag/js?id=G-ABC123'
  );
  expect(window.dataLayer).toHaveLength(3);
  expect(window.dataLayer[0][0]).toBe('consent');
  expect(window.dataLayer[2][0]).toBe('config');
  expect(window.dataLayer[2][1]).toBe('G-ABC123');
});

test('keeps Google Analytics disabled outside production unless opted in', () => {
  expect(
    installGoogleAnalytics('G-ABC123', { environment: 'development' })
  ).toBe(false);
  expect(
    installGoogleAnalytics('G-ABC123', {
      environment: 'development',
      enabledInDevelopment: true,
    })
  ).toBe(true);
});

test('accepts only Google Analytics 4 measurement IDs', () => {
  expect(normalizeGoogleMeasurementId(' g-abc123 ')).toBe('G-ABC123');
  expect(normalizeGoogleMeasurementId('UA-12345')).toBe('');
  expect(normalizeGoogleMeasurementId('')).toBe('');
});
