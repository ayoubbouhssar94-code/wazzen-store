import hashlib
import logging
import time
from typing import Any, Optional

import httpx

from app.core.config import settings
from app.db.models import Order

logger = logging.getLogger(__name__)

META_CAPI_URL = "https://graph.facebook.com/v25.0/{pixel_id}/events"


def sha256_hex(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


def build_meta_purchase_payload(
    order: Order,
    event_id: str,
    contents: list[dict],
) -> dict[str, Any]:
    user_data: dict[str, Any] = {
        "ph": [sha256_hex(order.phone_digits)],
        "client_ip_address": order.ip_address or "",
        "client_user_agent": order.user_agent or "",
    }
    if order.fbp:
        user_data["fbp"] = order.fbp
    if order.fbc:
        user_data["fbc"] = order.fbc

    return {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": int(time.time()),
                "event_id": event_id,
                "action_source": "website",
                "event_source_url": f"https://wazzen.shop/thank-you?order={order.order_number}",
                "user_data": user_data,
                "custom_data": {
                    "currency": "SAR",
                    "value": order.total_sar,
                    "contents": contents,
                    "content_type": "product",
                    "order_id": order.order_number,
                },
            }
        ]
    }


async def send_meta_purchase(order: Order, contents: list[dict]) -> bool:
    if not settings.TRACKING_ENABLED:
        return False
    if not settings.META_PIXEL_ID or not settings.META_ACCESS_TOKEN:
        logger.debug("Meta CAPI not configured, skipping")
        return False

    event_id = order.meta_event_id or f"wz_purchase_{order.order_number}"
    payload = build_meta_purchase_payload(order, event_id, contents)
    url = META_CAPI_URL.format(pixel_id=settings.META_PIXEL_ID)

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                params={"access_token": settings.META_ACCESS_TOKEN},
                json=payload,
            )
        if resp.status_code not in (200, 201):
            logger.error("Meta CAPI error: %s %s", resp.status_code, resp.text[:200])
            return False
        logger.info("Meta CAPI Purchase sent: event_id=%s", event_id)
        return True
    except Exception as exc:
        logger.error("Meta CAPI exception: %s", exc)
        return False
