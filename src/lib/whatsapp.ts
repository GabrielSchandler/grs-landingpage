export const defaultWhatsAppMessage =
  "Olá! Estou interessado em reduzir a parcela do meu financiamento. Gostaria de mais informações.";

const fallbackWhatsAppNumber = "5511940394084";

export function getWhatsAppHref(message = defaultWhatsAppMessage) {
  const configuredNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || fallbackWhatsAppNumber;

  return `https://wa.me/${configuredNumber}?text=${encodeURIComponent(message)}`;
}
