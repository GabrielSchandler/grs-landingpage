import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pains } from "@/lib/landing-content";

export function PainPoints() {
  return (
    <section className="border-b border-zinc-800 bg-zinc-900 py-16 sm:py-24">
      <Container>
        <SectionHeading dark title="Reconhece alguma dessas situações?">
          Quando o financiamento fica pesado, o problema quase sempre não está apenas no valor da parcela — está
          na forma como o contrato foi estruturado desde o início.
        </SectionHeading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-zinc-700/60 bg-zinc-800/50 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-red-500/30 hover:bg-zinc-800 hover:shadow-lg hover:shadow-red-950/10"
            >
              <span className="grid size-10 place-items-center rounded-md bg-red-950/60 text-red-400">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>

        {/* CTA imediato após identificação com a dor */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-center text-sm font-medium text-zinc-400">
            Se você reconheceu qualquer uma dessas situações, sua análise pode revelar muito.
          </p>
          <ButtonLink
            href="#lead-form"
            className="btn-pulse min-h-13 px-8 text-base"
            icon={<ArrowRight size={18} aria-hidden />}
          >
            Quero verificar meu contrato agora
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
