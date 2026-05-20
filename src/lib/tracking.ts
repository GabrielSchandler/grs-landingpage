export type TrackingEvent =
  | "lead_form_submit"
  | "lead_form_error"
  | "lead_form_autosave"
  | "whatsapp_click"
  | "whatsapp_popup_autosave"
  | "whatsapp_lead_submit"
  | "simulator_submit"
  | "cta_click";

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
