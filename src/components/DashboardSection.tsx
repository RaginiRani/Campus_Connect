export default function DashboardSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        {children}
      </div>
    </section>
  );
}
