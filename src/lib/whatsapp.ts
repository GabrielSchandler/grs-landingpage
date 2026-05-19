export const defaultWhatsAppMessage =
  "Olá, gostaria de solicitar uma análise do meu contrato com a GRS Soluções.";

export function getWhatsAppHref(message = defaultWhatsAppMessage) {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!configuredNumber) {
    return "#lead-form";
  }

  return `https://wa.me/${configuredNumber}?text=${encodeURIComponent(message)}`;
}
