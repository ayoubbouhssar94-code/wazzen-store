import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    String, Integer, Numeric, Boolean, Text, DateTime,
    ForeignKey, JSON, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name_ar: Mapped[str] = mapped_column(String(300), nullable=False)
    name_en: Mapped[str] = mapped_column(String(300), nullable=False)
    headline_ar: Mapped[str] = mapped_column(String(300), nullable=False)
    subheading_ar: Mapped[str] = mapped_column(String(500), nullable=False)
    price_1: Mapped[int] = mapped_column(Integer, default=199)
    price_2: Mapped[int] = mapped_column(Integer, default=279)
    price_3: Mapped[int] = mapped_column(Integer, default=349)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="product")

    @property
    def sku(self) -> str:
        from app.db.product_catalog import get_product_sku

        return get_product_sku(self.id)


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number: Mapped[str] = mapped_column(String(30), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(30), default="new")

    customer_name: Mapped[str] = mapped_column(String(200), nullable=False)
    phone_raw: Mapped[str] = mapped_column(String(30), nullable=False)
    phone_local: Mapped[str] = mapped_column(String(15), nullable=False)
    phone_e164: Mapped[str] = mapped_column(String(15), nullable=False)
    phone_digits: Mapped[str] = mapped_column(String(15), nullable=False)

    upsell_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    upsell_product_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    upsell_sar: Mapped[int] = mapped_column(Integer, default=0)

    subtotal_sar: Mapped[int] = mapped_column(Integer, nullable=False)
    total_sar: Mapped[int] = mapped_column(Integer, nullable=False)

    payment_method: Mapped[str] = mapped_column(String(10), default="COD")

    utm_source: Mapped[str | None] = mapped_column(String(200), nullable=True)
    utm_medium: Mapped[str | None] = mapped_column(String(200), nullable=True)
    utm_campaign: Mapped[str | None] = mapped_column(String(200), nullable=True)
    utm_content: Mapped[str | None] = mapped_column(String(200), nullable=True)
    utm_term: Mapped[str | None] = mapped_column(String(200), nullable=True)
    fbclid: Mapped[str | None] = mapped_column(String(500), nullable=True)
    ttclid: Mapped[str | None] = mapped_column(String(500), nullable=True)
    snap_click_id: Mapped[str | None] = mapped_column(String(500), nullable=True)
    fbp: Mapped[str | None] = mapped_column(String(200), nullable=True)
    fbc: Mapped[str | None] = mapped_column(String(200), nullable=True)
    ttp: Mapped[str | None] = mapped_column(String(200), nullable=True)

    landing_page: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    referrer: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    current_url: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(500), nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)

    meta_event_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
    tiktok_event_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
    snap_event_id: Mapped[str | None] = mapped_column(String(200), nullable=True)

    sheet_synced: Mapped[bool] = mapped_column(Boolean, default=False)
    capi_sent: Mapped[bool] = mapped_column(Boolean, default=False)

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")
    webhook_deliveries: Mapped[list["WebhookDelivery"]] = relationship(back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"), nullable=False, index=True)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price_sar: Mapped[int] = mapped_column(Integer, nullable=False)
    line_total_sar: Mapped[int] = mapped_column(Integer, nullable=False)
    is_upsell: Mapped[bool] = mapped_column(Boolean, default=False)

    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="order_items")


class TrackingEvent(Base):
    __tablename__ = "tracking_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_name: Mapped[str] = mapped_column(String(50), nullable=False)
    event_id: Mapped[str] = mapped_column(String(200), nullable=False)
    order_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True, index=True)
    platform: Mapped[str] = mapped_column(String(20), nullable=False)
    payload: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    success: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    __table_args__ = (
        Index("ix_tracking_events_event_id", "event_id"),
    )


class WebhookDelivery(Base):
    __tablename__ = "webhook_deliveries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id"), nullable=False, index=True)
    destination: Mapped[str] = mapped_column(String(200), nullable=False)
    payload_hash: Mapped[str | None] = mapped_column(String(64), nullable=True)
    response_status: Mapped[int | None] = mapped_column(Integer, nullable=True)
    response_body: Mapped[str | None] = mapped_column(Text, nullable=True)
    success: Mapped[bool] = mapped_column(Boolean, default=False)
    retry_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    order: Mapped["Order"] = relationship(back_populates="webhook_deliveries")
