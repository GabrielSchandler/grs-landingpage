import { AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/landing-content";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-b border-zinc-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading title="Como funciona a análise da GRS">
              Nosso processo começa pelo diagnóstico. Antes de qualquer orientação, entendemos o seu contrato e a sua
              situação atual.
            </SectionHeading>

            <div className="mt-7 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-950">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-700" aria-hidden />
              <p>Nem todo contrato possui irregularidade. Por isso, a análise técnica é indispensável.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {processSteps.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 sm:grid-cols-[3.25rem_1fr]"
              >
                <span className="grid size-12 place-items-center rounded-md border border-red-100 bg-red-50 text-sm font-bold text-red-700">
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
      </Container>
    </section>
  );
}
