````markdown
# Netlify setup (no environment variables required)

This branch uses Netlify Forms to capture submissions (no server functions or secret env vars required).

Steps:
1. Push these files to your repo (branch secure/netlify-forms or merge to main).
2. In Netlify:
   - Enable Forms for your site (Netlify usually detects forms automatically).
   - Netlify supports reCAPTCHA v2 for forms: go to Site Settings → Forms → reCAPTCHA and follow Netlify instructions to enable reCAPTCHA. You will add the site key via Netlify UI (Netlify manages the verification server-side), so there are still no repo secrets required.
   - Configure email notifications or integrations:
     - Netlify stores all form submissions (UI: Site → Forms). You can configure notifications inside Netlify (Form settings → Notifications) OR
     - Use a Zapier/Integromat/Make integration to forward submissions to your email, Slack, Google Sheets, etc.
3. Test:
   - Deploy the site and submit a test form.
   - Check the Netlify dashboard → Forms for the submission.

Security & notes:
- This approach avoids embedding API keys into your repo.
- Honeypot fields and Netlify's reCAPTCHA reduce spam.
- If you need to forward emails directly (without Netlify UI), you can use a third-party integration (Zapier) or a mail-forwarding integration — both can be configured from Netlify or the third-party provider.