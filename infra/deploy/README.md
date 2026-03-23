# Deployment Notes

## Services

- Web: `apps/web` on Node runtime
- API: `apps/api` on Python ASGI runtime
- ML: `apps/ml` on Python ASGI runtime
- PostgreSQL: managed or self-hosted with backups
- Redis: managed or self-hosted

## Suggested Runtime Commands

- Web: `npm run build && npm run start`
- API: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- ML: `uvicorn app.main:app --host 0.0.0.0 --port 8001`

## Hardening Checklist

- Rotate JWT and OAuth secrets.
- Restrict CORS to approved domains.
- Enforce HTTPS and secure cookies.
- Enable DB point-in-time recovery.
- Wire logs to centralized observability stack.
