import { useEffect } from 'react';
import {
  installGoogleAnalytics,
  installPlausibleAnalytics,
  normalizePlausibleDomain,
} from './plausibleAnalyticsUtils';

const PlausibleAnalytics = () => {
  const domain = normalizePlausibleDomain(
    process.env.REACT_APP_PLAUSIBLE_DOMAIN
  );
  const enabledInDevelopment =
    process.env.REACT_APP_PLAUSIBLE_ENABLE_IN_DEV === 'true';
  const googleMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const googleAnalyticsEnabledInDevelopment =
    process.env.REACT_APP_GA_ENABLE_IN_DEV === 'true';

  useEffect(() => {
    installPlausibleAnalytics(domain, { enabledInDevelopment });
    installGoogleAnalytics(googleMeasurementId, {
      enabledInDevelopment: googleAnalyticsEnabledInDevelopment,
    });
  }, [
    domain,
    enabledInDevelopment,
    googleMeasurementId,
    googleAnalyticsEnabledInDevelopment,
  ]);

  return null;
};

export default PlausibleAnalytics;
