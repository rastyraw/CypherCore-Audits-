const stats = [
  { value: "500+", label: "Audits Completed" },
  { value: "12+", label: "Industries Served" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Expert Support" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-border bg-card py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center" data-testid={`stat-${index}`}>
              <div className="mb-2 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
