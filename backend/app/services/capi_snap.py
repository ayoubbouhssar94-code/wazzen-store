import hashlib
import logging
import time
from typing import Any

import httpx

from app.core.config import settings
from app.db.models import Order

logger = logging.getLogger(__name__)

SNAP_CAPI_URL = "https://tr.snapchat.com/v3/{pixel_id}/events"


def sha256_hex(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


async def send_snap_purchase(order: Order, contents: list[dict]) -> bool:
    if not settings.TRACKING_ENABLED:
        return False
    if not settings.SNAP_PIXEL_ID or not settings.SNAP_ACCESS_TOKEN:
        logger.debug("Snap CAPI not configured, skipping")
        return False

    event_id = order.snap_event_id or f"wz_purchase_{order.order_number}"

    # Snap: hash using digits with country code, no + (9665XXXXXXXX)
    hashed_phone = sha256_hex(order.phone_digits)

    user_data: dict[str, Any] = {
        "ph": hashed_phone,
        "client_ip_address": order.ip_address or "",
        "client_user_agent": order.user_agent or "",
    }

    event_data: dict[str, Any] = {
        "event_name": "PURCHASE",
        "event_time": int(time.time()),
        "event_id": event_id,
        "event_source_url": f"https://wazzen.shop/thank-you?order={order.order_number}",
        "user_data": user_data,
        "custom_data": {
            "currency": "SAR",
            "price": order.total_sar,
            "transaction_id": order.order_number,
            "item_ids": [item.get("id", "") for item in contents],
        },
    }

    payload = {"data": [event_data]}

    url = SNAP_CAPI_URL.format(pixel_id=settings.SNAP_PIXEL_ID)

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                headers={"Authorization": f"Bearer {settings.SNAP_ACCESS_TOKEN}"},
                json=payload,
            )
        if resp.status_code not in (200, 201):
            logger.error("Snap CAPI error: %s %s", resp.status_code, resp.text[:200])
            return False
        logger.info("Snap CAPI Purchase sent: event_id=%s", event_id)
        return True
    except Exception as exc:
        logger.error("Snap CAPI exception: %s", exc)
        return False
