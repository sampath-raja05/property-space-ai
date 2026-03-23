# Observability Baseline

## Logging

- API emits structured JSON logs via `app/core/logging.py`.
- Add shipping to your preferred sink (ELK, Loki, Cloud logging).

## Metrics

- Track API latency (p50/p95), error rate, and request volume.
- Track web page load metrics (LCP, INP, CLS) via web-vitals.

## Error Tracking

- Add Sentry SDK for `apps/web`, `apps/api`, and `apps/ml`.
- Alert on:
  - API 5xx spikes
  - auth failures
  - ML inference failures

## SLO Starter

- API availability: 99.9%
- p95 read latency target: < 300ms
- Web landing page load target: < 2s on broadband
