export type Attribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

const STORAGE_KEY = "grs-attribution";
const MAX_VALUE_LENGTH = 512;

// Click IDs are what allow importing offline conversions back into Google/Meta
// Ads. UTMs give human-readable campaign attribution in the sheet.
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "fbclid"] as const;
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const TRACKED_KEYS = [...CLICK_ID_KEYS, ...UTM_KEYS] as const;

function sanitizeValue(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed || undefined;
}

function readStored(): Attribution {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/**
 * Captures Google/Meta click IDs and UTM parameters from the current URL and
 * persists them (last-touch for click IDs) so a converting lead can be tied
 * back to the ad that drove the click. Safe to call on every page load: it only
 * writes when the URL actually carries attribution data.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};

  for (const key of TRACKED_KEYS) {
    const value = sanitizeValue(params.get(key));
    if (value) {
      incoming[key] = value;
    }
  }

  // No click ID / UTM in this URL — keep whatever we already stored.
  if (Object.keys(incoming).length === 0) {
    return;
  }

  const stored = readStored();
  const merged: Attribution = {
    ...stored,
    ...incoming,
    landing_page: stored.landing_page || window.location.pathname + window.location.search,
    referrer: stored.referrer || sanitizeValue(document.referrer),
    captured_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Attribution is best-effort and must never block the page.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {};
  }

  return readStored();
}
