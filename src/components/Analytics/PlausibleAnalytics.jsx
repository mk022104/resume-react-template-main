import { useEffect } from 'react';
import {
  installPlausibleAnalytics,
  normalizePlausibleDomain,
} from './plausibleAnalyticsUtils';

const PlausibleAnalytics = () => {
  const domain = normalizePlausibleDomain(
    process.env.REACT_APP_PLAUSIBLE_DOMAIN
  );
  const enabledInDevelopment =
    process.env.REACT_APP_PLAUSIBLE_ENABLE_IN_DEV === 'true';

  useEffect(() => {
    installPlausibleAnalytics(domain, { enabledInDevelopment });
  }, [domain, enabledInDevelopment]);

  return null;
};

export default PlausibleAnalytics;
