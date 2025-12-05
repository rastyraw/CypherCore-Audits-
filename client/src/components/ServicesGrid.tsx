import ServiceCard from "./ServiceCard";
import { Shield, FileCheck, Heart, Lock, Cloud } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "SOC 2 Readiness",
    description:
      "Comprehensive assessment and preparation for SOC 2 Type I and Type II compliance. We guide you through trust service criteria implementation.",
    price: "$3,500",
    href: "/services/soc2",
  },
  {
    icon: FileCheck,
    title: "ISO 27001 Readiness",
    description:
      "Full gap analysis and implementation support for ISO 27001 certification. Build a world-class information security management system.",
    price: "$4,800",
    href: "/services/iso27001",
  },
  {
    icon: Heart,
    title: "HIPAA Compliance",
    description:
      "Healthcare data protection validation ensuring your organization meets all HIPAA requirements for safeguarding patient information.",
    price: "$3,200",
    href: "/services/hipaa",
  },
  {
    icon: Lock,
    title: "NIST CSF / CMMC",
    description:
      "Navigate federal compliance requirements with our NIST Cybersecurity Framework and CMMC readiness assessments.",
    price: "$5,000",
    href: "/services/nist",
  },
  {
    icon: Cloud,
    title: "Cloud Security Review",
    description:
      "Deep-dive assessment of your cloud infrastructure across AWS, Azure, and GCP. Identify misconfigurations and security gaps.",
    price: "$2,800",
    href: "/services/cloud",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl" data-testid="text-services-heading">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Comprehensive cybersecurity auditing solutions tailored to your compliance needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              data-testid={`card-service-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
