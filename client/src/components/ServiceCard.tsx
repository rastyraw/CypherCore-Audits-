import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  href: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  href,
}: ServiceCardProps) {
  return (
    <Card className="group relative flex flex-col border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <Badge
        variant="secondary"
        className="absolute right-4 top-4 bg-primary/10 text-primary"
      >
        {price}
      </Badge>
      <CardHeader className="pb-4 pt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-heading text-xl font-semibold pr-16">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="mb-6 flex-1 text-muted-foreground">{description}</p>
        <Link href={href}>
          <Button variant="ghost" className="w-full justify-between gap-2 group-hover:text-primary">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
