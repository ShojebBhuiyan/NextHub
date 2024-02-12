import FeatureSection from "@/components/landing/feature-section";
import HeroSection from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
      <FeatureSection />
    </main>
  );
}
