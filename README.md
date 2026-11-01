# Set up the React project:::

    1. Clone the project using git clone.
    2. Install the dependencies using npm install.
    3. Start the server using the npm start command.
    4. Runs the app in development mode.
    Open https://madhuresume.netlify.app/ to view it in the browser.

## Optional traffic analytics

This project supports privacy-focused, cookieless traffic analytics with Plausible. It tracks page views and basic traffic sources; it does not identify individual visitors. Analytics are disabled unless a site domain is configured, and the script only loads in production builds by default.

1. Create a site in Plausible and add the exact public domain visitors use (for example, `madhuresume.netlify.app`). Copy the hostname only—not `https://` or a path.
2. In Netlify, open **Site configuration → Environment variables → Add a variable**. Set the key to `REACT_APP_PLAUSIBLE_DOMAIN` and the value to the Plausible site hostname. Save, then trigger a new deploy. The variable is embedded at build time, so setting it without a new deploy will not enable tracking. Do not put deployment values or secrets in `.env.example` or commit `.env.local`.
3. To test from the local development server, create a separate Plausible site for your local hostname (or a local tunnel hostname), then add these settings to `.env.local`:
   - `REACT_APP_PLAUSIBLE_DOMAIN=localhost`
   - `REACT_APP_PLAUSIBLE_ENABLE_IN_DEV=true`

   Restart `npm start` after changing environment variables. Do not use your production domain for local testing if you want to keep development traffic separate. Local tracking is disabled unless explicitly opted in; test runs never load the analytics script.

Do not send names, email addresses, passkeys, or other personal data as analytics event properties. Review applicable privacy notice and consent requirements for your audience.

## Optional Google Analytics 4

Google Analytics 4 can run alongside Plausible, but this sends analytics data to both providers. Configure consent and privacy disclosures for your audience before enabling Google Analytics.

1. In Google Analytics, create or select a GA4 property, then add a Web data stream for your deployed site. Copy its Measurement ID, which starts with `G-`.
2. In Netlify, add `REACT_APP_GA_MEASUREMENT_ID` with that ID under **Site configuration → Environment variables**, then redeploy.
3. For local testing, use a separate GA4 property/Measurement ID in `.env.local` and set `REACT_APP_GA_ENABLE_IN_DEV=true`. Restart `npm start` afterward so CRA reloads the environment. Do not use the production Measurement ID for development if you want to keep local hits out of production reports.

### Consent and privacy behavior

Plausible and Google Analytics do not load until the visitor accepts analytics consent. The first visit displays a consent dialog centered over the page. Accepting stores consent in the browser under `portfolio_analytics_consent`; declining stores the denied choice and keeps analytics disabled.

When GA4 initializes, Consent Mode defaults analytics and advertising storage to denied. The implementation uses anonymous measurement settings and sends no names, email addresses, messages, passwords, or other personal form values to analytics.

Remove or update these browser-stored choices when testing consent behavior:

```js
localStorage.removeItem('portfolio_analytics_consent');
location.reload();
```

### Page-view tracking

Automatic initial page views are disabled in the GA4 configuration to avoid duplicate hits. Client-side route changes are tracked separately as `page_view` events through the React Router integration.

Tracked page paths include `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/Qualification`, and `/Group`. Route titles are also attached for GA4 reports.

### Custom events

The portfolio currently records these GA4 events:

| Event | Trigger | Parameters |
| --- | --- | --- |
| `page_view` | Route navigation | `page_location`, `page_path`, `page_title` |
| `nav_click` | Portfolio navigation link | `page_path`, `navigation_label` |
| `resume_download` | Resume download button | `format` |
| `social_click` | Social-profile link | `platform`, `link_url` |
| `generate_lead` | Contact form sent successfully | `lead_source`, `form_status` |
| `contact_form_failure` | Contact form fails to send | `error_type` |
| `project_repository_click` | Featured-project repository link | `project_title` |
| `chatbot_opened` | Chat panel opened or closed | `action` |
| `chatbot_message_sent` | Chat response succeeds or fails | `result` |

To review these events in GA4, open **Reports → Realtime** and test each interaction in a production build, or use **Admin → DebugView** during development with a separately configured GA4 property.

To use successful contact submissions as a conversion, open **Admin → Events** in GA4 and mark `generate_lead` as a key event. Do not enable enhanced user-data collection unless the applicable privacy notice and consent requirements have been reviewed.
