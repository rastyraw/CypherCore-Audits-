import ServiceDetailPage from "@/components/ServiceDetailPage";
import { Cloud } from "lucide-react";

export default function ServiceCloud() {
  return (
    <ServiceDetailPage
      icon={Cloud}
      title="Cloud Security Review"
      tagline="Secure your cloud infrastructure across all platforms"
      price="$2,800"
      timeline="2-4 weeks"
      overview="Identify and remediate security vulnerabilities in your cloud environment. Our cloud security review covers AWS, Azure, and GCP, evaluating your configuration against industry best practices and CIS Benchmarks. We uncover misconfigurations, access control issues, and data exposure risks before they become breaches."
      includes={[
        "Multi-cloud architecture security assessment",
        "IAM and access control review",
        "Network security and segmentation analysis",
        "Data encryption and key management evaluation",
        "Logging and monitoring configuration review",
        "CIS Benchmark compliance check",
        "Container and Kubernetes security assessment",
        "Cloud-specific remediation recommendations",
      ]}
    />
  );
}
