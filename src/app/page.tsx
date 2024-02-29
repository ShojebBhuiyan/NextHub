import Faq from "@/components/landing/faq";
import FeatureSection from "@/components/landing/feature-section";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center p-24">
      <HeroSection />
      <FeatureSection />
      <Faq />
    </main>
  );
}
