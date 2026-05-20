import { NextResponse } from "next/server";
import { leadSchema, toLeadPayload, type LeadOrigin } from "@/lib/lead-schema";

export const runtime = "nodejs";

type GoogleSheetsResponse = {
  ok?: boolean;
  error?: string;
};

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
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const origem: LeadOrigin = body?.origem === "whatsapp_popup" ? "whatsapp_popup" : "landing_page";
    const lead = toLeadPayload(parsed.data, origem);
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
