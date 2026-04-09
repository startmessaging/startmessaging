import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { productJsonLd } from '@/lib/jsonld';
import { PricingSection, FaqSection, CtaSection } from '@/components/sections';
import { PageStructuredData } from '@/components/structured-data';

export const metadata: Metadata = createMetadata({
  title: 'Pricing - Pay As You Go OTP API at Rs 0.25/OTP',
  description:
    'Simple pay-as-you-go pricing for OTP API. Rs 0.25 per OTP sent. No monthly fees or subscriptions. Add funds in the dashboard and start sending.',
  path: '/pricing',
  keywords: [
    'OTP API pricing',
    'OTP API pricing India',
    'cheap OTP API',
    'pay as you go OTP',
    'SMS OTP cost India',
  ],
});

const faqItems = [
  {
    question: 'Is there a free tier?',
    answer:
      'There is no free tier, but there are no monthly fees either. You only pay for OTPs you send at Rs 0.25 each. Add funds from the dashboard to get started.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods via Razorpay: UPI, credit cards, debit cards, netbanking, and wallets.',
  },
  {
    question: 'Do unused credits expire?',
    answer:
      'No. Your wallet balance does not expire. Use it whenever you need to.',
  },
  {
    question: 'Are there volume discounts?',
    answer:
      'Contact us for volume pricing if you send more than 100,000 OTPs per month.',
  },
  {
    question: 'Am I charged for failed deliveries?',
    answer:
      'You are charged when the OTP is sent. If delivery fails and the message cannot be delivered after all retry attempts, the charge stands. Our multi-provider failover ensures high delivery rates.',
  },
];

export default function PricingPage() {
  return (
    <article>
      <PageStructuredData
        path="/pricing"
        faq={faqItems}
        schemas={[productJsonLd()]}
      />

      <h1 className="sr-only">Simple, Transparent Pricing</h1>

      <PricingSection />

      {/* Cost calculator */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Cost Examples</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-3xl font-bold">Rs 25</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  100 OTPs
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-3xl font-bold">Rs 250</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  1,000 OTPs
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-3xl font-bold">Rs 2,500</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  10,000 OTPs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection title="Pricing FAQ" items={faqItems} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/features" className="text-sm text-primary hover:underline">
              Features
            </Link>
            <Link href="/otp-api" className="text-sm text-primary hover:underline">
              API Documentation
            </Link>
            <Link href="/dlt-free-otp" className="text-sm text-primary hover:underline">
              DLT Free OTP
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Start Sending OTPs Today"
        description="Sign up free, add funds in the dashboard, and pay only Rs 0.25 per OTP."
        secondaryLabel="View Features"
        secondaryHref="/features"
      />
    </article>
  );
}
