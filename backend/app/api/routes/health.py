from fastapi import APIRouter
from app.db.session import engine

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok", "service": "wazzen-api"}


@router.get("/health/db")
async def health_db():
    try:
        async with engine.connect() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as exc:
        return {"status": "error", "database": str(exc)}
