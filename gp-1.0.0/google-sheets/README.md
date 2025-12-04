# Google Sheets Apps Script - Lead capture webhook

This Apps Script accepts POST JSON payloads and appends data to a Google Sheet tab called `Leads`.

Steps:
1) Create a Google Sheet and name a worksheet/tab `Leads`.
2) Go to Extensions -> Apps Script.
3) Replace the default Code.gs content with the content in `Code.gs` in this folder.
4) Deploy: Deploy -> New Deployment -> "Web app".
   - Execute as: Me (Owner)
   - Who has access: Anyone (or Anyone with link)
5) You’ll get a URL for the Web app that accepts POST requests. Copy it and paste it into `index.html` meta tag: `<meta name="sheets-webhook-url" content="https://script.google.com/macros/..../exec">`.

Payload example (JSON):
{
  "email": "test@example.com",
  "would_buy": "yes",
  "calls_per_month": "5-20k",
  "budget": "100-499",
  "page": "/"
}

Note on privacy: Avoid sending personal health data or PII into Google Sheets or any analytics platform without explicit consent and compliance with GDPR/HIPAA requirements.
