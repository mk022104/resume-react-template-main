import { useEffect } from 'react';
import { ANALYTICS_ROUTE_TITLES } from '../../constants';

export default function AnalyticsRouteTracker({ locationRef, windowRef = window }) {
  useEffect(() => {
    const trackPageView = () => {
      if (typeof windowRef.gtag !== 'function') return;

      const normalizedPath = locationRef.pathname.toLowerCase();
      windowRef.gtag('event', 'page_view', {
        page_location: windowRef.location.href,
        page_path: `${locationRef.pathname}${locationRef.search}${locationRef.hash}`,
        page_title:
          ANALYTICS_ROUTE_TITLES[normalizedPath] || windowRef.document.title,
      });
    };

    const retry = windowRef.setTimeout(trackPageView, 0);
    return () => windowRef.clearTimeout(retry);
  }, [locationRef.pathname, locationRef.search, locationRef.hash, windowRef]);

  return null;
}
