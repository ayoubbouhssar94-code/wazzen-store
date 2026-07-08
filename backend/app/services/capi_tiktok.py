import hashlib
import logging
import time
from typing import Any

import httpx

from app.core.config import settings
from app.db.models import Order

logger = logging.getLogger(__name__)

TIKTOK_EVENTS_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/"


def sha256_hex(value: str) -> str:
    return hashlib.sha256(value.strip().encode()).hexdigest()


async def send_tiktok_purchase(order: Order, contents: list[dict]) -> bool:
    if not settings.TRACKING_ENABLED:
        return False
    if not settings.TIKTOK_PIXEL_CODE or not settings.TIKTOK_ACCESS_TOKEN:
        logger.debug("TikTok Events API not configured, skipping")
        return False

    event_id = order.tiktok_event_id or f"wz_purchase_{order.order_number}"

    # TikTok: hash phone using E.164 (+9665XXXXXXXX)
    hashed_phone = sha256_hex(order.phone_e164)

    properties: dict[str, Any] = {
        "currency": "SAR",
        "value": order.total_sar,
        "contents": contents,
        "order_id": order.order_number,
    }

    context: dict[str, Any] = {
        "user_agent": order.user_agent or "",
        "ip": order.ip_address or "",
    }
    if order.ttp:
        context["ttp"] = order.ttp
    if order.ttclid:
        context["ttclid"] = order.ttclid

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_CODE,
        "event": "CompletePayment",
        "event_id": event_id,
        "timestamp": str(int(time.time())),
        "context": context,
        "properties": properties,
        "user": {
            "phone_number": hashed_phone,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                TIKTOK_EVENTS_URL,
                headers={"Access-Token": settings.TIKTOK_ACCESS_TOKEN},
                json=payload,
            )
        if resp.status_code not in (200, 201):
            logger.error("TikTok CAPI error: %s %s", resp.status_code, resp.text[:200])
            return False
        logger.info("TikTok CAPI Purchase sent: event_id=%s", event_id)
        return True
    except Exception as exc:
        logger.error("TikTok CAPI exception: %s", exc)
        return False
