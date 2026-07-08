import logging
import subprocess
import sys

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.cors import setup_cors
from app.api.routes import health, products, orders, tracking

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


def run_migrations() -> None:
    logger.info("Running Alembic migrations...")
    result = subprocess.run(
        ["alembic", "upgrade", "head"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        logger.error("Migration failed:\n%s", result.stderr)
        raise RuntimeError(f"Migration failed: {result.stderr}")
    logger.info("Migrations complete.\n%s", result.stdout)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.RUN_MIGRATIONS_ON_START:
        run_migrations()
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
