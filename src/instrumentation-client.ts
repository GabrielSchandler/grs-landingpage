import { captureAttribution } from "./lib/attribution";

// Capture ad click IDs (gclid/gbraid/wbraid/fbclid) and UTMs as early as
// possible so they survive even if the visitor navigates before converting.
try {
  captureAttribution();
} catch {
  // Instrumentation must never break the app.
}
