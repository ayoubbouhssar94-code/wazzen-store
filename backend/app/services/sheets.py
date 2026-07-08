import hashlib
import json
import logging
from datetime import timezone
from typing import Any

import httpx

from app.core.config import settings
from app.db.models import Order, WebhookDelivery

logger = logging.getLogger(__name__)


def build_sheet_payload(order: Order, items_summary: str, items_json: str) -> dict[str, Any]:
    upsell_product = order.upsell_product_id or ""
    created_iso = (
        order.created_at.replace(tzinfo=timezone.utc).isoformat()
        if order.created_at
        else ""
    )
    return {
        "order_id": str(order.id),
        "order_number": order.order_number,
        "created_at": created_iso,
        "status": order.status,
        "customer_name": order.customer_name,
        "phone_local": order.phone_local,
        "phone_e164": order.phone_e164,
        "city": "",
        "items_summary": items_summary,
        "items_json": items_json,
        "upsell_accepted": "yes" if order.upsell_accepted else "no",
        "upsell_product": upsell_product,
        "subtotal_sar": order.subtotal_sar,
        "upsell_sar": order.upsell_sar,
        "total_sar": order.total_sar,
        "payment_method": order.payment_method,
        "utm_source": order.utm_source or "",
        "utm_medium": order.utm_medium or "",
        "utm_campaign": order.utm_campaign or "",
        "utm_content": order.utm_content or "",
        "utm_term": order.utm_term or "",
        "fbclid": order.fbclid or "",
        "ttclid": order.ttclid or "",
        "snap_click_id": order.snap_click_id or "",
        "landing_page": order.landing_page or "",
        "referrer": order.referrer or "",
        "user_agent": order.user_agent or "",
        "ip_address": order.ip_address or "",
        "meta_event_id": order.meta_event_id or "",
        "tiktok_event_id": order.tiktok_event_id or "",
        "snap_event_id": order.snap_event_id or "",
        "notes": order.notes or "",
    }


async def send_to_sheets(order: Order, items_summary: str, items_json: str) -> WebhookDelivery:
    delivery = WebhookDelivery(
        order_id=order.id,
        destination="google_sheets",
        success=False,
        retry_count=0,
    )

    webhook_url = settings.GOOGLE_SHEETS_WEBHOOK_URL
    if not webhook_url:
        logger.warning("GOOGLE_SHEETS_WEBHOOK_URL not configured, skipping sheet delivery")
        delivery.response_body = "GOOGLE_SHEETS_WEBHOOK_URL not set"
        return delivery

    payload = build_sheet_payload(order, items_summary, items_json)
    payload_str = json.dumps(payload, ensure_ascii=False, sort_keys=True)
    delivery.payload_hash = hashlib.sha256(payload_str.encode()).hexdigest()

    url = webhook_url
    if settings.GOOGLE_SHEETS_WEBHOOK_SECRET:
        sep = "&" if "?" in url else "?"
        url = f"{url}{sep}secret={settings.GOOGLE_SHEETS_WEBHOOK_SECRET}"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload)
        delivery.response_status = resp.status_code
        delivery.response_body = resp.text[:500]
        delivery.success = resp.status_code in (200, 201)
        if not delivery.success:
            logger.error("Sheets webhook failed: %s %s", resp.status_code, resp.text[:200])
    except Exception as exc:
        logger.error("Sheets webhook exception: %s", exc)
        delivery.response_body = str(exc)[:500]

    return delivery
