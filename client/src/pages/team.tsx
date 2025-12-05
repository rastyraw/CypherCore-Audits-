import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import CTASection from "@/components/CTASection";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  avatar?: string;
  linkedin?: string;
  email?: string;
}

const leadershipTeam: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Alexandra Sterling",
    role: "Founder & CEO",
    bio: "With over 20 years of experience in cybersecurity, Dr. Sterling founded CipherCore to help organizations navigate the complex landscape of security compliance. She previously served as CISO for Fortune 500 companies.",
    specialties: ["Strategic Planning", "Enterprise Security", "Risk Management"],
    certifications: ["CISSP", "CISM", "PhD in Computer Science"],
    linkedin: "#",
    email: "alexandra@ciphercore.com",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Chief Technology Officer",
    bio: "Marcus leads our technical strategy and innovation initiatives. His background includes leading security engineering teams at major cloud providers and developing award-winning security automation tools.",
    specialties: ["Cloud Security", "Security Architecture", "DevSecOps"],
    certifications: ["CCSP", "AWS Security Specialty", "OSCP"],
    linkedin: "#",
    email: "marcus@ciphercore.com",
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    role: "Chief Compliance Officer",
    bio: "Dr. Patel brings extensive regulatory expertise from her previous roles at Big Four consulting firms. She has helped hundreds of organizations achieve and maintain compliance certifications.",
    specialties: ["Regulatory Compliance", "Audit Management", "Policy Development"],
    certifications: ["CISA", "CRISC", "ISO 27001 Lead Auditor"],
    linkedin: "#",
    email: "priya@ciphercore.com",
  },
];

const seniorConsultants: TeamMember[] = [
  {
    id: 4,
    name: "James O'Brien",
    role: "Senior Security Consultant",
    bio: "James specializes in SOC 2 and ISO 27001 implementations with a focus on SaaS companies. He has successfully guided over 50 organizations through their compliance journeys.",
    specialties: ["SOC 2", "ISO 27001", "SaaS Security"],
    certifications: ["CISSP", "CISA", "SOC 2 Practitioner"],
    linkedin: "#",
  },
  {
    id: 5,
    name: "Dr. Emily Watson",
    role: "Healthcare Security Lead",
    bio: "Emily leads our healthcare practice, bringing deep expertise in HIPAA compliance and healthcare IT security. She previously served as Director of Security at a major hospital network.",
    specialties: ["HIPAA", "Healthcare IT", "Privacy"],
    certifications: ["HCISPP", "CHPS", "CISSP"],
    linkedin: "#",
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Government & Defense Lead",
    bio: "Robert heads our federal practice with expertise in NIST frameworks and CMMC certification. His military background provides unique insights into defense contractor requirements.",
    specialties: ["NIST", "CMMC", "FedRAMP"],
    certifications: ["CMMC-PA", "CISM", "Security+"],
    linkedin: "#",
  },
  {
    id: 7,
    name: "Sarah Kim",
    role: "Cloud Security Architect",
    bio: "Sarah designs and implements secure cloud architectures for organizations migrating to AWS, Azure, and GCP. Her automated security solutions have helped clients reduce vulnerabilities by 80%.",
    specialties: ["AWS", "Azure", "Cloud Architecture"],
    certifications: ["CCSP", "AWS Solutions Architect Pro", "Azure Security Engineer"],
    linkedin: "#",
  },
  {
    id: 8,
    name: "David Thompson",
    role: "Penetration Testing Lead",
    bio: "David leads our offensive security practice, conducting penetration tests and red team engagements. He has discovered and responsibly disclosed vulnerabilities in major software products.",
    specialties: ["Penetration Testing", "Red Team", "Vulnerability Assessment"],
    certifications: ["OSCP", "OSCE", "GPEN"],
    linkedin: "#",
  },
  {
    id: 9,
    name: "Lisa Zhang",
    role: "GRC Consultant",
    bio: "Lisa specializes in governance, risk, and compliance frameworks. She helps organizations build sustainable compliance programs that align with business objectives.",
    specialties: ["Risk Assessment", "Policy Development", "Vendor Management"],
    certifications: ["CRISC", "CGEIT", "GRCP"],
    linkedin: "#",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TeamMemberCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  return (
    <Card 
      className={featured ? "md:col-span-1" : ""} 
      data-testid={`card-team-member-${member.id}`}
    >
      <CardContent className="p-6">
        <div className={`flex ${featured ? "flex-col items-center text-center" : "flex-col"} gap-4`}>
          <Avatar className={featured ? "h-24 w-24" : "h-16 w-16"}>
            {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className={featured ? "text-center" : ""}>
            <h3 className="font-semibold text-lg" data-testid={`text-team-name-${member.id}`}>
              {member.name}
            </h3>
            <p className="text-primary text-sm font-medium" data-testid={`text-team-role-${member.id}`}>
              {member.role}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed" data-testid={`text-team-bio-${member.id}`}>
          {member.bio}
        </p>

        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Specialties</p>
          <div className="flex flex-wrap gap-1">
            {member.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Certifications</p>
          <div className="flex flex-wrap gap-1">
            {member.certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="text-xs">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {member.linkedin && (
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              data-testid={`button-linkedin-${member.id}`}
            >
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.email && (
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              data-testid={`button-email-${member.id}`}
            >
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Team() {
  return (
    <main>
      <div className="relative bg-gradient-to-r from-[hsl(216,72%,14%)] to-[hsl(216,72%,20%)] py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
          <h1 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl" data-testid="text-team-page-heading">
            Our Team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Industry-leading experts dedicated to your security and compliance success
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24" data-testid="section-leadership">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold" data-testid="text-leadership-heading">
              Leadership Team
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Experienced leaders guiding our mission to make cybersecurity compliance accessible and effective
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {leadershipTeam.map((member) => (
              <TeamMemberCard key={member.id} member={member} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24" data-testid="section-consultants">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold" data-testid="text-consultants-heading">
              Senior Consultants
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our team of certified professionals bringing deep expertise across all compliance frameworks
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seniorConsultants.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-values">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold" data-testid="text-values-heading">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center" data-testid="value-integrity">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 font-semibold">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                We maintain the highest ethical standards in all our engagements
              </p>
            </div>
            <div className="text-center" data-testid="value-excellence">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 font-semibold">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                We deliver exceptional results through continuous improvement
              </p>
            </div>
            <div className="text-center" data-testid="value-partnership">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 font-semibold">Partnership</h3>
              <p className="text-sm text-muted-foreground">
                We work alongside our clients as trusted advisors
              </p>
            </div>
            <div className="text-center" data-testid="value-innovation">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="mb-2 font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                We embrace new technologies and methodologies
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
