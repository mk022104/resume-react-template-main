import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Authentication from './Authentication';

const savedWindowDescriptors = {
  isSecureContext: Object.getOwnPropertyDescriptor(window, 'isSecureContext'),
  PublicKeyCredential: Object.getOwnPropertyDescriptor(
    window,
    'PublicKeyCredential'
  ),
  credentials: Object.getOwnPropertyDescriptor(navigator, 'credentials'),
};

const setBrowserCapabilities = ({
  secure = true,
  publicKeyCredential,
  credentials,
}) => {
  Object.defineProperty(window, 'isSecureContext', {
    configurable: true,
    value: secure,
  });
  Object.defineProperty(window, 'PublicKeyCredential', {
    configurable: true,
    value: publicKeyCredential,
  });
  Object.defineProperty(navigator, 'credentials', {
    configurable: true,
    value: credentials,
  });
};

const restoreDescriptor = (target, property, descriptor) => {
  if (descriptor) {
    Object.defineProperty(target, property, descriptor);
  } else {
    delete target[property];
  }
};

afterEach(() => {
  restoreDescriptor(
    window,
    'isSecureContext',
    savedWindowDescriptors.isSecureContext
  );
  restoreDescriptor(
    window,
    'PublicKeyCredential',
    savedWindowDescriptors.PublicKeyCredential
  );
  restoreDescriptor(
    navigator,
    'credentials',
    savedWindowDescriptors.credentials
  );
});

test('reports passkey capabilities supported by the current browser and device', async () => {
  setBrowserCapabilities({
    publicKeyCredential: {
      isUserVerifyingPlatformAuthenticatorAvailable: jest
        .fn()
        .mockResolvedValue(true),
      isConditionalMediationAvailable: jest.fn().mockResolvedValue(false),
    },
    credentials: { get: jest.fn() },
  });

  render(<Authentication />);

  await waitFor(() =>
    expect(screen.getByText('Supported')).toBeInTheDocument()
  );
  expect(screen.getByText('Ready')).toBeInTheDocument();
  expect(screen.getByText('Available')).toBeInTheDocument();
  expect(screen.getByText('Not available')).toBeInTheDocument();
  expect(
    screen.getByText(/do not let websites enumerate saved passkeys/i)
  ).toBeInTheDocument();
});

test('explains that WebAuthn needs a secure context and supported browser APIs', async () => {
  setBrowserCapabilities({
    secure: false,
    publicKeyCredential: undefined,
    credentials: undefined,
  });

  render(<Authentication />);

  await waitFor(() => expect(screen.getByText('Required')).toBeInTheDocument());
  expect(screen.getByText('Unavailable')).toBeInTheDocument();
  expect(screen.getByRole('status').textContent).toMatch(
    /HTTPS \(or localhost\)/
  );
});

test('shows unknown when the browser does not expose optional capability checks', async () => {
  setBrowserCapabilities({
    publicKeyCredential: {},
    credentials: { get: jest.fn() },
  });

  render(<Authentication />);

  await waitFor(() =>
    expect(screen.getByText('Supported')).toBeInTheDocument()
  );
  expect(screen.getAllByText('Not reported')).toHaveLength(2);
});
