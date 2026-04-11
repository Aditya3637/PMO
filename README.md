# Taskora Web Routing

This repository serves two surfaces:

- `/` → marketing/entry landing page
- `/app/` → full Taskora application

## What was fixed

- Replaced the root `index.html` with a clean landing page to prevent app-runtime errors on the marketing route.
- Kept the full product experience isolated under `app/index.html`.
- Added a GitHub Actions workflow at `.github/workflows/static-checks.yml` that validates inline JavaScript syntax for both HTML entry points.

## Local preview

From repository root:

```bash
python -m http.server 8080
```

Then open:

- `http://localhost:8080/`
- `http://localhost:8080/app/`

## Deployment checklist

1. Publish this repository as a static site.
2. Point your domain/subdomain to the host.
3. Verify both routes load:
   - landing: `/`
   - app: `/app/`
