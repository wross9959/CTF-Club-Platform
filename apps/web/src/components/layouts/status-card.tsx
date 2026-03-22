type StatusCardProps = {
  platformName: string;
  shortName: string;
  supportEmail: string;
  timezone: string;
  backendStatus: string;
};

export default function StatusCard({
  platformName,
  shortName,
  supportEmail,
  timezone,
  backendStatus,
}: StatusCardProps) {
  return (
    <section className="py-10">
      <div className="rounded-2xl border border-white/10 bg-black/10 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-(--primary)">Instance Status</h2>

        <div className="mt-4 grid gap-3 text-sm text-(--foreground) sm:grid-cols-2">
          <p>
            <span className="font-semibold text-(--primary)">Name:</span> {platformName}
          </p>
          <p>
            <span className="font-semibold text-(--primary)">Short name:</span> {shortName}
          </p>
          <p>
            <span className="font-semibold text-(--primary)">Support:</span> {supportEmail}
          </p>
          <p>
            <span className="font-semibold text-(--primary)">Timezone:</span> {timezone}
          </p>
          <p>
            <span className="font-semibold text-(--primary)">Backend health:</span>{" "}
            {backendStatus}
          </p>
        </div>
      </div>
    </section>
  );
}