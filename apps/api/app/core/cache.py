import json
from typing import Any

import redis

from app.core.config import settings

client = redis.Redis.from_url(settings.redis_url, decode_responses=True)


def cache_get(key: str) -> Any:
    data = client.get(key)
    if not data:
        return None
    return json.loads(data)


def cache_set(key: str, value: Any, ttl_seconds: int = 120) -> None:
    client.setex(key, ttl_seconds, json.dumps(value))
