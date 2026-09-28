from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Multimodal Security Backend"
    DATABASE_URL: str = "mysql+pymysql://root:password@localhost:3306/multimodal_security_db"

    JWT_SECRET_KEY: str = "change-this-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    EVENT_DEDUP_SECONDS: float = 2.0
    FUSION_TIME_WINDOW_SECONDS: float = 5.0
    RISK_THRESHOLD_WARNING: float = 40.0
    RISK_THRESHOLD_CRITICAL: float = 70.0

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
