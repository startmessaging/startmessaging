import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CtaSection } from '@/components/sections';
import { PageStructuredData } from '@/components/structured-data';

export const metadata: Metadata = createMetadata({
  title: 'Refund & Billing Policy',
  description:
    'How wallet credits, OTP charges, and refund requests work for StartMessaging. Clear policy for Indian developers using our OTP API.',
  path: '/refund-policy',
  keywords: [
    'OTP API refund',
    'StartMessaging billing policy',
    'wallet credits refund',
    'SMS API refund India',
  ],
});

export default function RefundPolicyPage() {
  return (
    <article>
      <PageStructuredData path="/refund-policy" />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Refund & Billing Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              Last updated: April 9, 2026. This policy applies to prepaid wallet
              top-ups and use of the StartMessaging OTP API in India.
            </p>

            <div className="mt-12 space-y-10 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  How billing works
                </h2>
                <p className="mt-4">
                  StartMessaging operates on a pay-as-you-go model. You add funds
                  to your account wallet and are charged per OTP sent at the
                  rate shown on our{' '}
                  <Link href="/pricing" className="text-primary hover:underline">
                    pricing page
                  </Link>
                  . Charges apply when an OTP send request is accepted and
                  processed through our API, in line with our{' '}
                  <Link href="/pricing" className="text-primary hover:underline">
                    pricing FAQ
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  Unused wallet balance
                </h2>
                <p className="mt-4">
                  Wallet credits do not expire. You may use your balance at any
                  time for eligible OTP sends. If you no longer wish to use the
                  service, you may request a review of unused balance as
                  described under Refund requests below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  Refund requests
                </h2>
                <p className="mt-4">
                  If you believe you were charged in error, or you wish to
                  request a refund of unused prepaid balance, contact us within
                  fourteen (14) days of the relevant top-up transaction. Include
                  your registered email, approximate date of payment, and
                  transaction reference if available.
                </p>
                <p className="mt-4">
                  We review each request fairly. Approved refunds for unused
                  balance are typically processed within seven (7) business days
                  to the original payment method where possible, or as otherwise
                  agreed. OTPs already sent and successfully processed are not
                  refundable, as delivery and telecom costs are incurred at send
                  time.
                </p>
                <p className="mt-4">
                  Contact:{' '}
                  <a
                    href="mailto:support@startmessaging.com"
                    className="text-primary hover:underline"
                  >
                    support@startmessaging.com
                  </a>{' '}
                  or use the options on our{' '}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact page
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  Disputes and support
                </h2>
                <p className="mt-4">
                  For delivery issues, failed sends, or account questions, reach
                  out through{' '}
                  <Link href="/contact" className="text-primary hover:underline">
                    support channels
                  </Link>
                  . We aim to resolve billing disputes promptly and will provide
                  clarification on charges tied to your API usage and message
                  logs where applicable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground">
                  Changes to this policy
                </h2>
                <p className="mt-4">
                  We may update this page to reflect product or legal changes.
                  Continued use of the service after updates constitutes
                  acceptance of the revised policy. Material changes will be
                  reflected in the &quot;Last updated&quot; date above.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Questions about billing?"
        description="Our team can walk you through wallet top-ups, charges, and API usage."
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
      />
    </article>
  );
}
