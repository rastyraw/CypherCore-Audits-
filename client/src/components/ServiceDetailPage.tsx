import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowLeft, Calendar, type LucideIcon } from "lucide-react";

interface ServiceDetailPageProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  price: string;
  timeline: string;
  overview: string;
  includes: string[];
}

export default function ServiceDetailPage({
  icon: Icon,
  title,
  tagline,
  price,
  timeline,
  overview,
  includes,
}: ServiceDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-r from-[hsl(216,72%,14%)] to-[hsl(216,72%,20%)] py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/services">
            <Button variant="ghost" className="mb-6 gap-2 text-white/80 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
              <Icon className="h-8 w-8 text-[hsl(195,100%,43%)]" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
                {title}
              </h1>
              <p className="text-lg text-white/80">{tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">{overview}</p>
            </div>

            <div>
              <h2 className="mb-4 font-heading text-2xl font-semibold">
                What's Included
              </h2>
              <ul className="space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border bg-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Engagement Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-2 text-sm font-medium text-muted-foreground">
                    Starting Price
                  </div>
                  <Badge className="text-lg font-semibold bg-primary/10 text-primary px-4 py-2">
                    {price}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Timeline
                    </div>
                    <div className="font-medium">{timeline}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <Link href="/contact">
                    <Button className="w-full gap-2" data-testid="button-book-consultation">
                      <Calendar className="h-4 w-4" />
                      Book Consultation
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-muted-foreground">
                    Free 30-minute discovery call
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
