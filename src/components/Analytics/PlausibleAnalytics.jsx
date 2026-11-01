import { useEffect, useState } from 'react';
import {
  installGoogleAnalytics,
  installPlausibleAnalytics,
  normalizePlausibleDomain,
  setGoogleConsent,
} from './plausibleAnalyticsUtils';

const CONSENT_KEY = 'portfolio_analytics_consent';

const AnalyticsConsent = ({ onConsent }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-consent-title"
      className="w-full max-w-lg rounded-md bg-gray-900 p-6 text-sm text-white shadow-xl"
    >
      <div className="flex flex-col gap-4">
        <h2 id="analytics-consent-title" className="text-lg font-semibold">
          Analytics consent
        </h2>
        <p>
          I use privacy-friendly analytics to understand which portfolio sections
          are useful. Analytics starts only after your consent.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded border border-gray-400 px-4 py-2"
            onClick={() => onConsent(false)}
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded bg-purple-700 px-4 py-2 font-semibold"
            onClick={() => onConsent(true)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PlausibleAnalytics = () => {
  const domain = normalizePlausibleDomain(
    process.env.REACT_APP_PLAUSIBLE_DOMAIN
  );
  const enabledInDevelopment =
    process.env.REACT_APP_PLAUSIBLE_ENABLE_IN_DEV === 'true';
  const googleMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const googleAnalyticsEnabledInDevelopment =
    process.env.REACT_APP_GA_ENABLE_IN_DEV === 'true';
  const [consent, setConsent] = useState(() => {
    try {
      const savedConsent = localStorage.getItem(CONSENT_KEY);
      return savedConsent === null ? null : savedConsent === 'granted';
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (consent === true) {
      installPlausibleAnalytics(domain, { enabledInDevelopment });
      installGoogleAnalytics(googleMeasurementId, {
        enabledInDevelopment: googleAnalyticsEnabledInDevelopment,
      });
      setGoogleConsent(true);
    } else if (consent === false) {
      setGoogleConsent(false);
    }
  }, [
    domain,
    enabledInDevelopment,
    googleMeasurementId,
    googleAnalyticsEnabledInDevelopment,
    consent,
  ]);

  const updateConsent = (granted) => {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    } catch {
      // Analytics remains disabled for visitors whose browser blocks storage.
    }
    setConsent(granted);
  };

  return consent === null ? (
    <AnalyticsConsent onConsent={updateConsent} />
  ) : null;
};

export default PlausibleAnalytics;
