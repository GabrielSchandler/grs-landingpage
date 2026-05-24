"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { leadSchema, type LeadFormInput, type LeadFormValues } from "@/lib/lead-schema";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { getWhatsAppHref } from "@/lib/whatsapp";

const inputClass =
  "min-h-12 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function getAutosaveKey(phoneDigits: string) {
  const storageDate = new Date().toISOString().slice(0, 10);
  return `grs-form-autosave:${storageDate}:${phoneDigits}`;
}

async function sendLead(payload: {
  nome: string;
  whatsapp: string;
  origem: "landing_page" | "form_autosave";
}) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || "Não foi possível registrar seu contato agora.");
  }
}

export function LeadCaptureForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      whatsapp: "",
    },
  });

  const watchedValues = useWatch({ control });
  const nome = watchedValues.nome ?? "";
  const whatsapp = watchedValues.whatsapp ?? "";
  const phoneDigits = onlyDigits(whatsapp);
  const canContinue = nome.trim().length >= 2 && phoneDigits.length >= 10;

  useEffect(() => {
    if (isSuccess || !canContinue) {
      return;
    }

    const storageKey = getAutosaveKey(phoneDigits);

    if (window.localStorage.getItem(storageKey)) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        await sendLead({
          nome,
          whatsapp,
          origem: "form_autosave",
        });

        window.localStorage.setItem(storageKey, new Date().toISOString());
        trackEvent("lead_form_autosave", {
          has_nome: true,
          destination: "whatsapp",
        });
      } catch {
        // Autosave is silent; the submit button will retry before opening WhatsApp.
      }
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [canContinue, isSuccess, nome, phoneDigits, whatsapp]);

  async function onSubmit(values: LeadFormValues) {
    setFeedback(null);

    try {
      const currentPhoneDigits = onlyDigits(values.whatsapp);
      const storageKey = getAutosaveKey(currentPhoneDigits);

      if (!window.localStorage.getItem(storageKey)) {
        await sendLead({
          nome: values.nome,
          whatsapp: values.whatsapp,
          origem: "landing_page",
        });

        window.localStorage.setItem(storageKey, new Date().toISOString());
      }

      trackEvent("lead_form_submit", {
        destination: "whatsapp",
      });

      setIsSuccess(true);
      reset();
      setFeedback({
        type: "success",
        message: "Contato registrado. Abrindo o WhatsApp...",
      });

      window.setTimeout(() => {
        window.location.href = getWhatsAppHref();
      }, 350);
    } catch (error) {
      trackEvent("lead_form_error", {
        error: error instanceof Error ? error.message : "unknown",
        destination: "whatsapp",
      });

      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível registrar seu contato agora. Tente novamente em instantes.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="premium-card relative overflow-hidden rounded-lg border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-2xl shadow-zinc-950/12 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,6,19,0.05),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            Atendimento pelo WhatsApp
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-950">
            Fale com um consultor da GRS Soluções
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Informe seu nome e WhatsApp. Antes de abrir a conversa, registramos seu contato para dar continuidade ao atendimento.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
            <span className="size-2 rounded-full bg-red-600" aria-hidden />
            Sem compromisso
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="size-2 rounded-full bg-blue-600" aria-hidden />
            Atendimento humano
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <span className="size-2 rounded-full bg-amber-600" aria-hidden />
            Retorno em até 1h
          </span>
        </div>

        <div className="grid gap-4">
          <Field label="WhatsApp com DDD" error={errors.whatsapp?.message}>
            <input
              {...register("whatsapp")}
              className={inputClass}
              placeholder="(11) 98765-4321"
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>

          <Field label="Seu nome" error={errors.nome?.message}>
            <input
              {...register("nome")}
              className={inputClass}
              placeholder="João"
              autoComplete="name"
            />
          </Field>
        </div>

        {feedback ? (
          <div
            role={feedback.type === "success" ? "status" : "alert"}
            className={cn(
              "mt-5 rounded-md border px-4 py-3 text-sm leading-6",
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800",
            )}
          >
            {feedback.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !canContinue}
          className={cn(
            "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
            canContinue
              ? "btn-pulse cursor-pointer border-[#e30613] bg-[#e30613] hover:bg-[#bd1018] focus:ring-red-500"
              : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400",
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Registrando contato...
            </>
          ) : (
            <>
              <MessageCircle className="size-4" aria-hidden />
              Avançar para WhatsApp
            </>
          )}
        </button>

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-zinc-50 px-3.5 py-3 text-xs leading-5 text-zinc-600">
          <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">
            ✓
          </div>
          <span>
            Ao avançar, você autoriza o contato da GRS Soluções pelo WhatsApp. Seus dados são tratados conforme a{" "}
            <span className="font-semibold text-zinc-900">LGPD</span>.
          </span>
        </div>
      </div>
    </form>
  );
}

function Field({
  children,
  error,
  label,
}: {
  children: React.ReactNode;
  error?: string;
  label: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-800">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-medium text-red-700">{error}</span> : null}
    </label>
  );
}
