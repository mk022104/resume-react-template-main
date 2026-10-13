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
