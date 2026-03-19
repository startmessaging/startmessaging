import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import {
  FeaturesGrid,
  ComparisonTable,
  CtaSection,
} from '@/components/sections';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, BarChart3, RefreshCw, Fingerprint } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Features - Everything You Need to Send OTPs',
  description:
    'Explore StartMessaging features: DLT-free OTP sending, multi-provider fallback, idempotent sends, real-time tracking, wallet billing, and secure API key management.',
  path: '/features',
  keywords: [
    'OTP API features',
    'multi-provider SMS',
    'SMS failover',
    'OTP delivery tracking',
    'idempotent OTP API',
  ],
});

const detailedFeatures = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description:
      'OTP codes are bcrypt-hashed before storage — never stored in plaintext. API keys are SHA-256 hashed. All communication over HTTPS. Your users\' data is protected at every layer.',
  },
  {
    icon: RefreshCw,
    title: 'Multi-Provider Failover',
    description:
      'We route OTPs through multiple SMS providers (Twilio, MSG91) with priority-based fallback. If one provider fails with a service error, we automatically retry with the next provider.',
  },
  {
    icon: Fingerprint,
    title: 'Idempotent by Design',
    description:
      'Every OTP send request requires an idempotency key. If you accidentally send the same request twice (network retry, double click), the duplicate is ignored. No double-sends, ever.',
  },
  {
    icon: BarChart3,
    title: 'Full Message Lifecycle',
    description:
      'Track every OTP from queued to delivered. Each message includes a full status history timeline with timestamps, provider details, and cost tracking.',
  },
];

export default function FeaturesPage() {
  return (
    <article>
      <h1 className="sr-only">Features Built for Developers</h1>
      <FeaturesGrid />

      {/* Detailed features */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Designed for Production
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {detailedFeatures.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <f.icon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/pricing" className="text-sm text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/otp-api" className="text-sm text-primary hover:underline">
              API Documentation
            </Link>
            <Link href="/use-cases" className="text-sm text-primary hover:underline">
              Use Cases
            </Link>
            <Link href="/dlt-free-otp" className="text-sm text-primary hover:underline">
              DLT Free OTP
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        secondaryLabel="View API Docs"
        secondaryHref="/otp-api"
      />
    </article>
  );
}
