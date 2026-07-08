from app.schemas.order import OrderItemIn

OFFER_PRICES: dict[int, int] = {
    1: 199,
    2: 279,
    3: 349,
}
UPSELL_PRICE: int = 99

VALID_PRODUCT_IDS = {
    "titanium-silver-sunshade",
    "premium-leather-gap-console",
    "hepa-car-vacuum",
}


def get_offer_price(quantity: int) -> int:
    """Return the bundle price for a given quantity."""
    if quantity not in OFFER_PRICES:
        raise ValueError(f"Invalid offer quantity: {quantity}. Must be 1, 2, or 3.")
    return OFFER_PRICES[quantity]


def calculate_totals(items: list[OrderItemIn]) -> dict:
    """
    Recalculate totals server-side. Returns dict with:
    - subtotal_sar: sum of non-upsell items
    - upsell_sar: upsell item total
    - total_sar: full total
    - line_items: list of {product_id, quantity, unit_price, line_total, is_upsell}
    """
    if not items:
        raise ValueError("يجب أن يحتوي الطلب على منتج واحد على الأقل")

    subtotal = 0
    upsell_total = 0
    line_items = []

    for item in items:
        if item.product_id not in VALID_PRODUCT_IDS:
            raise ValueError(f"منتج غير صالح: {item.product_id}")

        if item.is_upsell:
            unit_price = UPSELL_PRICE
            line_total = UPSELL_PRICE * item.quantity
            upsell_total += line_total
        else:
            unit_price = get_offer_price(item.quantity)
            line_total = unit_price
            subtotal += line_total

        line_items.append({
            "product_id": item.product_id,
            "quantity": item.quantity,
            "unit_price_sar": unit_price,
            "line_total_sar": line_total,
            "is_upsell": item.is_upsell,
        })

    return {
        "subtotal_sar": subtotal,
        "upsell_sar": upsell_total,
        "total_sar": subtotal + upsell_total,
        "line_items": line_items,
    }
