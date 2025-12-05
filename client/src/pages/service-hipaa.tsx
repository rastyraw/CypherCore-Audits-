import ServiceDetailPage from "@/components/ServiceDetailPage";
import { Heart } from "lucide-react";

export default function ServiceHIPAA() {
  return (
    <ServiceDetailPage
      icon={Heart}
      title="HIPAA Compliance Validation"
      tagline="Protect patient data and maintain healthcare compliance"
      price="$3,200"
      timeline="3-5 weeks"
      overview="Ensure your healthcare organization meets all HIPAA requirements for protecting patient health information. Our validation service covers the Privacy Rule, Security Rule, and Breach Notification Rule. We identify vulnerabilities in your PHI handling processes and help you implement robust safeguards."
      includes={[
        "Comprehensive HIPAA Security Rule assessment",
        "Privacy Rule compliance evaluation",
        "Risk analysis per HIPAA requirements",
        "Administrative, physical, and technical safeguard review",
        "Business Associate Agreement analysis",
        "Breach notification procedure review",
        "Employee training recommendations",
        "Remediation plan with compliance timeline",
      ]}
    />
  );
}
