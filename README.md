# Property Space AI

AI-powered real estate analytics SaaS for India.

## Monorepo Layout

- `apps/web` - Next.js + TypeScript + Tailwind frontend
- `apps/api` - FastAPI + PostgreSQL + Redis backend
- `apps/ml` - ML inference microservice (LightGBM/XGBoost + SHAP)
- `packages/shared` - shared contracts/types
- `infra` - environment templates and local setup notes

## Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

## Quick Start

### Frontend

```bash
npm install
npm run dev:web
```

### Backend API

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### ML Service

```bash
cd apps/ml
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Environment

Copy and edit:
- `infra/env/web.env.example`
- `infra/env/api.env.example`
- `infra/env/ml.env.example`
