const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.wazzen.shop";

export type OrderItemPayload = {
  product_id: string;
  quantity: number;
  is_upsell?: boolean;
};

export type OrderPayload = {
  customer_name: string;
  phone: string;
  items: OrderItemPayload[];
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  snap_click_id?: string;
  fbp?: string;
  fbc?: string;
  ttp?: string;
  landing_page?: string;
  referrer?: string;
  current_url?: string;
  user_agent?: string;
  meta_event_id?: string;
  tiktok_event_id?: string;
  snap_event_id?: string;
};

export type OrderResponse = {
  order_id: string;
  order_number: string;
  total_sar: number;
  subtotal_sar: number;
  upsell_sar: number;
  upsell_accepted: boolean;
  customer_name: string;
  phone_local: string;
  items: {
    product_id: string;
    quantity: number;
    unit_price_sar: number;
    line_total_sar: number;
    is_upsell: boolean;
  }[];
  created_at: string;
};

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function submitOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "حدث خطأ. يرجى المحاولة مرة أخرى." }));
    const message =
      typeof body.detail === "string"
        ? body.detail
        : "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.";
    throw new ApiError(message, res.status);
  }

  return res.json();
}
