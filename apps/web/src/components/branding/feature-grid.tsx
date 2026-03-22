const features = [
  {
    title: "Reusable by clubs",
    description:
      "Designed as a self-hostable platform with branding, scoring, and feature toggles.",
  },
  {
    title: "Built for challenges",
    description:
      "Support weekly events, static or dynamic scoring, challenge pages, and scoreboards.",
  },
  {
    title: "Engineered cleanly",
    description:
      "Modern frontend, Go backend, and a structure meant to grow without becoming messy.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-bg-white/5 bg-bg-white/5 p-6 shadow-sm backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-(--primary)">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-(--foreground)">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}