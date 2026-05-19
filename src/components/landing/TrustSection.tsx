import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { authorityBullets } from "@/lib/landing-content";

export function TrustSection() {
  return (
    <section className="border-b border-zinc-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          <SectionHeading title="Revisão de juros não é promessa. É análise técnica.">
            <span>
              A revisão de juros é um procedimento técnico que avalia se as cobranças do contrato estão coerentes com o
              que foi contratado, com o Código de Defesa do Consumidor e com parâmetros de mercado.
            </span>
            <span className="mt-4 block">
              Nosso papel é trazer clareza para o cliente, identificar possíveis pontos questionáveis e orientar o
              próximo passo com responsabilidade.
            </span>
          </SectionHeading>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 shadow-sm shadow-zinc-950/5 sm:p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
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
