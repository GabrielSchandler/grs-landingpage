import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contracts } from "@/lib/landing-content";

export function ContractTypes() {
  return (
    <section id="contratos" className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-24">
      <Container>
        <SectionHeading align="center" title="Quais contratos podemos analisar?">
          Cada modalidade exige uma leitura própria. A GRS avalia o contrato, o histórico de pagamento e o contexto da
          dívida.
        </SectionHeading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {contracts.map(({ title, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-zinc-200 bg-white p-5 text-center shadow-sm shadow-zinc-950/5"
            >
              <span className="mx-auto grid size-12 place-items-center rounded-md border border-red-100 bg-red-50 text-red-700">
                <Icon size={21} aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold leading-6 text-zinc-950">{title}</h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
