export type TrackingEvent =
  | "lead_form_submit"
  | "lead_form_error"
  | "lead_form_autosave"
  | "hero_quick_form_submit"
  | "hero_quick_autosave"
  | "whatsapp_click"
  | "whatsapp_popup_autosave"
  | "whatsapp_lead_submit"
  | "simulator_submit"
  | "cta_click";

const conversionEvents = new Set<TrackingEvent>([
  "lead_form_submit",
  "hero_quick_form_submit",
  "whatsapp_lead_submit",
]);

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

  const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const googleAdsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_LEAD;

  if (conversionEvents.has(event) && googleAdsConversionId && googleAdsLeadLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAdsConversionId}/${googleAdsLeadLabel}`,
      event_callback: undefined,
      ...params,
    });
  }

  window.fbq?.("trackCustom", event, params);
}
