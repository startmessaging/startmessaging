import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageStructuredData } from '@/components/structured-data';
import { Shield, Zap, Info } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'API Limits & Usage Policies - StartMessaging',
  description: 'Detailed information about our API rate limits, security policies, and usage guidelines for production systems.',
  path: '/limits',
});

export default function LimitsPage() {
  return (
    <article className="py-20">
      <PageStructuredData path="/limits" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            API Limits & Policies
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            To ensure platform stability and prevent fraudulent activities like SMS pumping, we enforce the following rate limits on all accounts.
          </p>

          <div className="mt-12 space-y-10">
            {/* Global Throttle */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="size-5" />
                </div>
                <h2 className="text-2xl font-bold">Global Throughput</h2>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">20 Requests Per Second</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each account is allowed up to 1,200 requests per minute globally. This is designed to support high-growth applications and bulk verification workflows.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Per-Mobile Limit */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                  <Shield className="size-5" />
                </div>
                <h2 className="text-2xl font-bold">Security Protection</h2>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3 OTPs per 5 Minutes per Number</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To prevent malicious actors from spamming a single mobile number (scams or SMS pumping), we limit the number of OTPs that can be sent to a specific number to 3 attempts every 5 minutes.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Implementation Tips */}
            <section className="rounded-2xl bg-muted/50 p-8">
              <div className="flex items-center gap-2 font-semibold">
                <Info className="size-5 text-primary" />
                Best Practices
              </div>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Handle <code>429 Too Many Requests</code> errors gracefully in your client-side code.</li>
                <li>Implement your own client-side delays for the "Resend OTP" button (e.g., 30s or 60s).</li>
                <li>Ensure you use the <code>idempotencyKey</code> to avoid double-charging on network retry.</li>
                <li>Contact support for custom limit increases if your use case justifies it.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
