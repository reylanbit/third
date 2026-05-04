from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HUGGINGFACE_API_KEY: str = "hf_placeholder"
    UPSTASH_REDIS_URL: str = "rediss://default:placeholder@localhost:6379"
    DATABASE_URL: str = "sqlite:///./fala_doutor.db"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"

settings = Settings()
