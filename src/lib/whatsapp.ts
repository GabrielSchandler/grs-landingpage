export const defaultWhatsAppMessage =
  "Olá, como vai? Gostaria de fazer uma análise gratuita do meu contrato para verificar minha parcela, juros e possíveis cobranças questionáveis.";

const fallbackWhatsAppNumber = "5511940394084";

export function getWhatsAppHref(message = defaultWhatsAppMessage) {
  const configuredNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || fallbackWhatsAppNumber;

  return `https://wa.me/${configuredNumber}?text=${encodeURIComponent(message)}`;
}
