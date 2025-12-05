import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";

export default function Services() {
  return (
    <main>
      <div className="relative bg-gradient-to-r from-[hsl(216,72%,14%)] to-[hsl(216,72%,20%)] py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
          <h1 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl" data-testid="text-services-page-heading">
            Our Services
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Comprehensive cybersecurity auditing solutions tailored to your compliance needs
          </p>
        </div>
      </div>
      <ServicesGrid />
      <CTASection />
    </main>
  );
}
