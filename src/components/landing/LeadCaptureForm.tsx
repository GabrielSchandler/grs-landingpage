"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  contractTypeOptions,
  leadSchema,
  toLeadPayload,
  type LeadFormInput,
  type LeadFormValues,
} from "@/lib/lead-schema";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const inputClass =
  "min-h-11 w-full rounded-md border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-red-400 focus:ring-4 focus:ring-red-100";

export function LeadCaptureForm() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadSchema),
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

  async function onSubmit(values: LeadFormValues) {
    setFeedback(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("leads_landing_page").insert(toLeadPayload(values));

      if (error) {
        throw error;
      }

      setFeedback({
        type: "success",
        message: "Recebemos seus dados. A equipe da GRS vai avaliar as informações e orientar os próximos passos.",
      });
      reset();

      const whatsAppHref = getWhatsAppHref(
        `Olá, sou ${values.nome}. Solicitei uma análise pela landing page e gostaria de falar com um especialista.`,
      );

      if (whatsAppHref.startsWith("http")) {
        window.open(whatsAppHref, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar agora. Tente novamente em instantes ou chame pelo WhatsApp.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-zinc-200 bg-white p-5 shadow-2xl shadow-zinc-950/10 sm:p-6"
    >
      <div className="grid gap-4">
        <Field label="Nome completo" error={errors.nome?.message}>
          <input {...register("nome")} className={inputClass} placeholder="Seu nome e sobrenome" autoComplete="name" />
        </Field>

        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          <input
            {...register("whatsapp")}
            className={inputClass}
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo de contrato" error={errors.tipo_contrato?.message}>
            <select {...register("tipo_contrato")} className={cn(inputClass, "appearance-none")}>
              <option value="">Selecione</option>
              {contractTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Valor aproximado da parcela" error={errors.valor_parcela?.message}>
            <input {...register("valor_parcela")} className={inputClass} placeholder="Ex.: R$ 1.250,00" inputMode="decimal" />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Está com parcelas atrasadas?" error={errors.parcelas_atrasadas?.message}>
            <select {...register("parcelas_atrasadas")} className={cn(inputClass, "appearance-none")}>
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </Field>

          <Field label="Banco ou financeira" error={errors.banco?.message}>
            <input {...register("banco")} className={inputClass} placeholder="Nome do banco, se souber" />
          </Field>
        </div>

        <Field label="Mensagem opcional" error={errors.mensagem?.message}>
          <textarea
            {...register("mensagem")}
            className={cn(inputClass, "min-h-28 resize-y")}
            placeholder="Conte brevemente o que está acontecendo com seu contrato."
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
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-[#e30613] bg-[#e30613] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] transition hover:bg-[#bd1018] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {isSubmitting ? "Enviando..." : "Quero analisar meu contrato"}
      </button>

      <p className="mt-4 text-xs leading-5 text-zinc-500">
        Ao enviar, você autoriza o contato da GRS para análise do caso. Seus dados serão tratados conforme a LGPD.
      </p>
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
