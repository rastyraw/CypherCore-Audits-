import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  endValue: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { endValue: 500, suffix: "+", label: "Audits Completed" },
  { endValue: 200, suffix: "+", label: "Clients Served" },
  { endValue: 15, suffix: "+", label: "Certifications" },
  { endValue: 12, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ endValue, suffix, duration = 2000 }: { endValue: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * endValue);
        setCount(currentValue);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, endValue, duration]);

  return (
    <div ref={ref} className="font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="border-y border-border bg-card py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              data-testid={`stat-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-2">
                <AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-muted-foreground md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
