import pytest
from app.schemas.order import OrderItemIn
from app.services.pricing import calculate_totals, get_offer_price, OFFER_PRICES, UPSELL_PRICE


def test_offer_prices():
    assert get_offer_price(1) == 199
    assert get_offer_price(2) == 279
    assert get_offer_price(3) == 349


def test_invalid_offer_quantity():
    with pytest.raises(ValueError):
        get_offer_price(4)


def test_single_item_1piece():
    items = [OrderItemIn(product_id="nano-titanium-windshield-umbrella", quantity=1)]
    result = calculate_totals(items)
    assert result["subtotal_sar"] == 199
    assert result["upsell_sar"] == 0
    assert result["total_sar"] == 199


def test_single_item_2piece():
    items = [OrderItemIn(product_id="nano-titanium-windshield-umbrella", quantity=2)]
    result = calculate_totals(items)
    assert result["subtotal_sar"] == 279
    assert result["total_sar"] == 279


def test_single_item_3piece():
    items = [OrderItemIn(product_id="wazzen-glassguard-chip-system", quantity=3)]
    result = calculate_totals(items)
    assert result["subtotal_sar"] == 349


def test_with_upsell():
    items = [
        OrderItemIn(product_id="nano-titanium-windshield-umbrella", quantity=2),
        OrderItemIn(product_id="wazzen-airsafe-tire-inflator", quantity=1, is_upsell=True),
    ]
    result = calculate_totals(items)
    assert result["subtotal_sar"] == 279
    assert result["upsell_sar"] == 99
    assert result["total_sar"] == 378


def test_invalid_product():
    items = [OrderItemIn(product_id="fake-product", quantity=1)]
    with pytest.raises(ValueError):
        calculate_totals(items)


def test_empty_items():
    with pytest.raises(ValueError):
        calculate_totals([])
