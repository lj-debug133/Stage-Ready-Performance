exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name = '', email = '', message = '', recaptchaResponse = '', form = '' } = data;

    // Basic server-side validation
    if (!name || !email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing name or email' }) };
    }

    // Honeypot check: if bot-field present treat as bot and return OK silently
    if (data['bot-field']) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // sanitize
    const maxLen = 2000;
    const clean = (s) => String(s).replace(/<[^>]*>/g, '').slice(0, maxLen);
    const cleanName = clean(name);
    const cleanEmail = clean(email);
    const cleanMessage = clean(message);

    // Verify reCAPTCHA v2 server-side
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
    if (!RECAPTCHA_SECRET) return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };

    const recRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptchaResponse)}`
    });
    const recJson = await recRes.json();
    if (!recJson.success) {
      return { statusCode: 400, body: JSON.stringify({ error: 'reCAPTCHA verification failed' }) };
    }

    // Send email via SendGrid
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL;
    const TO_EMAIL = process.env.TO_EMAIL;
    if (!SENDGRID_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Email service not configured' }) };
    }

    const emailPayload = {
      personalizations: [{ to: [{ email: TO_EMAIL }], subject: `New ${form || 'contact'} form submission` }],
      from: { email: FROM_EMAIL, name: 'Stage Ready Performance' },
      reply_to: { email: cleanEmail, name: cleanName },
      content: [{ type: 'text/plain', value: `Form: ${form}\nName: ${cleanName}\nEmail: ${cleanEmail}\nMessage:\n${cleanMessage}` }]
    };

    const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload)
    });

    if (sgRes.status >= 200 && sgRes.status < 300) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } else {
      const sgText = await sgRes.text();
      console.error('SendGrid error', sgRes.status, sgText);
      return { statusCode: 502, body: JSON.stringify({ error: 'Failed to send email' }) };
    }

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
