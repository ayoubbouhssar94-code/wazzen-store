import pytest
from pydantic import ValidationError
from app.schemas.order import OrderIn, OrderItemIn


def make_valid_order(**overrides):
    base = dict(
        customer_name="فاطمة الأحمدي",
        phone="0512345678",
        items=[OrderItemIn(product_id="nano-titanium-windshield-umbrella", quantity=2)],
    )
    base.update(overrides)
    return base


def test_valid_order():
    order = OrderIn(**make_valid_order())
    assert order.customer_name == "فاطمة الأحمدي"
    assert order.phone == "0512345678"
    assert len(order.items) == 1


def test_short_name_rejected():
    with pytest.raises(ValidationError):
        OrderIn(**make_valid_order(customer_name="أ"))


def test_empty_phone_rejected():
    with pytest.raises(ValidationError):
        OrderIn(**make_valid_order(phone=""))


def test_no_items_rejected():
    with pytest.raises(ValidationError):
        OrderIn(**make_valid_order(items=[]))


def test_order_with_upsell():
    order = OrderIn(**make_valid_order(
        items=[
            OrderItemIn(product_id="nano-titanium-windshield-umbrella", quantity=2),
            OrderItemIn(product_id="wazzen-airsafe-tire-inflator", quantity=1, is_upsell=True),
        ]
    ))
    assert len(order.items) == 2
    assert order.items[1].is_upsell is True


def test_utm_fields_optional():
    order = OrderIn(**make_valid_order(
        utm_source="tiktok",
        utm_campaign="summer_heat",
    ))
    assert order.utm_source == "tiktok"
    assert order.utm_campaign == "summer_heat"
    assert order.utm_medium is None
