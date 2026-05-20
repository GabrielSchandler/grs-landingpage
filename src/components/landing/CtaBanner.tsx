import { ArrowRight, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getWhatsAppHref } from "@/lib/whatsapp";

export function CtaBanner() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <section className="relative overflow-hidden bg-[#e30613] py-16 sm:py-20">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-red-800/40 blur-3xl" aria-hidden />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-red-900/40 blur-3xl" aria-hidden />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Não deixe o banco lucrar às suas custas
          </h2>
          <p className="mt-4 text-lg leading-8 text-red-100">
            Uma análise técnica gratuita pode mostrar exatamente o que está pesando no seu contrato.
            Leva menos de 2 minutos para solicitar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href="#lead-form"
              variant="light"
              className="min-h-14 px-8 text-base"
              icon={<ArrowRight size={18} aria-hidden />}
            >
              Solicitar análise gratuita
            </ButtonLink>
            <ButtonLink
              href={whatsAppHref}
              target={whatsAppHref.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="dark-outline"
              className="min-h-14 px-8 text-base"
              icon={<MessageCircle size={18} aria-hidden />}
            >
              Falar no WhatsApp
            </ButtonLink>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-red-100">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden />
              100% gratuito
            </span>
            <span className="hidden size-1 rounded-full bg-red-300 sm:block" aria-hidden />
            <span className="flex items-center gap-2">
              <Clock className="size-4" aria-hidden />
              Retorno em até 1h (horário comercial)
            </span>
            <span className="hidden size-1 rounded-full bg-red-300 sm:block" aria-hidden />
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" aria-hidden />
              Sem compromisso de contratação
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
