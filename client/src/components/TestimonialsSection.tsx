import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "HealthTech Solutions",
    content: "CipherCore's HIPAA compliance assessment was thorough and professional. They identified critical gaps we had missed and helped us achieve compliance in record time. Their team's expertise in healthcare security is unmatched.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "VP of Engineering",
    company: "CloudFirst Inc.",
    content: "Working with CipherCore on our SOC 2 Type II certification was a seamless experience. Their methodical approach and clear communication made what could have been a stressful process completely manageable.",
  },
  {
    id: 3,
    name: "Jennifer Walsh",
    role: "CISO",
    company: "FinanceGuard Corp",
    content: "The CipherCore team's deep knowledge of ISO 27001 helped us build a robust ISMS from the ground up. Their ongoing support has been invaluable in maintaining our certification.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Director of IT",
    company: "DefenseTech Systems",
    content: "Their NIST and CMMC expertise was exactly what we needed to secure government contracts. CipherCore guided us through every step of the compliance journey with precision and professionalism.",
  },
  {
    id: 5,
    name: "Amanda Foster",
    role: "CEO",
    company: "SecureStart Ventures",
    content: "As a startup, we needed to establish credibility quickly. CipherCore's cloud security assessment and SOC 2 readiness program helped us win enterprise clients we never thought possible.",
  },
  {
    id: 6,
    name: "Robert Thompson",
    role: "Head of Compliance",
    company: "MedData Analytics",
    content: "The team at CipherCore doesn't just check boxes - they truly understand the spirit of compliance. Their holistic approach has transformed how we think about security across our organization.",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-16 md:py-24" data-testid="section-testimonials">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl" data-testid="text-testimonials-heading">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Trusted by leading organizations across industries to deliver exceptional cybersecurity compliance results
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="relative overflow-visible"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/20" />
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground" data-testid={`text-testimonial-content-${testimonial.id}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.name} />}
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm" data-testid={`text-testimonial-name-${testimonial.id}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
