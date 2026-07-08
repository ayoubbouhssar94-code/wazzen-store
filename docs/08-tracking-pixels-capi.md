# Tracking Pixels and CAPI

## Goal

Implement browser pixels plus server-side Conversions APIs for Meta, TikTok, and Snapchat with correct deduplication and hashing.

Browser events help immediate platform tracking. Server events improve attribution and resilience. Dedup prevents double counting.

## Events to Track

Browser and server where possible:

- `PageView`
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Purchase`

Priority:

- Browser: all events.
- Server CAPI: at minimum `Purchase`; ideally also `AddToCart` and `InitiateCheckout`.

## Event ID Rule

For every tracked conversion action, frontend generates a unique event ID:

```text
wz_<event>_<timestamp>_<random>
```

The same event ID must be sent:

- to the browser pixel call
- to backend
- from backend to CAPI

This is required for deduplication.

## Phone Normalization

KSA phone accepted from UI:

- `05XXXXXXXX`
- `5XXXXXXXX`
- `9665XXXXXXXX`
- `+9665XXXXXXXX`

Normalized values:

```text
local: 05XXXXXXXX
e164: +9665XXXXXXXX
digits: 9665XXXXXXXX
```

Platform usage:

- Meta phone hash input: digits with country code and no leading `+`, e.g. `9665XXXXXXXX`.
- TikTok phone hash input: E.164 with `+`, e.g. `+9665XXXXXXXX`.
- Snapchat phone hash input: digits with country code and no `+`, e.g. `9665XXXXXXXX`.

## Hashing

Hash only on backend for CAPI.

Use SHA-256 lowercase hex. Normalize before hashing.

Email is optional in this store because checkout has only name and phone.

Do not hash:

- IP address for Meta/TikTok.
- user agent.
- `fbp`, `fbc`, `_ttp`, `ttclid`.

Snap documentation supports hashed identifiers. For Snap phone, hash normalized digits. If using IP as a matching parameter for Snap CAPI, follow Snap docs for the exact field expected by the API version being implemented.

## Meta Pixel and CAPI

Browser:

```js
fbq("track", "Purchase", {
  value: total,
  currency: "SAR",
  contents,
  content_type: "product"
}, { eventID: eventId });
```

Server endpoint:

```text
POST https://graph.facebook.com/v25.0/{META_PIXEL_ID}/events?access_token={META_ACCESS_TOKEN}
```

Server payload shape:

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1714325000,
      "event_id": "same-event-id",
      "action_source": "website",
      "event_source_url": "https://wazzen.shop/thank-you",
      "user_data": {
        "ph": ["sha256_9665xxxxxxxx"],
        "client_ip_address": "raw_ip",
        "client_user_agent": "raw_user_agent",
        "fbp": "fbp_cookie_if_available",
        "fbc": "fbc_cookie_if_available"
      },
      "custom_data": {
        "currency": "SAR",
        "value": 349,
        "contents": [],
        "content_type": "product",
        "order_id": "WZ-..."
      }
    }
  ]
}
```

Meta dedup:

- Browser `eventID` must match server `event_id`.
- Browser event name must match server `event_name`.
- Dedup window is 48 hours.

## TikTok Pixel and Events API

Browser:

```js
ttq.track("CompletePayment", {
  value: total,
  currency: "SAR",
  contents
}, { event_id: eventId });
```

Server requirements:

- Include matching `event_id`.
- Include `event_source_id` / pixel code according to TikTok Events API version.
- Hash phone using SHA-256 after E.164 normalization with `+966`.
- Include `_ttp` cookie and `ttclid` when available.
- Include raw IP and user agent.

TikTok phone:

```text
+9665XXXXXXXX -> sha256
```

TikTok dedup:

- Same pixel/source, event type, and event ID.
- 48-hour window.

## Snapchat Pixel and CAPI

Browser:

Use Snap Pixel with deferred script loading. For dedup, pass a client dedup ID where supported.

Server CAPI:

- Use Snap CAPI v3.
- Use matching `event_id` for server and browser dedup.
- For web dedup, Snap maps browser `client_dedup_id` to CAPI `event_id`.
- For purchases, also pass browser `transaction_id` and CAPI `order_id` when possible.

Snap phone:

```text
9665XXXXXXXX -> sha256
```

Snap dedup:

- Non-purchase: browser `client_dedup_id` equals CAPI `event_id`.
- Purchase: also use transaction/order ID for stronger dedup.

## Script Loading

Use `next/script`.

Rules:

- Do not block first paint with pixel scripts.
- Use `strategy="afterInteractive"` for pixel base scripts.
- Fire page events after scripts are ready.
- Queue events until vendor scripts are loaded.
- Do not put access tokens in frontend.

## Data Captured on Landing

Frontend should store in first-party storage/session:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `ttclid`
- Snap click parameters if available
- landing page URL
- referrer

Also read cookies when available:

- `_fbp`
- `_fbc`
- `_ttp`

Send these to backend with checkout/order.

## Environment Variables

Frontend:

```text
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_CODE=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_TRACKING_ENABLED=true
```

Backend:

```text
META_PIXEL_ID=
META_ACCESS_TOKEN=
TIKTOK_PIXEL_CODE=
TIKTOK_ACCESS_TOKEN=
SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=
TRACKING_ENABLED=true
```

## Testing

Before launch:

- Verify browser events in each platform event tester.
- Verify server Purchase arrives.
- Verify one purchase is not double-counted.
- Confirm phone hashes are generated on backend only.
- Confirm no CAPI token appears in browser bundle.
