# Taskora Web Entry + App Routing

This repository now serves **both**:

- `https://taskora.deftai.in` → public marketing/landing page
- `https://taskora.deftai.in/app/` → full Taskora application

## What changed

- Root `index.html` is the landing page (trial + product overview).
- Full app moved to `app/index.html`.
- Landing page CTAs now point to `/app/` so users can directly start using Taskora from the same domain.

## DNS and publishing checklist (for `taskora.deftai.in`)

1. Create DNS record for subdomain:
   - Type: `CNAME`
   - Host/Name: `taskora`
   - Target: your hosting provider endpoint (for example, Vercel/Netlify/Cloudflare Pages target)
2. Deploy this repository as a static site.
3. Attach custom domain `taskora.deftai.in` in the hosting dashboard.
4. Enable HTTPS/TLS (usually automatic on modern hosts).
5. Verify:
   - `https://taskora.deftai.in` opens landing page
   - `https://taskora.deftai.in/app/` opens app login/dashboard

## Trial flow expectation

- Visitor lands on `taskora.deftai.in`, understands Taskora via landing content.
- Clicking **Start Free Trial** routes to `/app/`.
- User signs up and begins the 60-day trial in the full app.

## Local preview

From repo root:

```bash
python -m http.server 8080
```

Then open:

- `http://localhost:8080/` (landing)
- `http://localhost:8080/app/` (application)
