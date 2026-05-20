import { ContractTypes } from "@/components/landing/ContractTypes";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { FAQSection } from "@/components/landing/FAQSection";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LeadSection } from "@/components/landing/LeadSection";
import { PainPoints } from "@/components/landing/PainPoints";
import { SocialProof } from "@/components/landing/SocialProof";
import { TrustSection } from "@/components/landing/TrustSection";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function Home() {
  const whatsAppHref = getWhatsAppHref("floating");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <ContractTypes />
        <TrustSection />
        <SocialProof />
        <LeadSection />
        <FAQSection />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingWhatsApp href={whatsAppHref} />
    </>
  );
}
