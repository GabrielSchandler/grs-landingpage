import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { WhatsAppLeadButton } from "@/components/landing/WhatsAppLeadButton";
import { credibilityNumbers, heroBadges, heroCopy, heroIndicators } from "@/lib/landing-content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-950">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(227,6,19,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.03),transparent_28%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:34px_34px]"
        aria-hidden
      />
      {/* Floating orbs */}
      <div className="animate-float-soft absolute left-[6%] top-28 hidden h-20 w-20 rounded-full border border-zinc-700 bg-zinc-900/50 shadow-xl shadow-black/40 lg:block" aria-hidden />
      <div className="animate-float-soft absolute right-[8%] top-20 hidden h-28 w-28 rounded-full border border-red-900/30 bg-red-950/10 shadow-2xl shadow-black/40 lg:block [animation-delay:900ms]" aria-hidden />

      <Container className="relative z-10 grid items-center gap-10 py-10 sm:py-16 lg:min-h-[calc(82vh-5rem)] lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="max-w-3xl animate-rise-in">
          <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-red-400">
            Análise técnica de contrato
          </div>

          <h1 className="mt-6 text-[2.42rem] font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            {heroCopy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">{heroCopy.subtitle}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">{heroCopy.support}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#lead-form" className="btn-pulse min-h-14 px-7 text-base" icon={<ArrowRight size={18} aria-hidden />}>
              Solicitar análise gratuita
            </ButtonLink>
            <WhatsAppLeadButton
              variant="dark-outline"
              className="min-h-14 px-7 text-base"
              placement="hero_secondary"
            >
              Falar com especialista
            </WhatsAppLeadButton>
          </div>

          <div className="mt-8 grid gap-2 text-sm sm:grid-cols-3">
            {heroBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2.5">
                <Icon className="size-4 shrink-0 text-[#e30613]" aria-hidden />
                <span className="font-medium text-zinc-200">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-rise-in [animation-delay:120ms]">
          <div className="absolute -inset-5 rounded-lg bg-[#e30613]/20 blur-2xl" aria-hidden />
          <div className="premium-card relative overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-900 shadow-2xl shadow-black/50">
            <Image
              src="/grs-hero-vehicle-contract.png"
              alt="Contrato, calculadora e veículo desfocado em escritório moderno para análise de financiamento."
              width={1713}
              height={918}
              className="aspect-[1.42] h-full w-full object-cover opacity-90"
              priority
            />
            <div className="animate-float-soft absolute right-5 top-5 hidden items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 px-4 py-2 text-xs font-semibold text-zinc-100 shadow-lg backdrop-blur sm:flex">
              <span className="size-2 rounded-full bg-[#e30613] shadow-[0_0_0_5px_rgba(227,6,19,0.18)]" aria-hidden />
              Contrato em análise
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-md sm:left-6 sm:right-auto sm:w-[21rem]">
              <p className="text-base font-semibold text-white">{heroCopy.diagnosticTitle}</p>
              <p className="mt-1 text-sm leading-6 text-zinc-400">{heroCopy.diagnosticText}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Credibility numbers bar */}
      <Container className="pb-4 sm:pb-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 shadow-lg sm:grid-cols-4">
          {credibilityNumbers.map(({ value, label }, index) => (
            <div
              key={label}
              className="animate-count-up flex flex-col items-center justify-center gap-0.5 bg-zinc-900 px-4 py-5 text-center"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-2xl font-bold text-[#e30613] sm:text-3xl">{value}</span>
              <span className="text-xs font-medium text-zinc-500">{label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* Hero indicators */}
      <Container className="pb-8 sm:pb-12">
        <div className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {heroIndicators.map(({ icon: Icon, title }) => (
            <div key={title} className="premium-card flex items-center gap-3 rounded-md bg-zinc-800 px-4 py-3">
              <span className="grid size-10 place-items-center rounded-md bg-red-950/60 text-[#e30613]">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-zinc-200">{title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
