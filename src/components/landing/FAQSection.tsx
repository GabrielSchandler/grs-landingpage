"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { faqs } from "@/lib/landing-content";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const whatsAppHref = getWhatsAppHref();

  return (
    <section id="faq" className="border-b border-zinc-200 bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading align="center" title="Dúvidas frequentes">
          Respondemos as perguntas mais comuns de quem está considerando fazer uma análise de contrato.
        </SectionHeading>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md shadow-zinc-950/5">
          {faqs.map((faq, index) => (
            <div key={faq.question} className={index > 0 ? "border-t border-zinc-100" : ""}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-base font-semibold text-zinc-950 transition hover:bg-zinc-50"
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-red-700 transition-transform duration-300 ${open === index ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open === index ? "400px" : "0px" }}
              >
                <p className="px-6 pb-6 text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Post-FAQ CTA — last chance before footer */}
        <div className="mx-auto mt-14 max-w-xl text-center">
          <p className="text-base font-medium text-zinc-700">
            Ainda tem dúvidas? Nossa equipe responde pelo WhatsApp antes de qualquer compromisso.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href="#lead-form"
              className="btn-pulse min-h-12 px-7"
              icon={<ArrowRight size={16} aria-hidden />}
            >
              Solicitar análise gratuita
            </ButtonLink>
            <ButtonLink
              href={whatsAppHref}
              target={whatsAppHref.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="secondary"
              className="min-h-12 px-7"
              icon={<MessageCircle size={16} aria-hidden />}
            >
              Falar no WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
