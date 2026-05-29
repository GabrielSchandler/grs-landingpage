import { ArrowRight, BadgeCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { analysisDeliverables, companyAuthorityStats } from "@/lib/landing-content";

export function AnalysisDeliverables() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-14 sm:py-20">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(227,6,19,0.08),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]"
        aria-hidden
      />
      <Container>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
              <BadgeCheck className="size-4" aria-hidden />
              O que você recebe
            </div>

            <SectionHeading className="mt-5" title="Uma análise gratuita com pontos claros do seu contrato">
              Não é apenas uma conversa genérica. A GRS verifica os principais elementos que podem influenciar o custo
              do seu financiamento e explica tudo de forma simples para você decidir com mais segurança.
            </SectionHeading>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {companyAuthorityStats.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-4 shadow-sm shadow-zinc-950/5"
                >
                  <p className="text-xl font-semibold text-zinc-950">{value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>

            <ButtonLink
              href="#lead-form"
              className="btn-pulse mt-7 w-full justify-center min-h-13 text-base sm:w-auto"
              icon={<ArrowRight size={18} aria-hidden />}
            >
              Quero receber minha análise
            </ButtonLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {analysisDeliverables.map(({ icon: Icon, text, title }, index) => (
              <article
                key={title}
                className={[
                  "premium-card rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 transition duration-300 hover:border-red-200",
                  index === analysisDeliverables.length - 1 ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md border border-red-100 bg-red-50 text-red-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
