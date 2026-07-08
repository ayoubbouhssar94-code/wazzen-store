let counter = 0;

export function generateEventId(eventType: string): string {
  counter++;
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `wz_${eventType}_${ts}_${rand}_${counter}`;
}

export function readUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const result: Record<string, string> = {};
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) result[key] = val;
  }
  return result;
}

export function readClickIds(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  const ids = ["fbclid", "ttclid", "ScCid"];
  for (const key of ids) {
    const val = params.get(key);
    if (val) result[key === "ScCid" ? "snap_click_id" : key] = val;
  }
  return result;
}

export function readFBCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const cookies = Object.fromEntries(
    document.cookie.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k.trim(), v.join("=")];
    })
  );
  const result: Record<string, string> = {};
  if (cookies._fbp) result.fbp = cookies._fbp;
  if (cookies._fbc) result.fbc = cookies._fbc;
  if (cookies._ttp) result.ttp = cookies._ttp;
  return result;
}

export function persistSession(data: Record<string, string>) {
  if (typeof sessionStorage === "undefined") return;
  for (const [k, v] of Object.entries(data)) {
    if (v) sessionStorage.setItem(`wz_${k}`, v);
  }
}

export function readSession(): Record<string, string> {
  if (typeof sessionStorage === "undefined") return {};
  const result: Record<string, string> = {};
  const keys = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "fbclid", "ttclid", "snap_click_id", "landing_page", "referrer",
    "fbp", "fbc", "ttp",
  ];
  for (const key of keys) {
    const val = sessionStorage.getItem(`wz_${key}`);
    if (val) result[key] = val;
  }
  return result;
}
