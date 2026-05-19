import { ContractTypes } from "@/components/landing/ContractTypes";
import { FAQSection } from "@/components/landing/FAQSection";
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
        <PainPoints />
        <HowItWorks />
        <ContractTypes />
        <TrustSection />
        <SocialProof />
        <LeadSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
