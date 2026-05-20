"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, MessageCircle, X } from "lucide-react";
import { defaultWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type WhatsAppLeadButtonVariant =
  | "primary"
  | "secondary"
  | "dark-outline"
  | "light"
  | "green"
  | "inline";

type WhatsAppLeadButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: WhatsAppLeadButtonVariant;
  message?: string;
  placement?: string;
  showIcon?: boolean;
};

const baseButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white";

const variants: Record<WhatsAppLeadButtonVariant, string> = {
  primary:
    "border-[#e30613] bg-[#e30613] text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] hover:border-[#bd1018] hover:bg-[#bd1018]",
  secondary:
    "border-zinc-200 bg-white text-zinc-950 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700",
  "dark-outline":
    "border-white/25 bg-white/8 text-white hover:border-white/50 hover:bg-white/15",
  light:
    "border-white bg-white text-[#e30613] shadow-2xl shadow-black/20 hover:border-red-50 hover:bg-red-50",
  green:
    "border-[#25D366] bg-[#25D366] text-white shadow-2xl shadow-emerald-950/40 hover:bg-[#20BD5C]",
  inline:
    "min-h-0 rounded-none border-transparent bg-transparent p-0 text-zinc-500 hover:text-red-400 focus:ring-offset-zinc-950",
};

function phoneDigitCount(value: string) {
  return (value.match(/\d/g) ?? []).length;
}

export function WhatsAppLeadButton({
  children,
  className,
  message = defaultWhatsAppMessage,
  placement = "whatsapp_cta",
  showIcon = true,
  variant = "secondary",
}: WhatsAppLeadButtonProps) {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const canSubmit = nome.trim().length >= 2 && phoneDigitCount(whatsapp) >= 10;

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openModal() {
    setFeedback(null);
    setOpen(true);
    trackEvent("whatsapp_click", { placement });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setFeedback("Informe seu nome e um WhatsApp com DDD para continuar.");
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          whatsapp,
          origem: "whatsapp_popup",
        }),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "Não foi possível registrar seu contato agora.");
      }

      trackEvent("whatsapp_lead_submit", { placement });
      window.location.href = getWhatsAppHref(message);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar seu contato agora. Tente novamente em instantes.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const modal = open ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-2xl shadow-black/30 sm:p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Fechar"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="pr-8">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <MessageCircle className="size-5" aria-hidden />
              </div>
              <h2 id={titleId} className="text-xl font-bold text-zinc-950">
                Antes de abrir o WhatsApp
              </h2>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-zinc-600">
                Informe nome e telefone para a GRS registrar seu contato. Depois você será levado direto para o WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">Seu nome</span>
                <input
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="min-h-11 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  placeholder="João"
                  autoComplete="name"
                  autoFocus
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-zinc-800">WhatsApp com DDD</span>
                <input
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  className="min-h-11 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  placeholder="(11) 94039-4084"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              {feedback ? (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
                  {feedback}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting || !canSubmit}
                className={cn(
                  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white",
                  canSubmit
                    ? "border-[#e30613] bg-[#e30613] text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] hover:bg-[#bd1018]"
                    : "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400",
                )}
              >
                {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <MessageCircle className="size-4" aria-hidden />}
                {isSubmitting ? "Registrando contato..." : "Continuar para o WhatsApp"}
              </button>

              <p className="text-xs leading-5 text-zinc-500">
                Seus dados serão registrados para atendimento e tratados conforme a LGPD.
              </p>
            </form>
          </div>
        </div>
      ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={cn(baseButtonClass, variants[variant], className)}
      >
        {children}
        {showIcon ? <MessageCircle size={16} aria-hidden /> : null}
      </button>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
