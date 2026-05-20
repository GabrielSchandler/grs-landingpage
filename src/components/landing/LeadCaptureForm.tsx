"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  contractTypeOptions,
  leadSchema,
  type LeadFormInput,
  type LeadFormValues,
} from "@/lib/lead-schema";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-11 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";

export function LeadCaptureForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const whatsAppHref = getWhatsAppHref(
    "Olá, vim pela landing page da GRS e prefiro falar direto pelo WhatsApp sobre meu contrato.",
  );

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
      tipo_contrato: "",
      valor_parcela: "",
      parcelas_atrasadas: "",
      banco: "",
      mensagem: "",
    },
  });

  const [nome = "", whatsapp = ""] = useWatch({
    control,
    name: ["nome", "whatsapp"],
  });

  const essentialFieldsFilled = nome.trim().length >= 2 && whatsapp.trim().length >= 10;

  function handleWhatsAppClick() {
    trackEvent("whatsapp_click", {
      placement: "lead_form_direct_button",
    });
  }

  async function onSubmit(values: LeadFormValues) {
    setFeedback(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "Não foi possível enviar agora. Tente novamente em instantes.");
      }

      trackEvent("lead_form_submit", {
        tipo_contrato: values.tipo_contrato,
        valor_parcela: values.valor_parcela,
      });

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        window.location.href = "/obrigado";
      }, 1500);
    } catch (error) {
      trackEvent("lead_form_error", {
        error: error instanceof Error ? error.message : "unknown",
      });

      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar agora. Tente novamente em instantes ou chame pelo WhatsApp.",
      });
    }
  }

  if (isSuccess) {
    return (
      <div className="premium-card rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 text-center shadow-2xl shadow-emerald-950/10 sm:p-8">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <Check className="size-8 text-emerald-600" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-zinc-950">Análise solicitada com sucesso!</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Você será redirecionado para a próxima página. Prepare os documentos do seu contrato para o atendimento.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="premium-card relative overflow-hidden rounded-lg border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-2xl shadow-zinc-950/12 sm:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,6,19,0.05),transparent_50%)] pointer-events-none" aria-hidden />
      <div className="relative z-10">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
            Análises abertas agora — gratuito e sem compromisso
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-950">
            Descubra se seu banco está cobrando mais do que pode
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Informe seu nome e WhatsApp para a equipe iniciar o contato. Se quiser, adicione detalhes do contrato para agilizar a análise.
          </p>
        </div>

        <a
          href={whatsAppHref}
          onClick={handleWhatsAppClick}
          target={whatsAppHref.startsWith("http") ? "_blank" : undefined}
          rel={whatsAppHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mb-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        >
          <MessageCircle className="size-4" aria-hidden />
          Prefiro falar direto pelo WhatsApp
        </a>

        {/* Badges */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
            <span className="size-2 rounded-full bg-red-600" aria-hidden />
            100% Gratuito
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="size-2 rounded-full bg-blue-600" aria-hidden />
            Sem compromisso
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <span className="size-2 rounded-full bg-amber-600" aria-hidden />
            Retorno em até 1h
          </span>
        </div>

        {/* All fields visible */}
        <div className="grid gap-4">
          <Field label="Seu nome" error={errors.nome?.message}>
            <input
              {...register("nome")}
              className={inputClass}
              placeholder="João"
              autoComplete="name"
              autoFocus
            />
          </Field>

          <Field label="WhatsApp com DDD" error={errors.whatsapp?.message}>
            <input
              {...register("whatsapp")}
              className={inputClass}
              placeholder="(11) 98765-4321"
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tipo de contrato (opcional)" error={errors.tipo_contrato?.message}>
              <select {...register("tipo_contrato")} className={cn(inputClass, "appearance-none")}>
                <option value="">Selecione o tipo</option>
                {contractTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Valor da parcela (opcional)" error={errors.valor_parcela?.message}>
              <input
                {...register("valor_parcela")}
                className={inputClass}
                placeholder="R$ 1.250,00"
                inputMode="decimal"
              />
            </Field>
          </div>

          <Field label="Está com parcelas atrasadas? (opcional)" error={errors.parcelas_atrasadas?.message}>
            <div className="flex gap-3">
              {[
                { value: "nao", label: "Não" },
                { value: "sim", label: "Sim" },
              ].map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    {...register("parcelas_atrasadas")}
                    value={option.value}
                    className="size-4 cursor-pointer accent-red-600"
                  />
                  <span className="text-sm font-medium text-zinc-700">{option.label}</span>
                </label>
              ))}
            </div>
          </Field>

          {/* Optional fields — always visible, clearly labeled */}
          <div className="space-y-4 rounded-lg border border-zinc-100 bg-zinc-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Informações adicionais (opcional)</p>

            <Field label="Banco ou financeira" error={errors.banco?.message}>
              <input
                {...register("banco")}
                className={inputClass}
                placeholder="Itaú, Caixa, Bradesco..."
              />
            </Field>

            <Field label="Conte brevemente seu caso" error={errors.mensagem?.message}>
              <textarea
                {...register("mensagem")}
                className={cn(inputClass, "min-h-20 resize-y")}
                placeholder="Ex: Financiei um carro por 60 meses e acho que estou pagando muita taxa."
              />
            </Field>
          </div>
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
          disabled={isSubmitting || !essentialFieldsFilled}
          className={cn(
            "mt-6 w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-md border font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
            essentialFieldsFilled
              ? "border-[#e30613] bg-[#e30613] btn-pulse hover:bg-[#bd1018] focus:ring-red-500 cursor-pointer"
              : "border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed",
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Enviando seus dados...
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              Quero minha análise gratuita
            </>
          )}
        </button>

        <div className="mt-5 flex items-start gap-2 rounded-lg bg-zinc-50 px-3.5 py-3 text-xs leading-5 text-zinc-600">
          <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">✓</div>
          <span>
            Seus dados são tratados com segurança conforme a <span className="font-semibold text-zinc-900">LGPD</span>. Você receberá orientação consultiva em até 1h.
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
