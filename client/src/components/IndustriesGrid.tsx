import IndustryCard from "./IndustryCard";
import { Rocket, Heart, Building2, Briefcase } from "lucide-react";

const industries = [
  {
    icon: Rocket,
    title: "Startups & SaaS",
    description:
      "Fast-track your compliance journey. We help high-growth companies build security foundations that scale with their ambitions.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description:
      "Protect patient data and maintain HIPAA compliance. Our healthcare experts understand the unique challenges of medical data security.",
  },
  {
    icon: Building2,
    title: "Government Contractors",
    description:
      "Meet federal compliance requirements including CMMC and FedRAMP. We help you win and maintain government contracts.",
  },
  {
    icon: Briefcase,
    title: "Small Businesses",
    description:
      "Enterprise-grade security within your budget. We provide scalable solutions that protect your business without breaking the bank.",
  },
];

export default function IndustriesGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl" data-testid="text-industries-heading">
            Industries We Serve
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Specialized expertise across diverse sectors
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.title}
              {...industry}
              data-testid={`card-industry-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
