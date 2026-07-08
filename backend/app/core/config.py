from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    APP_ENV: str = "development"
    APP_NAME: str = "WAZZEN API"
    FRONTEND_ORIGIN: str = "https://wazzen.shop"
    DATABASE_URL: str = "postgresql+asyncpg://wazzen:wazzen@localhost:5432/wazzen"
    RUN_MIGRATIONS_ON_START: bool = True

    GOOGLE_SHEETS_WEBHOOK_URL: Optional[str] = None
    GOOGLE_SHEETS_WEBHOOK_SECRET: Optional[str] = None

    TRACKING_ENABLED: bool = True
    META_PIXEL_ID: Optional[str] = None
    META_ACCESS_TOKEN: Optional[str] = None
    TIKTOK_PIXEL_CODE: Optional[str] = None
    TIKTOK_ACCESS_TOKEN: Optional[str] = None
    SNAP_PIXEL_ID: Optional[str] = None
    SNAP_ACCESS_TOKEN: Optional[str] = None

    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "production"

    @property
    def allowed_origins(self) -> list[str]:
        origins = [
            self.FRONTEND_ORIGIN,
            "https://www.wazzen.shop",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
        return list(dict.fromkeys(origins))


settings = Settings()
