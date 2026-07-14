from sqlalchemy import select

from app.db.models import Product
from app.db.product_catalog import PRODUCT_CATALOG, VALID_PRODUCT_IDS
from app.db.session import AsyncSessionLocal


async def seed_products() -> None:
    """Upsert the live catalog and preserve legacy rows for historical orders."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Product))
        existing = {product.id: product for product in result.scalars().all()}

        for product in existing.values():
            if product.id not in VALID_PRODUCT_IDS:
                product.is_active = False

        for catalog_item in PRODUCT_CATALOG:
            product_id = str(catalog_item["id"])
            product = existing.get(product_id)
            values = {
                key: value
                for key, value in catalog_item.items()
                if key not in {"id", "sku"}
            }

            if product is None:
                product = Product(id=product_id, is_active=True, **values)
                session.add(product)
                continue

            for key, value in values.items():
                setattr(product, key, value)
            product.is_active = True

        await session.commit()
