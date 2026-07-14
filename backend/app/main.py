import asyncio
import logging
import sys

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.cors import setup_cors
from app.api.routes import health, products, orders, tracking
from app.db.session import engine
from app.db.base import Base
from app.db.seed_products import seed_products
import app.db.models  # noqa: F401 – registers models with SQLAlchemy

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


async def _init_db(retries: int = 10, delay: float = 3.0) -> None:
    """Try to create all tables, retrying if the DB is not ready yet."""
    for attempt in range(1, retries + 1):
        try:
            logger.info("DB init attempt %d/%d …", attempt, retries)
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            logger.info("Database tables ready.")
            return
        except Exception as exc:
            logger.warning("DB not ready (%s). Retrying in %.0fs …", exc, delay)
            if attempt == retries:
                logger.error("Could not initialise DB after %d attempts — continuing anyway.", retries)
                return
            await asyncio.sleep(delay)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await _init_db()
    try:
        await seed_products()
        logger.info("Live product catalog seeded.")
    except Exception as exc:
        logger.error("Could not seed product catalog — continuing anyway: %s", exc)
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if not settings.is_production else None,
    redoc_url=None,
)

setup_cors(app)

app.include_router(health.router, tags=["health"])
app.include_router(products.router, tags=["products"])
app.include_router(orders.router, tags=["orders"])
app.include_router(tracking.router, tags=["tracking"])
