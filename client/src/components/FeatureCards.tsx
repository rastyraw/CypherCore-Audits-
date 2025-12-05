import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, BadgeCheck, Lightbulb } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Audit Precision",
    description:
      "Meticulous assessment methodologies that leave no vulnerability unexamined. Our auditors follow industry-leading frameworks with surgical precision.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted by Regulators",
    description:
      "Our reports are recognized and accepted by regulatory bodies worldwide. Build confidence with stakeholders through our certified assessments.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Insights",
    description:
      "Beyond identifying issues, we provide clear remediation roadmaps. Transform findings into strategic security improvements.",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl" data-testid="text-features-heading">
            Why Choose CipherCore
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Industry-leading expertise meets uncompromising standards
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              data-testid={`card-feature-${index}`}
            >
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
