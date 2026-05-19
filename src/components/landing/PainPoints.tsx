import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pains } from "@/lib/landing-content";

export function PainPoints() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-8 sm:py-24">
      <Container>
        <SectionHeading title="Sua parcela está comprometendo seu orçamento?">
          Quando o financiamento fica pesado, o problema pode não estar apenas no valor da parcela, mas na forma como
          o contrato foi construído.
        </SectionHeading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg hover:shadow-red-950/8"
            >
              <span className="grid size-10 place-items-center rounded-md bg-red-50 text-red-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
