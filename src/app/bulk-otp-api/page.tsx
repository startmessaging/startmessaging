import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CodeShowcase, FaqSection, CtaSection } from '@/components/sections';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Zap, BarChart3, Shield } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Bulk OTP API - Send OTPs at Scale',
  description:
    'Send thousands of OTPs with StartMessaging bulk OTP API. Idempotent sends, multi-provider failover, and real-time tracking for high-volume OTP delivery.',
  path: '/bulk-otp-api',
  keywords: [
    'bulk OTP API',
    'bulk SMS OTP',
    'mass OTP sending',
    'high volume OTP API',
    'OTP API India scale',
  ],
});

const benefits = [
  {
    icon: Layers,
    title: 'Built for Scale',
    description:
      'Our API handles high throughput with wallet-based billing. Top up your wallet and send as many OTPs as you need without per-request payment friction.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'Multi-provider routing ensures fast delivery even at high volumes. If one provider is slow or overloaded, we automatically route through an alternative.',
  },
  {
    icon: BarChart3,
    title: 'Track Every Message',
    description:
      'Full delivery tracking for every OTP sent. Monitor delivery rates, identify failures, and get complete audit trails via the Messages API.',
  },
  {
    icon: Shield,
    title: 'Idempotent at Scale',
    description:
      'Idempotency keys prevent duplicates even during bulk operations. Safe to retry failed requests without worrying about double-sends.',
  },
];

const faqItems = [
  {
    question: 'Is there a rate limit for bulk sending?',
    answer:
      'The API supports high throughput for production use. If you need very high volume (100,000+ OTPs/month), contact us for optimized rate limits and volume pricing.',
  },
  {
    question: 'Can I send OTPs to multiple numbers in one API call?',
    answer:
      'Each API call sends one OTP to one phone number. For bulk sending, make parallel API calls with unique idempotency keys for each request.',
  },
  {
    question: 'How do I handle failures in bulk sends?',
    answer:
      'Each request returns a unique otpRequestId and messageId. Track delivery status per message. Failed sends can be safely retried using the same idempotency key.',
  },
];

export default function BulkOtpApiPage() {
  return (
    <article>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Bulk OTP API
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Send OTPs at scale with reliable delivery, idempotent sends, and
              real-time tracking. Perfect for applications with thousands of
              daily verifications.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <Card key={b.title}>
                <CardHeader className="pb-3">
                  <b.icon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle className="text-base">{b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {b.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CodeShowcase />
      <FaqSection title="Bulk OTP FAQ" items={faqItems} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/otp-api" className="text-sm text-primary hover:underline">
              OTP API Documentation
            </Link>
            <Link href="/pricing" className="text-sm text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/dlt-free-otp" className="text-sm text-primary hover:underline">
              DLT Free OTP
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Send OTPs at Scale"
        description="Top up your wallet and start sending. No rate limit negotiations, no contracts."
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </article>
  );
}
