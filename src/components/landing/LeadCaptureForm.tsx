"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LeadDetailsModal } from "@/components/landing/LeadDetailsModal";
import {
  ensureLeadSaved,
  hasSavedLead,
  onlyDigits,
  type MinimalLead,
} from "@/lib/lead-client";
import { leadSchema, type LeadFormInput, type LeadFormValues } from "@/lib/lead-schema";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-12 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";

export function LeadCaptureForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [pendingLead, setPendingLead] = useState<MinimalLead | null>(null);

  const {
    register,
    handleSubmit,
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
  const canSubmit = nome.trim().length >= 2 && phoneDigits.length >= 10;

  useEffect(() => {
    if (!canSubmit || hasSavedLead(whatsapp)) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        await ensureLeadSaved({
          nome,
          whatsapp,
          origem: "form_autosave",
        });

        trackEvent("lead_form_autosave", {
          has_nome: true,
        });
      } catch {
        // Autosave is a silent safety net; submit will retry before the popup opens.
      }
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [canSubmit, nome, whatsapp]);

  async function onSubmit(values: LeadFormValues) {
    setFeedback(null);

    const lead = {
      nome: values.nome,
      whatsapp: values.whatsapp,
    };

    try {
      await ensureLeadSaved({
        ...lead,
        origem: "landing_page",
      });

      setPendingLead(lead);
    } catch (error) {
      trackEvent("lead_form_error", {
        error: error instanceof Error ? error.message : "unknown",
      });

      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível registrar seu contato agora. Tente novamente em instantes ou chame pelo WhatsApp.",
      });
    }
  }

  return (
    <>
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
              Informe telefone e nome. Em seguida, pedimos alguns dados opcionais para agilizar o atendimento.
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
            <Field label="Telefone" error={errors.whatsapp?.message}>
              <input
                {...register("whatsapp")}
                className={inputClass}
                placeholder="(11) 98765-4321"
                autoComplete="tel"
                inputMode="tel"
              />
            </Field>

            <Field label="Nome" error={errors.nome?.message}>
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
            disabled={isSubmitting || !canSubmit}
            className={cn(
              "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
              canSubmit
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
                <Send className="size-4" aria-hidden />
                Enviar
              </>
            )}
          </button>

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-zinc-50 px-3.5 py-3 text-xs leading-5 text-zinc-600">
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">
              ✓
            </div>
            <span>
              Seus dados são tratados com segurança conforme a{" "}
              <span className="font-semibold text-zinc-900">LGPD</span>. Se informar telefone e nome, podemos registrar
              esse contato para continuidade do atendimento.
            </span>
          </div>
        </div>
      </form>

      <LeadDetailsModal
        key={pendingLead?.whatsapp ?? "lead-details-modal"}
        lead={pendingLead}
        onClose={() => setPendingLead(null)}
        origem="landing_page"
        trackingEvent="lead_form_submit"
      />
    </>
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
