from pydantic import BaseModel
from typing import Optional, Any


class TrackingEventIn(BaseModel):
    event_name: str
    event_id: str
    order_id: Optional[str] = None
    platform: str
    payload: Optional[dict[str, Any]] = None
