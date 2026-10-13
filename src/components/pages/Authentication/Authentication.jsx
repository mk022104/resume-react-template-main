import React, { useCallback, useEffect, useState } from 'react';

const initialStatus = {
  checking: true,
  secureContext: false,
  webAuthnSupported: false,
  platformAuthenticator: null,
  conditionalMediation: null,
};

const checkPasskeySupport = async () => {
  const secureContext = typeof window !== 'undefined' && window.isSecureContext;
  const credentialApi =
    typeof window !== 'undefined' ? window.PublicKeyCredential : undefined;
  const credentialsApi =
    typeof navigator !== 'undefined' ? navigator.credentials : undefined;
  const webAuthnSupported = Boolean(
    secureContext && credentialApi && credentialsApi?.get
  );

  if (!webAuthnSupported) {
    return {
      checking: false,
      secureContext: Boolean(secureContext),
      webAuthnSupported: false,
      platformAuthenticator: null,
      conditionalMediation: null,
    };
  }

  const checkOptionalCapability = async (method) => {
    if (typeof credentialApi[method] !== 'function') return null;
    try {
      return await credentialApi[method]();
    } catch {
      return null;
    }
  };

  const [platformAuthenticator, conditionalMediation] = await Promise.all([
    checkOptionalCapability('isUserVerifyingPlatformAuthenticatorAvailable'),
    checkOptionalCapability('isConditionalMediationAvailable'),
  ]);

  return {
    checking: false,
    secureContext: true,
    webAuthnSupported: true,
    platformAuthenticator,
    conditionalMediation,
  };
};

const StatusRow = ({ label, value, detail }) => (
  <li className="flex items-start justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0">
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="mt-1 text-sm text-gray-500">{detail}</p>
    </div>
    <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
      {value}
    </span>
  </li>
);

const Authentication = () => {
  const [status, setStatus] = useState(initialStatus);

  const refreshStatus = useCallback(async () => {
    setStatus((current) => ({ ...current, checking: true }));
    setStatus(await checkPasskeySupport());
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const formatCapability = (value) => {
    if (value === null) return 'Not reported';
    return value ? 'Available' : 'Not available';
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple-800">
          Sign-in technology
        </p>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Passkey readiness
        </h1>
        <p className="mb-6 text-gray-600">
          Check whether this browser and device can use passkeys. Passkeys are
          stored by your browser, device, or password manager—not exposed as a
          list to websites.
        </p>

        <ul aria-live="polite" className="mb-6 divide-y divide-gray-100">
          <StatusRow
            label="Secure connection"
            value={
              status.checking
                ? 'Checking…'
                : status.secureContext
                  ? 'Ready'
                  : 'Required'
            }
            detail="Passkeys require HTTPS or a trusted local development address."
          />
          <StatusRow
            label="Passkey API"
            value={
              status.checking
                ? 'Checking…'
                : status.webAuthnSupported
                  ? 'Supported'
                  : 'Unavailable'
            }
            detail="WebAuthn support in this browser."
          />
          <StatusRow
            label="Device authenticator"
            value={
              status.checking
                ? 'Checking…'
                : formatCapability(status.platformAuthenticator)
            }
            detail="Examples include Touch ID, Windows Hello, or a device PIN."
          />
          <StatusRow
            label="Passkey sign-in suggestion"
            value={
              status.checking
                ? 'Checking…'
                : formatCapability(status.conditionalMediation)
            }
            detail="Whether this browser supports passkey suggestions in a sign-in form."
          />
        </ul>

        {!status.checking && !status.webAuthnSupported && (
          <p
            role="status"
            className="mb-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-900"
          >
            Use a current browser on HTTPS (or localhost) to check passkey
            support.
          </p>
        )}

        <button
          type="button"
          onClick={refreshStatus}
          disabled={status.checking}
          className="rounded-lg bg-purple-900 px-5 py-3 font-semibold text-white hover:bg-purple-800 disabled:cursor-wait disabled:opacity-60"
        >
          {status.checking ? 'Checking browser…' : 'Check again'}
        </button>
      </div>
    </section>
  );
};

export default Authentication;
