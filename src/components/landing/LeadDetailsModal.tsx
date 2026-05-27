"use client";

import { Loader2, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { saveLead, type LeadDetails, type MinimalLead } from "@/lib/lead-client";
import type { LeadOrigin } from "@/lib/lead-schema";
import { trackEvent, type TrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { getWhatsAppHref } from "@/lib/whatsapp";

type LeadDetailsModalProps = {
  lead: MinimalLead | null;
  onClose: () => void;
  origem: Extract<LeadOrigin, "landing_page" | "hero_quick_form">;
  trackingEvent: Extract<TrackingEvent, "lead_form_submit" | "hero_quick_form_submit">;
};

const inputClass =
  "min-h-11 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";

const financingOptions = [
  { value: "", label: "Selecione uma opção" },
  { value: "emprestimo", label: "Empréstimo" },
  { value: "imovel", label: "Imóvel" },
  { value: "veiculo", label: "Veículo" },
];

function hasDetails(details: LeadDetails) {
  return Boolean(details.banco?.trim() || details.valor_parcela?.trim() || details.tipo_contrato);
}

export function LeadDetailsModal({ lead, onClose, origem, trackingEvent }: LeadDetailsModalProps) {
  const [details, setDetails] = useState<LeadDetails>({
    banco: "",
    tipo_contrato: "",
    valor_parcela: "",
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const open = Boolean(lead);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  function openWhatsApp() {
    trackEvent(trackingEvent, {
      destination: "whatsapp",
      has_banco: Boolean(details.banco?.trim()),
      has_tipo_contrato: Boolean(details.tipo_contrato),
      has_valor_parcela: Boolean(details.valor_parcela?.trim()),
    });

    window.location.href = getWhatsAppHref();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lead) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (hasDetails(details)) {
        await saveLead({
          ...lead,
          banco: details.banco,
          tipo_contrato: details.tipo_contrato,
          valor_parcela: details.valor_parcela,
          origem,
        });
      }

      openWhatsApp();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar as informações complementares agora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function skipDetails() {
    openWhatsApp();
  }

  if (!open || !lead) {
    return null;
  }

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-2xl shadow-black/30 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Fechar"
        >
          <X className="size-5" aria-hidden />
        </button>

        <div className="pr-8">
          <h2 id={titleId} className="text-xl font-bold text-zinc-950">
            Antes de abrir o WhatsApp
          </h2>
          <p id={descriptionId} className="mt-2 text-sm leading-6 text-zinc-600">
            Se puder, informe estes dados para o consultor entender melhor seu caso. Você também pode continuar sem preencher.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">
              Banco/Financeira que foi feito
            </span>
            <input
              value={details.banco}
              onChange={(event) => setDetails((current) => ({ ...current, banco: event.target.value }))}
              className={inputClass}
              placeholder="Ex: Santander, Itaú, BV..."
              autoComplete="organization"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">Valor de parcela</span>
            <input
              value={details.valor_parcela}
              onChange={(event) =>
                setDetails((current) => ({ ...current, valor_parcela: event.target.value }))
              }
              className={inputClass}
              placeholder="Ex: R$ 1.250,00"
              inputMode="decimal"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-800">Tipo de financiamento</span>
            <select
              value={details.tipo_contrato}
              onChange={(event) =>
                setDetails((current) => ({ ...current, tipo_contrato: event.target.value }))
              }
              className={cn(inputClass, "appearance-none")}
            >
              {financingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {feedback ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
              {feedback}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#e30613] bg-[#e30613] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] transition hover:bg-[#bd1018] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-wait disabled:opacity-80"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <MessageCircle className="size-4" aria-hidden />
            )}
            {isSubmitting ? "Registrando..." : "Continuar para o WhatsApp"}
          </button>

          <button
            type="button"
            onClick={skipDetails}
            className="text-sm font-semibold text-zinc-500 transition hover:text-zinc-800"
          >
            Continuar sem preencher
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
