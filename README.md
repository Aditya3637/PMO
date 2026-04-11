# Taskora Web Routing

Taskora now opens the application directly:

- `/` → redirects to `/app/`
- `/app/` → full Taskora application

## Fixes in this update

- Removed the landing page and restored direct app access from the root URL.
- Hardened app boot/login initialization in `app/index.html` to avoid infinite loading spinner states.
  - Handles missing Supabase script gracefully.
  - Adds an auth initialization timeout guard.
  - Shows actionable login error messages instead of leaving the loader spinning.
- Kept GitHub Actions inline JavaScript syntax checks in `.github/workflows/static-checks.yml`.

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/` (auto-redirects to app).
