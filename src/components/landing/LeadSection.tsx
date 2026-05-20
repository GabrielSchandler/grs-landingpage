import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";
import { leadCards } from "@/lib/landing-content";
import { getWhatsAppHref } from "@/lib/whatsapp";

export function LeadSection() {
  const whatsAppHref = getWhatsAppHref(
    "Olá, vim pela landing page da GRS e gostaria de falar com um especialista sobre meu contrato.",
  );

  return (
    <section id="lead-form" className="relative overflow-hidden bg-zinc-950 py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_14%,rgba(227,6,19,0.14),transparent_28%),radial-gradient(circle_at_10%_80%,rgba(227,6,19,0.08),transparent_28%)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:34px_34px]"
        aria-hidden
      />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading dark title="Solicite sua análise gratuita">
              Informe seu nome e WhatsApp para a equipe iniciar o atendimento. Os detalhes do contrato ajudam, mas você
              também pode conversar direto com um especialista.
            </SectionHeading>

            <div className="mt-8 grid gap-3">
              {leadCards.map(({ icon: Icon, text, title }) => (
                <article
                  key={title}
                  className="flex items-start gap-3 rounded-lg border border-zinc-700/60 bg-zinc-900 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-950/10"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-red-950/60 text-red-400">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-emerald-500/25 bg-emerald-950/30 p-5 shadow-lg shadow-emerald-950/20">
              <h3 className="text-base font-semibold text-white">Quer atendimento mais rápido?</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/80">
                Você também pode chamar direto no WhatsApp e enviar as informações do contrato por lá.
              </p>
              <ButtonLink
                href={whatsAppHref}
                target={whatsAppHref.startsWith("http") ? "_blank" : undefined}
                rel={whatsAppHref.startsWith("http") ? "noopener noreferrer" : undefined}
                variant="secondary"
                className="mt-4 w-full border-emerald-200 bg-white text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50 sm:w-auto"
                icon={<MessageCircle size={16} aria-hidden />}
              >
                Chamar no WhatsApp
              </ButtonLink>
            </div>
          </div>

          <LeadCaptureForm />
        </div>
      </Container>
    </section>
  );
}
