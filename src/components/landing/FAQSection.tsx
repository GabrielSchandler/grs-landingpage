import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/landing-content";

export function FAQSection() {
  return (
    <section id="faq" className="border-b border-zinc-200 bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading align="center" title="Dúvidas frequentes" />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 open:bg-zinc-50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-semibold text-zinc-950">
                {faq.question}
                <ChevronDown className="size-5 shrink-0 text-red-700 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
