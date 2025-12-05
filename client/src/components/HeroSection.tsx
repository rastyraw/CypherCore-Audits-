import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/cybersecurity_shield_hero_background.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(216,72%,14%,0.95)] via-[hsl(216,72%,14%,0.85)] to-[hsl(216,72%,14%,0.7)]" />
      
      <div className="container relative mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center md:px-6 lg:py-32">
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <Shield className="h-4 w-4 text-[hsl(195,100%,43%)]" />
          <span className="text-sm font-medium text-white/90">Trusted Cybersecurity Experts</span>
        </div>
        
        <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl" data-testid="text-hero-headline">
          Redefining Cybersecurity
          <span className="block text-[hsl(195,100%,43%)]">Assurance</span>
        </h1>
        
        <p className="mb-10 max-w-2xl text-lg text-white/80 md:text-xl" data-testid="text-hero-subtext">
          Move from vulnerability to absolute certainty in your digital defense.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" className="gap-2 bg-[hsl(195,100%,43%)] text-white hover:bg-[hsl(195,100%,38%)]" data-testid="button-request-audit">
              Request Audit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20" data-testid="button-our-services">
              Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
