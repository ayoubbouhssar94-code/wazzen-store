"""Initial schema with all tables and product seed data

Revision ID: 001
Revises: 
Create Date: 2026-07-07 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.String(100), primary_key=True),
        sa.Column("slug", sa.String(100), unique=True, nullable=False),
        sa.Column("name_ar", sa.String(300), nullable=False),
        sa.Column("name_en", sa.String(300), nullable=False),
        sa.Column("headline_ar", sa.String(300), nullable=False),
        sa.Column("subheading_ar", sa.String(500), nullable=False),
        sa.Column("price_1", sa.Integer(), default=199),
        sa.Column("price_2", sa.Integer(), default=279),
        sa.Column("price_3", sa.Integer(), default=349),
        sa.Column("is_active", sa.Boolean(), default=True),
        sa.Column("sort_order", sa.Integer(), default=0),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    )

    op.create_table(
        "orders",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("order_number", sa.String(30), unique=True, nullable=False),
        sa.Column("status", sa.String(30), server_default="new"),
        sa.Column("customer_name", sa.String(200), nullable=False),
        sa.Column("phone_raw", sa.String(30), nullable=False),
        sa.Column("phone_local", sa.String(15), nullable=False),
        sa.Column("phone_e164", sa.String(15), nullable=False),
        sa.Column("phone_digits", sa.String(15), nullable=False),
        sa.Column("upsell_accepted", sa.Boolean(), server_default="false"),
        sa.Column("upsell_product_id", sa.String(100), nullable=True),
        sa.Column("upsell_sar", sa.Integer(), server_default="0"),
        sa.Column("subtotal_sar", sa.Integer(), nullable=False),
        sa.Column("total_sar", sa.Integer(), nullable=False),
        sa.Column("payment_method", sa.String(10), server_default="COD"),
        sa.Column("utm_source", sa.String(200), nullable=True),
        sa.Column("utm_medium", sa.String(200), nullable=True),
        sa.Column("utm_campaign", sa.String(200), nullable=True),
        sa.Column("utm_content", sa.String(200), nullable=True),
        sa.Column("utm_term", sa.String(200), nullable=True),
        sa.Column("fbclid", sa.String(500), nullable=True),
        sa.Column("ttclid", sa.String(500), nullable=True),
        sa.Column("snap_click_id", sa.String(500), nullable=True),
        sa.Column("fbp", sa.String(200), nullable=True),
        sa.Column("fbc", sa.String(200), nullable=True),
        sa.Column("ttp", sa.String(200), nullable=True),
        sa.Column("landing_page", sa.String(1000), nullable=True),
        sa.Column("referrer", sa.String(1000), nullable=True),
        sa.Column("current_url", sa.String(1000), nullable=True),
        sa.Column("user_agent", sa.String(500), nullable=True),
        sa.Column("ip_address", sa.String(45), nullable=True),
        sa.Column("meta_event_id", sa.String(200), nullable=True),
        sa.Column("tiktok_event_id", sa.String(200), nullable=True),
        sa.Column("snap_event_id", sa.String(200), nullable=True),
        sa.Column("sheet_synced", sa.Boolean(), server_default="false"),
        sa.Column("capi_sent", sa.Boolean(), server_default="false"),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"])

    op.create_table(
        "order_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("product_id", sa.String(100), sa.ForeignKey("products.id"), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("unit_price_sar", sa.Integer(), nullable=False),
        sa.Column("line_total_sar", sa.Integer(), nullable=False),
        sa.Column("is_upsell", sa.Boolean(), server_default="false"),
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])

    op.create_table(
        "tracking_events",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("event_name", sa.String(50), nullable=False),
        sa.Column("event_id", sa.String(200), nullable=False),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("platform", sa.String(20), nullable=False),
        sa.Column("payload", postgresql.JSON(), nullable=True),
        sa.Column("success", sa.Boolean(), nullable=True),
        sa.Column("error", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_tracking_events_event_id", "tracking_events", ["event_id"])
    op.create_index("ix_tracking_events_order_id", "tracking_events", ["order_id"])

    op.create_table(
        "webhook_deliveries",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("destination", sa.String(200), nullable=False),
        sa.Column("payload_hash", sa.String(64), nullable=True),
        sa.Column("response_status", sa.Integer(), nullable=True),
        sa.Column("response_body", sa.Text(), nullable=True),
        sa.Column("success", sa.Boolean(), server_default="false"),
        sa.Column("retry_count", sa.Integer(), server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    )
    op.create_index("ix_webhook_deliveries_order_id", "webhook_deliveries", ["order_id"])

    # Seed products
    op.execute("""
        INSERT INTO products (id, slug, name_ar, name_en, headline_ar, subheading_ar, price_1, price_2, price_3, is_active, sort_order)
        VALUES
        (
            'titanium-silver-sunshade',
            'titanium-silver-sunshade',
            'مظلة التيتانيوم الفضية العاكسة ضد حرارة الـ 70 درجة',
            'Titanium Silver Sunshade',
            'ودّعي حرارة السيارة وقت الظهر',
            'مظلة عاكسة تساعد على حماية المقود والمقاعد والديكور من الشمس الحادة.',
            199, 279, 349, true, 1
        ),
        (
            'premium-leather-gap-console',
            'premium-leather-gap-console',
            'حشوة الجلد الفاخر للسيارة ضد ضياع الجوال والفوضى',
            'Premium PU Leather Gap Console',
            'خلي جوالك ومفاتيحك بمكانها',
            'حشوة جلد فاخرة تسد الفراغ وتضيف مساحة عملية بدون تركيب معقد.',
            199, 279, 349, true, 2
        ),
        (
            'hepa-car-vacuum',
            'hepa-car-vacuum',
            'مكنسة الفلتر الذكي اللاسلكية ضد الغبار والرمل العميق',
            'High-Suction HEPA Car Vacuum',
            'نظافة سريعة من الرمل والغبار',
            'مكنسة لاسلكية بفلتر HEPA لتنظيف الرمل والفتات والغبار من تفاصيل السيارة.',
            199, 279, 349, true, 3
        )
    """)


def downgrade() -> None:
    op.drop_table("webhook_deliveries")
    op.drop_table("tracking_events")
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("products")
