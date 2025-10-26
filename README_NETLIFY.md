# Netlify setup

This branch adds secure form handling using a Netlify Function that verifies reCAPTCHA v2 and forwards form submissions via SendGrid.

Steps to deploy:

1. Create the branch on GitHub (secure/netlify-forms). Files are prepared in this branch — add them to the repo if not already present.
2. In Netlify Site settings > Build & deploy > Environment, add the following environment variables:
   - RECAPTCHA_SECRET = (your reCAPTCHA v2 secret key)
   - SENDGRID_API_KEY = (your SendGrid API key)
   - FROM_EMAIL = no-reply@yourdomain.com
   - TO_EMAIL = your@email.com

3. In index.html, replace `RECAPTCHA_SITE_KEY` with your reCAPTCHA v2 site key. (Alternatively you can use a templating step to inject it at build-time.)

4. Verify the Netlify Functions folder path is `netlify/functions` (that's set in netlify.toml).

5. Deploy:
   - Either enable continuous deploy from this GitHub branch or push manually.
   - After deploy, test the forms on the live site. If you get a server error check Build & Functions logs in Netlify.

6. (Recommended) Configure SPF/DKIM/DMARC for the domain used in FROM_EMAIL to avoid deliverability issues.

Notes:
- The function does basic sanitization and reCAPTCHA verification. Consider adding a persistent rate limiter (Redis/Upstash or third-party) if you receive abuse.
- Keep env vars secret and do not embed secret keys in the frontend.
