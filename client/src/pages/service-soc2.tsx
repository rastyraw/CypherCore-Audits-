import ServiceDetailPage from "@/components/ServiceDetailPage";
import { Shield } from "lucide-react";

export default function ServiceSOC2() {
  return (
    <ServiceDetailPage
      icon={Shield}
      title="SOC 2 Readiness"
      tagline="Comprehensive trust service criteria assessment"
      price="$3,500"
      timeline="4-6 weeks"
      overview="Our SOC 2 Readiness assessment prepares your organization for a successful Type I or Type II audit. We evaluate your systems against all five trust service criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy. Our experienced auditors identify gaps, recommend remediation steps, and guide you through the entire compliance journey."
      includes={[
        "Comprehensive gap analysis against all five trust service criteria",
        "Risk assessment and control mapping",
        "Policy and procedure review and recommendations",
        "Technical control evaluation",
        "Remediation roadmap with prioritized action items",
        "Pre-audit readiness review",
        "Executive summary report for stakeholders",
        "30-day post-assessment support",
      ]}
    />
  );
}
