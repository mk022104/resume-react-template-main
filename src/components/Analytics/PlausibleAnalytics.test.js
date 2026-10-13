import {
  installPlausibleAnalytics,
  normalizePlausibleDomain,
} from './plausibleAnalyticsUtils';

afterEach(() => {
  document
    .querySelectorAll('script[data-plausible-analytics]')
    .forEach((script) => script.remove());
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
