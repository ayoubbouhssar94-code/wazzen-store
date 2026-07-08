import json
import logging
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.db.session import get_db
from app.db.models import Order, OrderItem, WebhookDelivery
from app.schemas.order import OrderIn, OrderOut, OrderItemOut
from app.services.phone import normalize_ksa_phone, PhoneValidationError
from app.services.pricing import calculate_totals
from app.services.sheets import send_to_sheets
from app.services.capi_meta import send_meta_purchase
from app.services.capi_tiktok import send_tiktok_purchase
from app.services.capi_snap import send_snap_purchase

logger = logging.getLogger(__name__)
router = APIRouter()


async def _generate_order_number(db: AsyncSession) -> str:
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    result = await db.execute(
        select(func.count(Order.id)).where(
            func.date_trunc("day", Order.created_at) == func.current_date()
        )
    )
    count = (result.scalar() or 0) + 1
    return f"WZ-{today}-{count:06d}"


@router.post("/orders", response_model=OrderOut, status_code=201)
async def create_order(
    payload: OrderIn,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    # Normalize phone
    try:
        phone_normalized = normalize_ksa_phone(payload.phone)
    except PhoneValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc))

    # Recalculate totals server-side
    try:
        totals = calculate_totals(payload.items)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))

    # Client IP
    client_ip = request.headers.get("x-forwarded-for") or request.headers.get("x-real-ip")
    if not client_ip:
        client_ip = request.client.host if request.client else None
    if client_ip and "," in client_ip:
        client_ip = client_ip.split(",")[0].strip()

    # Upsell detection
    upsell_items = [i for i in payload.items if i.is_upsell]
    upsell_accepted = len(upsell_items) > 0
    upsell_product_id = upsell_items[0].product_id if upsell_items else None

    order_number = await _generate_order_number(db)

    order = Order(
        id=uuid.uuid4(),
        order_number=order_number,
        customer_name=payload.customer_name.strip(),
        phone_raw=payload.phone,
        phone_local=phone_normalized["local"],
        phone_e164=phone_normalized["e164"],
        phone_digits=phone_normalized["digits"],
        upsell_accepted=upsell_accepted,
        upsell_product_id=upsell_product_id,
        upsell_sar=totals["upsell_sar"],
        subtotal_sar=totals["subtotal_sar"],
        total_sar=totals["total_sar"],
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        utm_content=payload.utm_content,
        utm_term=payload.utm_term,
        fbclid=payload.fbclid,
        ttclid=payload.ttclid,
        snap_click_id=payload.snap_click_id,
        fbp=payload.fbp,
        fbc=payload.fbc,
        ttp=payload.ttp,
        landing_page=payload.landing_page,
        referrer=payload.referrer,
        current_url=payload.current_url,
        user_agent=payload.user_agent or request.headers.get("user-agent"),
        ip_address=client_ip,
        meta_event_id=payload.meta_event_id,
        tiktok_event_id=payload.tiktok_event_id,
        snap_event_id=payload.snap_event_id,
    )
    db.add(order)

    for line in totals["line_items"]:
        item = OrderItem(
            order_id=order.id,
            product_id=line["product_id"],
            quantity=line["quantity"],
            unit_price_sar=line["unit_price_sar"],
            line_total_sar=line["line_total_sar"],
            is_upsell=line["is_upsell"],
        )
        db.add(item)

    await db.commit()
    await db.refresh(order)

    # Build items summary for sheets
    items_list = []
    summary_parts = []
    for line in totals["line_items"]:
        items_list.append({
            "product_id": line["product_id"],
            "qty": line["quantity"],
            "price": line["line_total_sar"],
            "is_upsell": line["is_upsell"],
        })
        label = line["product_id"].replace("-", " ").title()
        summary_parts.append(f"{label} x{line['quantity']}")
    items_summary = ", ".join(summary_parts)
    items_json = json.dumps(items_list, ensure_ascii=False)

    contents = [
        {"id": line["product_id"], "quantity": line["quantity"], "price": line["unit_price_sar"]}
        for line in totals["line_items"]
    ]

    # Google Sheets webhook (non-blocking failure)
    try:
        delivery = await send_to_sheets(order, items_summary, items_json)
        delivery.order_id = order.id
        db.add(delivery)
        if delivery.success:
            order.sheet_synced = True
        await db.commit()
    except Exception as exc:
        logger.error("Sheets delivery failed: %s", exc)

    # CAPI events (non-blocking failures)
    try:
        meta_ok = await send_meta_purchase(order, contents)
        tiktok_ok = await send_tiktok_purchase(order, contents)
        snap_ok = await send_snap_purchase(order, contents)
        if meta_ok or tiktok_ok or snap_ok:
            order.capi_sent = True
            await db.commit()
    except Exception as exc:
        logger.error("CAPI delivery failed: %s", exc)

    await db.refresh(order)

    # Load items for response
    items_result = await db.execute(
        select(OrderItem).where(OrderItem.order_id == order.id)
    )
    db_items = items_result.scalars().all()

    return OrderOut(
        order_id=str(order.id),
        order_number=order.order_number,
        total_sar=order.total_sar,
        subtotal_sar=order.subtotal_sar,
        upsell_sar=order.upsell_sar,
        upsell_accepted=order.upsell_accepted,
        customer_name=order.customer_name,
        phone_local=order.phone_local,
        items=[
            OrderItemOut(
                product_id=i.product_id,
                quantity=i.quantity,
                unit_price_sar=i.unit_price_sar,
                line_total_sar=i.line_total_sar,
                is_upsell=i.is_upsell,
            )
            for i in db_items
        ],
        created_at=order.created_at.isoformat() if order.created_at else "",
    )
