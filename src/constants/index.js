export const ANALYTICS_CONSENT_KEY = 'portfolio_analytics_consent';

export const ANALYTICS_ROUTE_TITLES = {
  '/': 'About',
  '/about': 'About',
  '/services': 'Services',
  '/portfolio': 'Experience',
  '/qualification': 'Education Details',
  '/contact': 'Contact',
  '/group': 'Info',
};

export const CHAT_WELCOME_MESSAGE =
  "Hi! Ask me about Madhukar's resume (skills, jobs, education, contact) or any general question.";

export const CONTACT_MAX_CHARACTERS = 500;

export const GRID_CARD_WRAPPER_CLASS_NAME = 'w-full lg:w-1/2';
export const GRID_CARD_CONTENT_CLASS_NAME =
  'my-4 md:mx-4 shadow p-6 rounded-md bg-white group hover:shadow-md';

export const MAX_ERROR_DESCRIPTION_LENGTH = 500;
export const MAX_ERROR_STACK_LENGTH = 1500;

export const AUTH_INITIAL_STATUS = {
  checking: true,
  secureContext: false,
  webAuthnSupported: false,
  platformAuthenticator: null,
  conditionalMediation: null,
};

export const GROUP_TEXT_FRAGMENTS = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

export const ENV = {
  get GEMINI_API_KEY() {
    return process.env.REACT_APP_GEMINI_API_KEY;
  },
  get PORTFOLIO_DATA_URL() {
    return process.env.REACT_APP_PORTFOLIO_DATA_URL;
  },
  get PLAUSIBLE_DOMAIN() {
    return process.env.REACT_APP_PLAUSIBLE_DOMAIN;
  },
  get PLAUSIBLE_ENABLE_IN_DEV() {
    return process.env.REACT_APP_PLAUSIBLE_ENABLE_IN_DEV === 'true';
  },
  get GOOGLE_MEASUREMENT_ID() {
    return process.env.REACT_APP_GA_MEASUREMENT_ID;
  },
  get GOOGLE_ENABLE_IN_DEV() {
    return process.env.REACT_APP_GA_ENABLE_IN_DEV === 'true';
  },
};
