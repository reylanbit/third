from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    HUGGINGFACE_API_KEY: str = "hf_placeholder"
    UPSTASH_REDIS_URL: Optional[str] = None
    DATABASE_URL: Optional[str] = None
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()
