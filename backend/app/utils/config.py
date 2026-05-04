from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HUGGINGFACE_API_KEY: str
    UPSTASH_REDIS_URL: str
    DATABASE_URL: str = ""
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"

settings = Settings()
