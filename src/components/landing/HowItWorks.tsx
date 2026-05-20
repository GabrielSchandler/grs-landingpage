import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/landing-content";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-b border-zinc-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading title="Como funciona a análise da GRS">
              Nosso processo começa pelo diagnóstico. Antes de qualquer orientação, entendemos o seu contrato e a sua
              situação atual.
            </SectionHeading>

            <div className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">Do envio ao retorno:</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Em menos de 2 minutos você preenche os dados. Nossa equipe analisa e retorna em até 1 hora com uma
                orientação clara sobre o que foi identificado.
              </p>
            </div>

            <div className="mt-6">
              <ButtonLink
                href="#lead-form"
                className="btn-pulse w-full justify-center min-h-13 text-base sm:w-auto"
                icon={<ArrowRight size={18} aria-hidden />}
              >
                Iniciar minha análise gratuita
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            {/* Vertical connector line on desktop */}
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-0.5 rounded-full bg-gradient-to-b from-[#e30613] via-red-300 to-transparent opacity-40 sm:block" aria-hidden />

            <div className="grid gap-4">
              {processSteps.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className="relative grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 transition hover:border-red-100 hover:shadow-md sm:grid-cols-[3.25rem_1fr]"
                >
                  <span className="relative z-10 grid size-12 place-items-center rounded-md border border-red-100 bg-white text-sm font-bold text-red-700 shadow-sm shadow-red-950/8">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-red-700" aria-hidden />
                      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
