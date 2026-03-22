type HeroProps = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-(--accent)">
          Open-source challenge platform
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-(--primary) sm:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-(--foreground) sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}