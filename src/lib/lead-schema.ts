import { z } from "zod";

export const contractTypeOptions = [
  { value: "veiculo", label: "Financiamento de veículos" },
  { value: "imovel", label: "Financiamento imobiliário" },
  { value: "emprestimo", label: "Empréstimo pessoal" },
  { value: "consignado", label: "Consignado" },
  { value: "outro", label: "Outro" },
] as const;

const contractTypeValues = contractTypeOptions.map((option) => option.value);

function phoneDigitCount(value: string) {
  return (value.match(/\d/g) ?? []).length;
}

export function parseCurrencyToNumber(value: string) {
  const normalized = value.replace(/[^\d,.]/g, "").trim();

  if (!normalized) {
    return Number.NaN;
  }

  if (normalized.includes(",")) {
    return Number(normalized.replace(/\./g, "").replace(",", "."));
  }

  const dotParts = normalized.split(".");

  if (dotParts.length === 2 && dotParts[1]?.length === 3) {
    return Number(dotParts.join(""));
  }

  if (dotParts.length > 2) {
    const decimal = dotParts.at(-1);
    return Number(`${dotParts.slice(0, -1).join("")}.${decimal}`);
  }

  return Number(normalized);
}

const nameSchema = z
  .string()
  .trim()
  .min(2, "Informe seu nome.");

const whatsappSchema = z
  .string()
  .trim()
  .min(1, "Informe seu WhatsApp.")
  .refine((value) => phoneDigitCount(value) >= 10, {
    message: "Informe um WhatsApp válido com DDD.",
  });

const optionalContractTypeSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || contractTypeValues.includes(value as (typeof contractTypeValues)[number]),
    "Selecione um tipo de contrato válido.",
  )
  .optional()
  .default("");

const optionalCurrencySchema = z
  .string()
  .trim()
  .refine((value) => {
    if (!value) {
      return true;
    }

    const parsed = parseCurrencyToNumber(value);
    return Number.isFinite(parsed) && parsed > 0;
  }, "Informe um valor de parcela válido.")
  .optional()
  .default("");

const optionalOverdueSchema = z
  .string()
  .refine((value) => value === "" || value === "sim" || value === "nao", "Informe uma opção válida.")
  .optional()
  .default("");

export const leadSchema = z.object({
  nome: nameSchema,
  whatsapp: whatsappSchema,
  tipo_contrato: optionalContractTypeSchema,
  valor_parcela: optionalCurrencySchema,
  parcelas_atrasadas: optionalOverdueSchema,
  banco: z.string().trim().optional(),
  mensagem: z.string().trim().max(1000, "Use até 1000 caracteres.").optional(),
});

export const leadDraftSchema = z.object({
  nome: z.string().trim().optional().default(""),
  whatsapp: whatsappSchema,
  tipo_contrato: optionalContractTypeSchema,
  valor_parcela: optionalCurrencySchema,
  parcelas_atrasadas: optionalOverdueSchema,
  banco: z.string().trim().optional(),
  mensagem: z.string().trim().max(1000, "Use até 1000 caracteres.").optional(),
});

export type LeadFormInput = z.input<typeof leadSchema>;
export type LeadFormValues = z.output<typeof leadSchema>;
export type LeadDraftValues = z.output<typeof leadDraftSchema>;
export type LeadOrigin =
  | "landing_page"
  | "hero_quick_form"
  | "hero_quick_autosave"
  | "whatsapp_popup"
  | "form_autosave"
  | "whatsapp_popup_autosave";

export function toLeadPayload(values: LeadFormValues, origem: LeadOrigin = "landing_page") {
  return {
    nome: values.nome.trim(),
    whatsapp: values.whatsapp.trim(),
    tipo_contrato: values.tipo_contrato || null,
    valor_parcela: values.valor_parcela ? parseCurrencyToNumber(values.valor_parcela) : null,
    parcelas_atrasadas:
      values.parcelas_atrasadas === "" ? null : values.parcelas_atrasadas === "sim",
    banco: values.banco?.trim() || null,
    mensagem: values.mensagem?.trim() || null,
    origem,
  };
}

export function toLeadDraftPayload(values: LeadDraftValues, origem: LeadOrigin = "form_autosave") {
  return {
    nome: values.nome?.trim() || null,
    whatsapp: values.whatsapp.trim(),
    tipo_contrato: values.tipo_contrato || null,
    valor_parcela: values.valor_parcela ? parseCurrencyToNumber(values.valor_parcela) : null,
    parcelas_atrasadas:
      values.parcelas_atrasadas === "" ? null : values.parcelas_atrasadas === "sim",
    banco: values.banco?.trim() || null,
    mensagem: values.mensagem?.trim() || null,
    origem,
  };
}
