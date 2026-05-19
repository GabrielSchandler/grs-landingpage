import { Quote, ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialProofStats, testimonials } from "@/lib/landing-content";

export function SocialProof() {
  return (
    <section id="depoimentos" className="relative overflow-hidden border-b border-zinc-200 bg-white py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(227,6,19,0.10),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(24,24,27,0.07),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7f7f8_100%)]"
        aria-hidden
      />
      <div className="absolute left-8 top-14 hidden h-24 w-24 rounded-full border border-red-100 bg-white/55 shadow-xl shadow-red-950/10 blur-[1px] lg:block" aria-hidden />
      <div className="absolute bottom-16 right-10 hidden h-32 w-32 rounded-full border border-zinc-200 bg-white/70 shadow-2xl shadow-zinc-950/10 blur-[1px] lg:block" aria-hidden />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700 shadow-sm">
            <Star className="size-4 fill-red-600 text-red-600" aria-hidden />
            Avaliações 5 estrelas
          </div>
          <SectionHeading align="center" title="Clientes elogiam a clareza e o atendimento da GRS">
            Pessoas procuram a GRS quando precisam entender melhor o contrato, organizar as dúvidas e receber uma
            orientação consultiva antes de qualquer decisão.
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {socialProofStats.map(({ icon: Icon, text, title }) => (
            <article
              key={title}
              className="premium-card flex items-start gap-4 rounded-lg border border-zinc-200 bg-white/90 p-5 shadow-sm shadow-zinc-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-red-50 text-red-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-zinc-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map(({ author, location, quote, rating, title }, index) => (
            <article
              key={`${author}-${location}`}
              className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5 transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl hover:shadow-red-950/12"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e30613] via-red-500 to-zinc-950 opacity-80" aria-hidden />
              <Quote className="absolute right-4 top-5 size-9 text-zinc-100 transition group-hover:text-red-50" aria-hidden />

              <div className="flex items-center gap-1" aria-label={`${rating} estrelas`}>
                {Array.from({ length: rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-[#e30613] text-[#e30613]" aria-hidden />
                ))}
              </div>

              <h3 className="mt-4 text-base font-semibold text-zinc-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">“{quote}”</p>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">{author}</p>
                  <p className="text-xs text-zinc-500">{location}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  Atendimento GRS
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
