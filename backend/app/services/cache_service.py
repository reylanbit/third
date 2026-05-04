import redis.asyncio as redis
from app.utils.config import settings
import json
from typing import Optional, Any

class CacheService:
    def __init__(self):
        self.redis = None
        if settings.UPSTASH_REDIS_URL:
            self.redis = redis.from_url(settings.UPSTASH_REDIS_URL, decode_responses=True)

    async def get(self, key: str) -> Optional[Any]:
        if not self.redis:
            return None
        try:
            data = await self.redis.get(key)
            return json.loads(data) if data else None
        except Exception:
            return None

    async def set(self, key: str, value: Any, expire: int = 86400):
        if not self.redis:
            return
        try:
            await self.redis.set(key, json.dumps(value), ex=expire)
        except Exception:
            pass

cache_service = CacheService()
