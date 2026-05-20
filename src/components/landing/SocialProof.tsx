import { Quote, ShieldCheck, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialProofStats, testimonials } from "@/lib/landing-content";

const avatarColors = [
  "bg-red-800",
  "bg-zinc-700",
  "bg-red-900",
  "bg-zinc-600",
  "bg-red-950",
  "bg-zinc-800",
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts.at(-1)![0]!).toUpperCase();
}

export function SocialProof() {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-zinc-950 py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(227,6,19,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(255,255,255,0.02),transparent_28%)]"
        aria-hidden
      />
      <div className="absolute left-8 top-14 hidden h-24 w-24 rounded-full border border-zinc-700 bg-zinc-900/50 shadow-xl blur-[1px] lg:block" aria-hidden />
      <div className="absolute bottom-16 right-10 hidden h-32 w-32 rounded-full border border-red-900/20 bg-red-950/10 shadow-2xl blur-[1px] lg:block" aria-hidden />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-400 shadow-sm">
            <Star className="size-4 fill-red-500 text-red-500" aria-hidden />
            Depoimentos reais de clientes
          </div>
          <SectionHeading dark align="center" title="Quem já analisou o contrato com a GRS recomenda">
            Pessoas em situações reais — parcelas atrasadas, dívidas que não diminuem, contratos confusos — encontraram
            na GRS a clareza e a orientação que precisavam antes de tomar qualquer decisão.
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {socialProofStats.map(({ icon: Icon, text, title }) => (
            <article
              key={title}
              className="flex items-start gap-4 rounded-lg border border-zinc-700/60 bg-zinc-900 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-red-950/60 text-red-400">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map(({ author, location, quote, rating, title }, index) => (
            <article
              key={`${author}-${location}`}
              className="group relative overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-900 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-950/20"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#e30613] via-red-500 to-zinc-700 opacity-80" aria-hidden />
              <Quote className="absolute right-4 top-5 size-9 text-zinc-700 transition group-hover:text-zinc-600" aria-hidden />

              <div className="flex items-center gap-1" aria-label={`${rating} estrelas`}>
                {Array.from({ length: rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-[#e30613] text-[#e30613]" aria-hidden />
                ))}
              </div>

              <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">"{quote}"</p>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${avatarColors[index % avatarColors.length]}`}
                    aria-hidden
                  >
                    {getInitials(author)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{author}</p>
                    <p className="text-xs text-zinc-500">{location}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-red-900/40 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-400">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  GRS
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
