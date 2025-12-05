import ServiceDetailPage from "@/components/ServiceDetailPage";
import { Lock } from "lucide-react";

export default function ServiceNIST() {
  return (
    <ServiceDetailPage
      icon={Lock}
      title="NIST CSF / CMMC"
      tagline="Navigate federal compliance with confidence"
      price="$5,000"
      timeline="6-10 weeks"
      overview="Prepare for federal compliance requirements with our NIST Cybersecurity Framework and CMMC readiness assessment. Whether you're pursuing government contracts or strengthening your security posture, we help you implement robust controls aligned with NIST 800-171 and CMMC 2.0 requirements."
      includes={[
        "NIST CSF maturity assessment across all five functions",
        "NIST 800-171 control gap analysis",
        "CMMC level determination and readiness evaluation",
        "System Security Plan (SSP) development support",
        "Plan of Action and Milestones (POA&M) creation",
        "CUI identification and scoping assistance",
        "Technical control implementation guidance",
        "Assessment preparation and mock audit",
      ]}
    />
  );
}
