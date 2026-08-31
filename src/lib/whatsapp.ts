export const defaultWhatsAppMessage =
  "Olá! Estou interessado em reduzir a parcela do meu financiamento. Gostaria de mais informações.";

const fallbackWhatsAppNumber = "5511963322546";

// Linhas que a GRS não usa mais. Uma conversa aberta em qualquer uma delas
// simplesmente se perde, então elas nunca podem chegar ao link — nem se
// vierem de NEXT_PUBLIC_WHATSAPP_NUMBER. Foi o que aconteceu em 31/08/2026:
// o 5511940394084 foi banido, a variável continuou apontando pra ele no
// painel da Vercel e sobrepôs a correção feita aqui.
const numerosDesativados = new Set(["5511940394084"]);

export function getWhatsAppHref(message = defaultWhatsAppMessage) {
  const numeroConfigurado = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const configuredNumber =
    numeroConfigurado && !numerosDesativados.has(numeroConfigurado)
      ? numeroConfigurado
      : fallbackWhatsAppNumber;

  return `https://wa.me/${configuredNumber}?text=${encodeURIComponent(message)}`;
}
