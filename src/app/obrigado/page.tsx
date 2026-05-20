import { ArrowRight, CheckCircle2, MessageCircle, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata = {
  title: "Análise Solicitada - GRS Soluções",
  description: "Sua solicitação foi recebida com sucesso. A equipe da GRS analisará seus dados.",
};

export default function ThanksPage() {
  const whatsAppHref = getWhatsAppHref("postSubmit");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/20 to-white flex flex-col">
      <Container className="flex-1 flex items-center justify-center py-16 sm:py-20">
        <div className="max-w-2xl text-center">
          {/* Success badge */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-200/40 blur-xl" aria-hidden />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="size-10" aria-hidden />
              </div>
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-4xl font-bold text-zinc-950 sm:text-5xl">
            Análise solicitada com sucesso!
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            Recebemos seus dados e iniciamos a avaliação do seu contrato. Nossa equipe de especialistas analisará as informações e entrará em contato para orientar os próximos passos.
          </p>

          {/* Next steps cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Tempo de retorno",
                description: "Resposta em até 1h (horário comercial)",
              },
              {
                icon: CheckCircle2,
                title: "Análise técnica",
                description: "Avaliação completa do contrato",
              },
              {
                icon: MessageCircle,
                title: "Atendimento humanizado",
                description: "Especialista dedicado ao seu caso",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold text-zinc-950">{title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{description}</p>
              </div>
            ))}
          </div>

          {/* What to prepare */}
          <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50/50 p-6 text-left">
            <h2 className="font-semibold text-amber-950">Prepare-se para o atendimento:</h2>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
              <li className="flex items-start gap-3">
                <span className="mt-1 size-1.5 rounded-full bg-amber-600 shrink-0" aria-hidden />
                Tenha à mão o contrato ou os dados principais do financiamento
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-1.5 rounded-full bg-amber-600 shrink-0" aria-hidden />
                Acompanhe seu WhatsApp — esse é o canal principal de contato
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-1.5 rounded-full bg-amber-600 shrink-0" aria-hidden />
                Tenha disponíveis extratos ou comprovantes de pagamento (se houver atrasos)
              </li>
            </ul>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              icon={<MessageCircle size={16} aria-hidden />}
              variant="secondary"
            >
              Falar com especialista agora
            </ButtonLink>
            <ButtonLink href="/" icon={<ArrowRight size={16} aria-hidden />}>
              Voltar à página inicial
            </ButtonLink>
          </div>

          {/* Trust statement */}
          <p className="mt-8 text-xs leading-5 text-zinc-500">
            Seus dados estão protegidos e serão tratados conforme a LGPD. Você receberá apenas comunicações relacionadas à sua análise.
          </p>
        </div>
      </Container>

      {/* Footer */}
      <div className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500">
        <p>GRS Soluções © {new Date().getFullYear()} • Análise revisional de contratos bancários</p>
      </div>
    </div>
  );
}
