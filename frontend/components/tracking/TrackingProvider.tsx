"use client";

import { useEffect } from "react";
import {
  readUTMParams,
  readClickIds,
  readFBCookies,
  persistSession,
} from "@/lib/events";

export function TrackingProvider() {
  useEffect(() => {
    const utms = readUTMParams();
    const clickIds = readClickIds();
    const fbCookies = readFBCookies();

    const session: Record<string, string> = {
      ...utms,
      ...clickIds,
      ...fbCookies,
      landing_page: window.location.href,
      referrer: document.referrer,
    };

    persistSession(session);
  }, []);

  return null;
}
