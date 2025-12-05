import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calendar } from "lucide-react";
import logoImage from "@assets/CipherCore__logo_silver_(1)(1)_1764894486156.png";
import ConsultationScheduler from "@/components/ConsultationScheduler";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients & Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <img src={logoImage} alt="CipherCore Audits" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={`font-medium ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <ConsultationScheduler
            trigger={
              <Button variant="outline" className="gap-2" data-testid="button-schedule-header">
                <Calendar className="h-4 w-4" />
                Schedule Call
              </Button>
            }
          />
          <Link href="/contact">
            <Button data-testid="button-request-audit-header">
              Request Audit
            </Button>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <img src={logoImage} alt="CipherCore Audits" className="h-8 w-auto" />
              </div>
              <nav className="flex flex-col gap-2" data-testid="nav-mobile">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-base ${
                        location === link.href
                          ? "bg-accent text-primary"
                          : "text-foreground"
                      }`}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
              <ConsultationScheduler
                trigger={
                  <Button variant="outline" className="w-full gap-2" data-testid="button-schedule-mobile">
                    <Calendar className="h-4 w-4" />
                    Schedule Call
                  </Button>
                }
              />
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full" data-testid="button-request-audit-mobile">
                  Request Audit
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
