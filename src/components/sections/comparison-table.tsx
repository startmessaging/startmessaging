import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Setup time', dlt: '2-4 weeks', noDlt: '5 minutes' },
  { feature: 'DLT registration', dlt: true, noDlt: false },
  { feature: 'Template approval', dlt: true, noDlt: false },
  { feature: 'Entity registration', dlt: true, noDlt: false },
  { feature: 'Header (Sender ID) approval', dlt: true, noDlt: false },
  { feature: 'Government paperwork', dlt: true, noDlt: false },
  { feature: 'Works with any phone number', dlt: true, noDlt: true },
  { feature: 'Delivery tracking', dlt: 'Varies', noDlt: true },
  { feature: 'Multi-provider fallback', dlt: false, noDlt: true },
  { feature: 'Pay-as-you-go pricing', dlt: 'Varies', noDlt: true },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-muted-foreground">{value}</span>;
  }
  return value ? (
    <Check className="h-5 w-5 text-green-500" />
  ) : (
    <X className="h-5 w-5 text-red-500" />
  );
}

export function ComparisonTable() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            DLT vs StartMessaging
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See why developers choose to skip DLT registration.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4 text-left font-medium">Feature</th>
                <th className="px-4 py-3 text-center font-medium">
                  Traditional DLT
                </th>
                <th className="py-3 pl-4 text-center font-medium">
                  StartMessaging
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{row.feature}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <CellValue value={row.dlt} />
                    </div>
                  </td>
                  <td className="py-3 pl-4">
                    <div className="flex justify-center">
                      <CellValue value={row.noDlt} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
