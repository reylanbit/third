import hashlib, json, redis.asyncio as redis
from app.utils.config import settings

class CacheService:
    def __init__(self):
        self.redis = redis.from_url(settings.UPSTASH_REDIS_URL, decode_responses=True)

    async def get_cached_response(self, message: str):
        if not settings.UPSTASH_REDIS_URL or "placeholder" in settings.UPSTASH_REDIS_URL:
            return None
        key = hashlib.sha256(message.encode()).hexdigest()
        try:
            cached = await self.redis.get(key)
            if not cached:
                return None
            data = json.loads(cached)
            if isinstance(data, dict):
                for key in list(data.keys()):
                    if key in ['__proto__', 'constructor', 'prototype']:
                        del data[key]
            return data
        except Exception as e:
            print(f"Cache get error: {e}")
            return None

    async def set_cache(self, message: str, response: dict, ttl: int = 86400):
        if not settings.UPSTASH_REDIS_URL or "placeholder" in settings.UPSTASH_REDIS_URL:
            return
        key = hashlib.sha256(message.encode()).hexdigest()
        try:
            await self.redis.setex(key, ttl, json.dumps(response))
        except Exception as e:
            print(f"Cache set error: {e}")
            pass

cache_service = CacheService()
