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
