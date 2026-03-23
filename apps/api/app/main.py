from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.api.routes_analytics import router as analytics_router
from app.api.routes_auth import router as auth_router
from app.api.routes_properties import router as properties_router
from app.api.routes_watchlist import router as watchlist_router
from app.core.logging import configure_logging
from app.db.session import Base, engine

app = FastAPI(title="Property Space API", version="0.1.0")
RATE_LIMIT: dict[str, int] = {}


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        return response


class SimpleRateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        key = request.client.host if request.client else "unknown"
        RATE_LIMIT[key] = RATE_LIMIT.get(key, 0) + 1
        if RATE_LIMIT[key] > 300:
            return Response("Rate limit exceeded", status_code=429)
        return await call_next(request)


app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(SimpleRateLimitMiddleware)


@app.on_event("startup")
def on_startup() -> None:
    configure_logging()
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth_router)
app.include_router(properties_router)
app.include_router(analytics_router)
app.include_router(watchlist_router)
