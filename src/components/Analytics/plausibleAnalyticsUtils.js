export const normalizePlausibleDomain = (domain) => {
  const value = domain?.trim();
  if (!value) return '';

  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    return url.hostname;
  } catch {
    return '';
  }
};

export const installPlausibleAnalytics = (
  domain,
  {
    environment = process.env.NODE_ENV,
    enabledInDevelopment = false,
    documentRef = document,
  } = {}
) => {
  const siteDomain = normalizePlausibleDomain(domain);
  const shouldLoad =
    environment === 'production' ||
    (environment === 'development' && enabledInDevelopment);

  if (!shouldLoad || !siteDomain) return false;
  if (documentRef.querySelector('script[data-plausible-analytics]'))
    return false;

  const script = documentRef.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.dataset.domain = siteDomain;
  script.dataset.plausibleAnalytics = 'true';
  documentRef.head.appendChild(script);

  return true;
};

export const trackPortfolioEvent = (name, props = {}, windowRef = window) => {
  if (typeof windowRef.plausible === 'function') {
    windowRef.plausible(name, { props });
  }
  if (typeof windowRef.gtag === 'function') {
    windowRef.gtag('event', name, props);
  }
};

export const normalizeGoogleMeasurementId = (measurementId) => {
  const value = measurementId?.trim().toUpperCase();
  return value && /^G-[A-Z0-9]+$/.test(value) ? value : '';
};

export const installGoogleAnalytics = (
  measurementId,
  {
    environment = process.env.NODE_ENV,
    enabledInDevelopment = false,
    documentRef = document,
    windowRef = window,
  } = {}
) => {
  const id = normalizeGoogleMeasurementId(measurementId);
  const shouldLoad =
    environment === 'production' ||
    (environment === 'development' && enabledInDevelopment);

  if (!shouldLoad || !id) return false;
  if (documentRef.querySelector('script[data-google-analytics]')) return false;

  windowRef.dataLayer = windowRef.dataLayer || [];
  windowRef.gtag = function gtag() {
    windowRef.dataLayer.push(arguments);
  };
  windowRef.gtag('js', new Date());
  windowRef.gtag('config', id);

  const script = documentRef.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.dataset.googleAnalytics = 'true';
  documentRef.head.appendChild(script);

  return true;
};
