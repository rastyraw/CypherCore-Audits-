import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  href: string;
}

export default function BlogCard({
  title,
  summary,
  date,
  category,
  href,
}: BlogCardProps) {
  return (
    <Card className="group flex flex-col border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 via-primary/10 to-accent">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/20" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
        <CardTitle className="font-heading text-lg font-semibold leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {summary}
        </p>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
