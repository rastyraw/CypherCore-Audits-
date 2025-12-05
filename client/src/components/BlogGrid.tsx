import BlogCard from "./BlogCard";

const blogPosts = [
  {
    title: "Preparing for Your SOC 2 Audit: A Complete Guide",
    summary:
      "Everything you need to know about SOC 2 readiness, from understanding trust service criteria to implementing effective controls. Start your compliance journey with confidence.",
    date: "Dec 1, 2024",
    category: "Compliance",
    href: "/insights/preparing-for-soc2",
  },
  {
    title: "Understanding HIPAA and NIST Overlap",
    summary:
      "Discover how HIPAA and NIST frameworks complement each other and how to leverage this overlap for more efficient compliance. Streamline your security program.",
    date: "Nov 28, 2024",
    category: "Healthcare",
    href: "/insights/hipaa-nist-overlap",
  },
  {
    title: "Zero Trust Architecture: Building the Foundation",
    summary:
      "Learn the core principles of Zero Trust and how to implement this security model in your organization. Move beyond perimeter-based security.",
    date: "Nov 25, 2024",
    category: "Security",
    href: "/insights/zero-trust-foundations",
  },
];

export default function BlogGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl" data-testid="text-insights-heading">
            Latest Insights
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Expert perspectives on cybersecurity and compliance
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.title}
              {...post}
              data-testid={`card-blog-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
