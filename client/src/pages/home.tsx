import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import StatsSection from "@/components/StatsSection";
import ServicesGrid from "@/components/ServicesGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureCards />
      <StatsSection />
      <ServicesGrid />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
