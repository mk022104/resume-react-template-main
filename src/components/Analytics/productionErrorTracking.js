import {
  MAX_ERROR_DESCRIPTION_LENGTH,
  MAX_ERROR_STACK_LENGTH,
} from '../../constants';

const sanitizeError = (error) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : 'Unknown browser error';

  return message
    .replace(/\s+/g, ' ')
    .slice(0, MAX_ERROR_DESCRIPTION_LENGTH);
};

const sanitizeStack = (error, componentStack) => {
  const stack = componentStack || (error instanceof Error ? error.stack : '');
  return String(stack || '').slice(0, MAX_ERROR_STACK_LENGTH);
};

export const reportProductionError = (error, details = {}, windowRef = window) => {
  if (process.env.NODE_ENV === 'development') return false;
  if (typeof windowRef.gtag !== 'function') return false;

  windowRef.gtag('event', 'exception', {
    description: sanitizeError(error),
    fatal: details.source === 'react_error_boundary',
    page_path: windowRef.location.pathname,
    source: details.source || 'browser',
    stack_trace: sanitizeStack(error, details.component_stack),
  });

  return true;
};

export const installProductionErrorTracking = (windowRef = window) => {
  const handleWindowError = (event) => {
    reportProductionError(
      event.error || event.message,
      { source: 'window_error' },
      windowRef
    );
  };

  const handleUnhandledRejection = (event) => {
    reportProductionError(event.reason, {
      source: 'unhandled_promise_rejection',
    }, windowRef);
  };

  windowRef.addEventListener('error', handleWindowError);
  windowRef.addEventListener('unhandledrejection', handleUnhandledRejection);

  return () => {
    windowRef.removeEventListener('error', handleWindowError);
    windowRef.removeEventListener('unhandledrejection', handleUnhandledRejection);
  };
};
