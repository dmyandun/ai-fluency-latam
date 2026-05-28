import { Hero } from "@/components/landing/hero";
import { FluencySection } from "@/components/landing/fluency-section";
import { ModelsSection } from "@/components/landing/models-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FluencySection />
      <ModelsSection />
      <CtaSection />
    </>
  );
}
