const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511991632556";

export const whatsAppMessages = {
  default: "Olá! Vim pelo site da GRS e gostaria de solicitar a análise gratuita do meu contrato bancário.",
  hero: "Olá! Vim pelo site da GRS e gostaria de falar com um especialista sobre meu contrato bancário.",
  ctaBanner: "Olá! Vim pelo site da GRS e quero solicitar a análise gratuita do meu contrato.",
  floating: "Olá! Vim pelo site da GRS e quero entender melhor sobre a análise gratuita de contrato.",
  postSubmit: "Olá! Acabei de solicitar a análise pela landing page e gostaria de acompanhar.",
  footer: "Olá! Vim pelo site da GRS e gostaria de mais informações sobre a análise de contrato.",
} as const;

export type WhatsAppContext = keyof typeof whatsAppMessages;

export function getWhatsAppHref(contextOrMessage?: WhatsAppContext | string): string {
  const configuredNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!configuredNumber) {
    return "#lead-form";
  }

  const message =
    contextOrMessage && contextOrMessage in whatsAppMessages
      ? whatsAppMessages[contextOrMessage as WhatsAppContext]
      : contextOrMessage || whatsAppMessages.default;

  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${configuredNumber}&text=${encoded}&type=phone_number&app_absent=0`;
}
