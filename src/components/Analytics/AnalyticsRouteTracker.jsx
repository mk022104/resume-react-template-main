import { useEffect } from 'react';

export default function AnalyticsRouteTracker({ locationRef, windowRef = window }) {
  useEffect(() => {
    const trackPageView = () => {
      if (typeof windowRef.gtag !== 'function') return;

      const routeTitles = {
        '/': 'About',
        '/about': 'About',
        '/services': 'Services',
        '/portfolio': 'Experience',
        '/qualification': 'Education Details',
        '/contact': 'Contact',
        '/group': 'Info',
      };
      const normalizedPath = locationRef.pathname.toLowerCase();
      windowRef.gtag('event', 'page_view', {
        page_location: windowRef.location.href,
        page_path: `${locationRef.pathname}${locationRef.search}${locationRef.hash}`,
        page_title: routeTitles[normalizedPath] || windowRef.document.title,
      });
    };

    const retry = windowRef.setTimeout(trackPageView, 0);
    return () => windowRef.clearTimeout(retry);
  }, [locationRef.pathname, locationRef.search, locationRef.hash, windowRef]);

  return null;
}
