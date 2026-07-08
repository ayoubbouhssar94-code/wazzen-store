# Google Sheets Webhook

## Goal

Orders must be saved in Postgres and also appended to a Google Sheet through an Apps Script webhook.

Backend sends JSON to:

```text
GOOGLE_SHEETS_WEBHOOK_URL
```

The webhook script is provided in `google-apps-script-webhook.js`.

## Sheet Setup

Create a Google Sheet with a tab named:

```text
Orders
```

Use the columns in `sheet-template.csv`.

## Backend Payload

The backend should send a flat JSON payload so Apps Script can append one row easily:

```json
{
  "order_id": "uuid",
  "order_number": "WZ-20260707-000001",
  "created_at": "2026-07-07T22:10:00Z",
  "status": "new",
  "customer_name": "Name",
  "phone_local": "05XXXXXXXX",
  "phone_e164": "+9665XXXXXXXX",
  "city": "",
  "items_summary": "Sunshade x2",
  "items_json": "[{\"product_id\":\"sunshade\",\"qty\":2,\"price\":279}]",
  "upsell_accepted": "yes",
  "upsell_product": "premium-leather-gap-console",
  "subtotal_sar": 279,
  "upsell_sar": 99,
  "total_sar": 378,
  "payment_method": "COD",
  "utm_source": "tiktok",
  "utm_medium": "paid",
  "utm_campaign": "summer",
  "utm_content": "ugc_1",
  "utm_term": "",
  "fbclid": "",
  "ttclid": "",
  "snap_click_id": "",
  "landing_page": "https://wazzen.shop/products/...",
  "referrer": "",
  "user_agent": "",
  "ip_address": "",
  "meta_event_id": "",
  "tiktok_event_id": "",
  "snap_event_id": "",
  "notes": ""
}
```

## Webhook Response

Apps Script should return:

```json
{
  "ok": true,
  "row": 2
}
```

Backend should store success/failure in `webhook_deliveries`.

## Security

Simple v1 security:

- Add a shared secret query param or header.
- Backend env: `GOOGLE_SHEETS_WEBHOOK_SECRET`.
- Apps Script checks the secret before appending.

Example URL:

```text
https://script.google.com/macros/s/.../exec?secret=YOUR_SECRET
```

Do not expose this URL in frontend.

## Retry

If Sheets fails:

- Do not fail the customer order.
- Log the failure.
- Add a backend retry job later if needed.

For v1, a manual admin script or endpoint can replay failed webhook deliveries from the database.
