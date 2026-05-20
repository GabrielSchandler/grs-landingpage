export type TrackingEvent =
  | "lead_form_submit"
  | "lead_form_error"
  | "whatsapp_click"
  | "simulator_submit"
  | "cta_click"
  | "ab_test_assignment";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: TrackingEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);
}

export function trackEventWithVariant(
  event: TrackingEvent,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  const variant = localStorage.getItem("grs_form_variant") || "unknown";
  trackEvent(event, { ...params, ab_variant: variant });
}
