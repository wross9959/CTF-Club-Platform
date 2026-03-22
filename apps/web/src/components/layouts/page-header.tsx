type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-(--primary)">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-zinc-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}