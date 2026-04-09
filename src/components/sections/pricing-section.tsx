import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DASHBOARD_URL } from '@/lib/constants';

const included = [
  'No monthly fees',
  'No DLT registration',
  'Unlimited API keys',
  'Multi-provider failover',
  'Real-time delivery tracking',
  'Idempotent OTP sends',
  'Wallet-based billing',
  'Dashboard & analytics',
];

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No subscriptions, no tiers, no hidden fees. Just pay for what you
            send.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <Card className="border-2 border-primary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Pay As You Go</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold text-primary">Rs 0.25</span>
                <span className="text-muted-foreground"> / OTP</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Prepaid wallet. Pay Rs 0.25 per OTP from your balance.
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" size="lg" asChild>
                <a href={DASHBOARD_URL}>Get Started Free</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
