from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from app.db.session import get_db
from app.db.models import TrackingEvent
from app.schemas.tracking import TrackingEventIn

router = APIRouter()


@router.post("/tracking/events", status_code=201)
async def record_tracking_event(
    payload: TrackingEventIn,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    order_uuid = None
    if payload.order_id:
        try:
            order_uuid = uuid.UUID(payload.order_id)
        except ValueError:
            pass

    event = TrackingEvent(
        event_name=payload.event_name,
        event_id=payload.event_id,
        order_id=order_uuid,
        platform=payload.platform,
        payload=payload.payload,
    )
    db.add(event)
    await db.commit()
    return {"ok": True}
