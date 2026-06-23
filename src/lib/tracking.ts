import { googleAdsConversionId, googleAdsLeadLabel } from "@/lib/google-ads";

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

// Only real, intentful submissions count as Google Ads conversions. Autosave
// events still fire to dataLayer/GA4 (and persist the lead to the sheet), but
// they must NOT be sent as conversions — otherwise Smart Bidding optimizes for
// people who merely start typing instead of qualified leads.
const conversionEvents = new Set<TrackingEvent>([
  "lead_form_submit",
  "hero_quick_form_submit",
  "whatsapp_lead_submit",
]);

const conversionStorageKey = "grs-google-ads-lead-conversion";

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

  if (
    conversionEvents.has(event) &&
    googleAdsConversionId &&
    googleAdsLeadLabel &&
    !hasTrackedLeadConversion()
  ) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAdsConversionId}/${googleAdsLeadLabel}`,
      event_callback: undefined,
      conversion_source_event: event,
      ...params,
    });

    markLeadConversionTracked();
  }

  window.fbq?.("trackCustom", event, params);
}

function hasTrackedLeadConversion() {
  try {
    return window.sessionStorage.getItem(conversionStorageKey) === "true";
  } catch {
    return false;
  }
}

function markLeadConversionTracked() {
  try {
    window.sessionStorage.setItem(conversionStorageKey, "true");
  } catch {
    // Tracking should never block the lead flow.
  }
}
