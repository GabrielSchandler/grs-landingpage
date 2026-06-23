import { NextResponse } from "next/server";
import {
  leadDraftSchema,
  leadSchema,
  toLeadDraftPayload,
  toLeadPayload,
  type LeadOrigin,
} from "@/lib/lead-schema";

export const runtime = "nodejs";

type GoogleSheetsResponse = {
  ok?: boolean;
  error?: string;
};

const allowedOrigins = new Set<LeadOrigin>([
  "landing_page",
  "hero_quick_form",
  "hero_quick_autosave",
  "whatsapp_popup",
  "form_autosave",
  "whatsapp_popup_autosave",
]);

const draftOrigins = new Set<LeadOrigin>([
  "form_autosave",
  "hero_quick_autosave",
  "whatsapp_popup_autosave",
]);

const attributionKeys = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_page",
  "referrer",
] as const;

function sanitizeAttribution(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") {
    return {};
  }

  const source = input as Record<string, unknown>;
  const result: Record<string, string> = {};

  for (const key of attributionKeys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      result[key] = value.trim().slice(0, 512);
    }
  }

  return result;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "Integração com Google Sheets ainda não configurada." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const origem: LeadOrigin =
      typeof body?.origem === "string" && allowedOrigins.has(body.origem)
        ? body.origem
        : "landing_page";
    const isDraftLead = draftOrigins.has(origem);
    const parsed = isDraftLead ? leadDraftSchema.safeParse(body) : leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const lead =
      isDraftLead
        ? toLeadDraftPayload(parsed.data, origem)
        : toLeadPayload(parsed.data, origem);
    const submittedAt = new Date().toISOString();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const googleResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: webhookSecret,
        lead,
        meta: {
          submitted_at: submittedAt,
          page_url: request.headers.get("referer") || null,
          attribution: sanitizeAttribution(body?.attribution),
        },
      }),
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    const responseText = await googleResponse.text();
    let responseData: GoogleSheetsResponse | null = null;

    try {
      responseData = responseText ? (JSON.parse(responseText) as GoogleSheetsResponse) : null;
    } catch {
      responseData = null;
    }

    if (!googleResponse.ok || responseData?.ok !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: responseData?.error || "Não foi possível registrar o lead na planilha.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
