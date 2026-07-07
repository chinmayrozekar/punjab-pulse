from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://punjab_pulse:changeme@localhost:5432/punjab_pulse"
    secret_key: str = "change-me-to-a-random-string"
    ingest_interval_minutes: int = 60
    ingest_trigger_secret: str = ""
    newsapi_key: str = ""
    newsdata_api_key: str = ""
    currents_api_key: str = ""
    gnews_key: str = ""
    twitter_bearer_token: str = ""
    telegram_api_id: str = ""
    telegram_api_hash: str = ""

    model_config = {"env_file": "../.env", "case_sensitive": False, "extra": "ignore"}


settings = Settings()
