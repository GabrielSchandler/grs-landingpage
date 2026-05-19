import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";
import { leadCards } from "@/lib/landing-content";

export function LeadSection() {
  return (
    <section id="lead-form" className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading title="Solicite sua análise gratuita">
              Preencha os dados principais do seu contrato. Nossa equipe irá avaliar as informações e entrar em contato
              para orientar o próximo passo.
            </SectionHeading>

            <div className="mt-8 grid gap-3">
              {leadCards.map(({ icon: Icon, text, title }) => (
                <article key={title} className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-red-50 text-red-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <LeadCaptureForm />
        </div>
      </Container>
    </section>
  );
}
