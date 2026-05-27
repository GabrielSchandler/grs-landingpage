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
  "min-h-12 w-full rounded-md border border-white/10 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/20";

export function HeroQuickForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [pendingLead, setPendingLead] = useState<MinimalLead | null>(null);

  const {
    control,
    handleSubmit,
    register,
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
          origem: "hero_quick_autosave",
        });

        trackEvent("hero_quick_autosave", {
          has_nome: true,
        });
      } catch {
        // Silent autosave keeps the first-screen capture frictionless.
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
        origem: "hero_quick_form",
      });

      setPendingLead(lead);
    } catch (error) {
      trackEvent("lead_form_error", {
        error: error instanceof Error ? error.message : "unknown",
        placement: "hero",
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:mt-7 sm:p-5"
      >
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Fale com a GRS Soluções pelo WhatsApp</p>
            <p className="mt-1 text-xs leading-5 text-zinc-400">
              Informe telefone e nome para iniciar o atendimento.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Sem compromisso
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_0.86fr_auto]">
          <label className="block">
            <span className="sr-only">Telefone</span>
            <input
              {...register("whatsapp")}
              className={inputClass}
              placeholder="Telefone com DDD"
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

          <label className="block">
            <span className="sr-only">Nome</span>
            <input
              {...register("nome")}
              className={inputClass}
              placeholder="Nome"
              autoComplete="name"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className={cn(
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950 lg:min-w-40",
              canSubmit
                ? "border-[#e30613] bg-[#e30613] text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] hover:bg-[#bd1018]"
                : "cursor-not-allowed border-white/10 bg-white/10 text-zinc-500",
            )}
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
            {isSubmitting ? "Registrando..." : "Enviar"}
          </button>
        </div>

        {(errors.whatsapp?.message || errors.nome?.message || feedback) ? (
          <div
            role={feedback?.type === "success" ? "status" : "alert"}
            className={cn(
              "mt-3 rounded-md border px-3 py-2 text-xs leading-5",
              feedback?.type === "success"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                : "border-red-400/30 bg-red-500/10 text-red-100",
            )}
          >
            {feedback?.message || errors.whatsapp?.message || errors.nome?.message}
          </div>
        ) : null}

        <p className="mt-3 text-[11px] leading-5 text-zinc-500">
          Seus dados são usados apenas para atendimento da GRS Soluções, conforme a LGPD.
        </p>
      </form>

      <LeadDetailsModal
        key={pendingLead?.whatsapp ?? "hero-details-modal"}
        lead={pendingLead}
        onClose={() => setPendingLead(null)}
        origem="hero_quick_form"
        trackingEvent="hero_quick_form_submit"
      />
    </>
  );
}
