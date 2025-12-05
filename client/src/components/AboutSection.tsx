import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be the benchmark for precision-driven cybersecurity assurance, empowering organizations to operate with complete confidence in their digital security posture.",
  },
  {
    icon: Target,
    title: "Mission",
    description:
      "Deliver expert-led, compliance-aligned auditing services that transform complex security requirements into clear, actionable pathways to certification and beyond.",
  },
  {
    icon: Heart,
    title: "Values",
    items: [
      "Integrity - Uncompromising honesty in every assessment",
      "Precision - Meticulous attention to detail",
      "Collaboration - Partnership-based client relationships",
      "Continuous Improvement - Always evolving our methods",
    ],
  },
];

export default function AboutSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl" data-testid="text-about-heading">
            About CipherCore
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Building trust through expert cybersecurity auditing
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className="border-border bg-card"
              data-testid={`card-about-${index}`}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-semibold">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {value.items ? (
                  <ul className="space-y-2 text-left text-sm text-muted-foreground">
                    {value.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{value.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
