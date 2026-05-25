import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { authorityBullets, authorityCards } from "@/lib/landing-content";

export function TrustSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(227,6,19,0.08),transparent_28%),linear-gradient(180deg,#fff_0%,#fafafa_100%)]" aria-hidden />
      <Container>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
          <SectionHeading title="Análise técnica de contrato: o que é, e o que não é">
            <span>
              Nossa análise é um diagnóstico técnico e educacional do seu contrato. Avaliamos taxas, encargos, tarifas e
              condições para que você entenda exatamente o que foi acordado e o que está sendo cobrado.
            </span>
            <span className="mt-4 block">
              Não somos escritório de advocacia e não prometemos resultado. Qualquer decisão jurídica futura depende da
              avaliação de um advogado habilitado contratado pelo próprio cliente.
            </span>
          </SectionHeading>

          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {authorityCards.map(({ icon: Icon, text, title }) => (
                <article
                  key={title}
                  className="premium-card rounded-lg border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-950/5 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/10"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-red-50 text-red-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-zinc-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
                </article>
              ))}
            </div>

            <ul className="grid gap-3 rounded-lg border border-zinc-200 bg-white/90 p-5 shadow-lg shadow-zinc-950/6 backdrop-blur sm:grid-cols-2">
              {authorityBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-zinc-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-red-700" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
