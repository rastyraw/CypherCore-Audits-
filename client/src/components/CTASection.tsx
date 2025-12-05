import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[hsl(216,72%,14%)] to-[hsl(216,72%,20%)] py-16 md:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[hsl(195,100%,43%)] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[hsl(195,100%,43%)] blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Shield className="h-8 w-8 text-[hsl(195,100%,43%)]" />
          </div>
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl" data-testid="text-cta-heading">
            Ready to Secure Your Future?
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-white/80">
            Schedule a free consultation with our cybersecurity experts and take
            the first step toward comprehensive compliance.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="gap-2 bg-[hsl(195,100%,43%)] text-white hover:bg-[hsl(195,100%,38%)]" data-testid="button-cta-schedule">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
