import ServiceDetailPage from "@/components/ServiceDetailPage";
import { FileCheck } from "lucide-react";

export default function ServiceISO27001() {
  return (
    <ServiceDetailPage
      icon={FileCheck}
      title="ISO 27001 Readiness"
      tagline="Build a world-class information security management system"
      price="$4,800"
      timeline="6-8 weeks"
      overview="Achieve ISO 27001 certification with confidence. Our readiness assessment evaluates your organization's information security management system (ISMS) against the ISO 27001 standard. We help you establish, implement, maintain, and continually improve your ISMS to meet international security standards."
      includes={[
        "Full ISMS gap analysis against ISO 27001:2022",
        "Risk assessment methodology implementation",
        "Statement of Applicability (SoA) development",
        "Control implementation guidance for Annex A controls",
        "Documentation templates and frameworks",
        "Internal audit preparation support",
        "Management review facilitation",
        "Certification body liaison assistance",
      ]}
    />
  );
}
