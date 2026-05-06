from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    HUGGINGFACE_API_KEY: str = "hf_placeholder"
    UPSTASH_REDIS_URL: str = "rediss://default:placeholder@localhost:6379"
    DATABASE_URL: str = "sqlite:///./fala_doutor.db"
    ENVIRONMENT: str = "development"

settings = Settings()
