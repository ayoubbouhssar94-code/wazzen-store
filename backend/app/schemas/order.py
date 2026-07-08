from pydantic import BaseModel, Field, field_validator
from typing import Optional
import re


class OrderItemIn(BaseModel):
    product_id: str
    quantity: int = Field(ge=1, le=3)
    is_upsell: bool = False


class OrderIn(BaseModel):
    customer_name: str = Field(min_length=2, max_length=200)
    phone: str = Field(min_length=7, max_length=20)

    items: list[OrderItemIn] = Field(min_length=1)

    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_content: Optional[str] = None
    utm_term: Optional[str] = None
    fbclid: Optional[str] = None
    ttclid: Optional[str] = None
    snap_click_id: Optional[str] = None
    fbp: Optional[str] = None
    fbc: Optional[str] = None
    ttp: Optional[str] = None
    landing_page: Optional[str] = None
    referrer: Optional[str] = None
    current_url: Optional[str] = None
    user_agent: Optional[str] = None

    meta_event_id: Optional[str] = None
    tiktok_event_id: Optional[str] = None
    snap_event_id: Optional[str] = None

    @field_validator("customer_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        words = [w for w in v.split() if len(w) >= 1]
        if len(v) < 3:
            raise ValueError("اكتبي الاسم الكامل")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone_format(cls, v: str) -> str:
        v = v.strip()
        digits = re.sub(r"[^\d+]", "", v)
        if not digits:
            raise ValueError("رقم الجوال لازم يكون رقم سعودي صحيح مثل 05XXXXXXXX")
        return v


class OrderItemOut(BaseModel):
    product_id: str
    quantity: int
    unit_price_sar: int
    line_total_sar: int
    is_upsell: bool

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    order_id: str
    order_number: str
    total_sar: int
    subtotal_sar: int
    upsell_sar: int
    upsell_accepted: bool
    customer_name: str
    phone_local: str
    items: list[OrderItemOut]
    created_at: str

    model_config = {"from_attributes": True}
