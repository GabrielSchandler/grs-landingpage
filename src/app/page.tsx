import { AnalysisDeliverables } from "@/components/landing/AnalysisDeliverables";
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AnalysisDeliverables />
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
      <FloatingWhatsApp />
    </>
  );
}
