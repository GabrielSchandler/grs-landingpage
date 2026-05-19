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

export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .refine((value) => value.includes(" "), {
      message: "Informe nome e sobrenome.",
    }),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Informe seu WhatsApp.")
    .refine((value) => phoneDigitCount(value) >= 10, {
      message: "Informe um WhatsApp válido com DDD.",
    }),
  tipo_contrato: z.string().refine(
    (value) => contractTypeValues.includes(value as (typeof contractTypeValues)[number]),
    "Selecione o tipo de contrato.",
  ),
  valor_parcela: z
    .string()
    .trim()
    .min(1, "Informe o valor aproximado da parcela.")
    .refine((value) => {
      const parsed = parseCurrencyToNumber(value);
      return Number.isFinite(parsed) && parsed > 0;
    }, "Informe um valor de parcela válido."),
  parcelas_atrasadas: z
    .string()
    .refine((value) => value === "sim" || value === "nao", "Informe se há parcelas atrasadas."),
  banco: z.string().trim().optional(),
  mensagem: z.string().trim().max(1000, "Use até 1000 caracteres.").optional(),
});

export type LeadFormInput = z.input<typeof leadSchema>;
export type LeadFormValues = z.output<typeof leadSchema>;

export function toLeadPayload(values: LeadFormValues) {
  return {
    nome: values.nome.trim(),
    whatsapp: values.whatsapp.trim(),
    tipo_contrato: values.tipo_contrato,
    valor_parcela: parseCurrencyToNumber(values.valor_parcela),
    parcelas_atrasadas: values.parcelas_atrasadas === "sim",
    banco: values.banco?.trim() || null,
    mensagem: values.mensagem?.trim() || null,
    origem: "landing_page",
  };
}
