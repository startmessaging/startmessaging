const stats = [
  { value: '< 5 min', label: 'Setup Time' },
  { value: 'Rs 0.25', label: 'Per OTP' },
  { value: '99.9%', label: 'Uptime' },
  { value: '0', label: 'DLT Paperwork' },
];

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
