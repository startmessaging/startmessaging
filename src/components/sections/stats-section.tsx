const stats = [
  { value: '< 5 min', label: 'Setup Time' },
  { value: 'Rs 0.25', label: 'Per OTP' },
  { value: '99.9%', label: 'Uptime' },
  { value: '0', label: 'DLT Paperwork' },
];

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
