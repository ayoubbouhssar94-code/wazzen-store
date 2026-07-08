"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: object, options?: object) => void;
      identify: (data: object) => void;
    };
    snaptr?: (...args: unknown[]) => void;
  }
}

const isTrackingEnabled = () =>
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_TRACKING_ENABLED === "true";

type TrackContent = { id: string; quantity: number; price: number };

// ─── Meta ────────────────────────────────────────────────────────────────────

export function fireMetaPageView() {
  if (!isTrackingEnabled() || !window.fbq) return;
  window.fbq("track", "PageView");
}

export function fireMetaViewContent(
  productId: string,
  price: number,
  eventId: string
) {
  if (!isTrackingEnabled() || !window.fbq) return;
  window.fbq(
    "track",
    "ViewContent",
    { content_ids: [productId], value: price, currency: "SAR", content_type: "product" },
    { eventID: eventId }
  );
}

export function fireMetaAddToCart(
  productId: string,
  price: number,
  eventId: string
) {
  if (!isTrackingEnabled() || !window.fbq) return;
  window.fbq(
    "track",
    "AddToCart",
    { content_ids: [productId], value: price, currency: "SAR", content_type: "product" },
    { eventID: eventId }
  );
}

export function fireMetaInitiateCheckout(total: number, eventId: string) {
  if (!isTrackingEnabled() || !window.fbq) return;
  window.fbq(
    "track",
    "InitiateCheckout",
    { value: total, currency: "SAR" },
    { eventID: eventId }
  );
}

export function fireMetaPurchase(
  total: number,
  contents: TrackContent[],
  eventId: string
) {
  if (!isTrackingEnabled() || !window.fbq) return;
  window.fbq(
    "track",
    "Purchase",
    { value: total, currency: "SAR", contents, content_type: "product" },
    { eventID: eventId }
  );
}

// ─── TikTok ──────────────────────────────────────────────────────────────────

export function fireTikTokPageView() {
  if (!isTrackingEnabled() || !window.ttq) return;
  window.ttq.track("PageView");
}

export function fireTikTokViewContent(
  productId: string,
  price: number,
  eventId: string
) {
  if (!isTrackingEnabled() || !window.ttq) return;
  window.ttq.track(
    "ViewContent",
    { content_id: productId, value: price, currency: "SAR" },
    { event_id: eventId }
  );
}

export function fireTikTokAddToCart(
  productId: string,
  price: number,
  eventId: string
) {
  if (!isTrackingEnabled() || !window.ttq) return;
  window.ttq.track(
    "AddToCart",
    { content_id: productId, value: price, currency: "SAR" },
    { event_id: eventId }
  );
}

export function fireTikTokInitiateCheckout(total: number, eventId: string) {
  if (!isTrackingEnabled() || !window.ttq) return;
  window.ttq.track(
    "InitiateCheckout",
    { value: total, currency: "SAR" },
    { event_id: eventId }
  );
}

export function fireTikTokPurchase(
  total: number,
  contents: TrackContent[],
  eventId: string
) {
  if (!isTrackingEnabled() || !window.ttq) return;
  window.ttq.track(
    "CompletePayment",
    { value: total, currency: "SAR", contents },
    { event_id: eventId }
  );
}

// ─── Snapchat ────────────────────────────────────────────────────────────────

export function fireSnapPageView() {
  if (!isTrackingEnabled() || !window.snaptr) return;
  window.snaptr("track", "PAGE_VIEW");
}

export function fireSnapViewContent(
  productId: string,
  price: number,
  clientDedupId: string
) {
  if (!isTrackingEnabled() || !window.snaptr) return;
  window.snaptr("track", "VIEW_CONTENT", {
    price,
    currency: "SAR",
    item_ids: [productId],
    client_dedup_id: clientDedupId,
  });
}

export function fireSnapAddToCart(
  productId: string,
  price: number,
  clientDedupId: string
) {
  if (!isTrackingEnabled() || !window.snaptr) return;
  window.snaptr("track", "ADD_CART", {
    price,
    currency: "SAR",
    item_ids: [productId],
    client_dedup_id: clientDedupId,
  });
}

export function fireSnapPurchase(
  total: number,
  orderNumber: string,
  clientDedupId: string
) {
  if (!isTrackingEnabled() || !window.snaptr) return;
  window.snaptr("track", "PURCHASE", {
    price: total,
    currency: "SAR",
    transaction_id: orderNumber,
    client_dedup_id: clientDedupId,
  });
}
