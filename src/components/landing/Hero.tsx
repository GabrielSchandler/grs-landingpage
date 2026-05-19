import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { heroBadges, heroCopy, heroIndicators } from "@/lib/landing-content";

export function Hero() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(227,6,19,0.10),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(24,24,27,0.06),transparent_28%),linear-gradient(180deg,#fff_0%,#f7f7f8_100%)]" />
      <Container className="relative z-10 grid items-center gap-10 py-10 sm:py-16 lg:min-h-[calc(82vh-5rem)] lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="max-w-3xl animate-rise-in">
          <h1 className="text-[2.42rem] font-semibold leading-[1.02] text-zinc-950 sm:text-5xl lg:text-6xl">
            {heroCopy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700">{heroCopy.subtitle}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">{heroCopy.support}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#lead-form" className="min-h-12 px-5" icon={<ArrowRight size={17} aria-hidden />}>
              Solicitar análise gratuita
            </ButtonLink>
            <ButtonLink
              href={whatsAppHref}
              icon={<MessageCircle size={17} aria-hidden />}
              rel="noopener noreferrer"
              target={whatsAppHref.startsWith("http") ? "_blank" : undefined}
              variant="secondary"
              className="min-h-12 px-5"
            >
              Falar com especialista
            </ButtonLink>
          </div>

          <div className="mt-6 grid gap-2 text-sm text-zinc-700 sm:grid-cols-3">
            {heroBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-md border border-red-100 bg-white/80 px-3 py-2 shadow-sm">
                <Icon className="size-4 shrink-0 text-[#e30613]" aria-hidden />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-rise-in [animation-delay:120ms]">
          <div className="absolute -inset-5 rounded-lg bg-[#e30613]/12 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/12">
            <Image
              src="/grs-hero-vehicle-contract.png"
              alt="Contrato, calculadora e veículo desfocado em escritório moderno para análise de financiamento."
              width={1713}
              height={918}
              className="aspect-[1.42] h-full w-full object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/70 bg-white/90 p-4 shadow-xl shadow-zinc-950/12 backdrop-blur-md sm:left-6 sm:right-auto sm:w-[21rem]">
              <p className="text-base font-semibold text-zinc-950">{heroCopy.diagnosticTitle}</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">{heroCopy.diagnosticText}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-8 sm:pb-12">
        <div className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg shadow-zinc-950/6 sm:grid-cols-2 lg:grid-cols-4">
          {heroIndicators.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3 rounded-md bg-zinc-50 px-4 py-3">
              <span className="grid size-10 place-items-center rounded-md bg-red-50 text-[#e30613]">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-zinc-900">{title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
