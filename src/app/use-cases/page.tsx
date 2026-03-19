import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { UseCaseCards, CtaSection } from '@/components/sections';

export const metadata: Metadata = createMetadata({
  title: 'OTP Use Cases - Login, 2FA, Payments & More',
  description:
    'Explore OTP use cases: user login, two-factor authentication, payment verification, user registration, order confirmation, and delivery verification.',
  path: '/use-cases',
  keywords: [
    'OTP use cases',
    'OTP login',
    'OTP 2FA',
    'OTP payment verification',
    'phone verification use cases',
  ],
});

export default function UseCasesPage() {
  return (
    <article>

      <UseCaseCards />

      {/* Industry examples */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Who Uses OTP APIs?
            </h2>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p>
                <strong className="text-foreground">E-commerce platforms</strong>{' '}
                use OTPs for login verification, payment confirmation, and
                delivery handoff. Every transaction that needs user confirmation
                benefits from OTP verification.
              </p>
              <p>
                <strong className="text-foreground">Fintech apps</strong> rely on
                OTPs for transaction authorization, account recovery, and
                regulatory compliance. Two-factor authentication is often
                mandatory for financial services.
              </p>
              <p>
                <strong className="text-foreground">SaaS products</strong> use
                OTPs during user onboarding to verify phone numbers, for
                password resets, and to protect sensitive account settings.
              </p>
              <p>
                <strong className="text-foreground">Healthcare platforms</strong>{' '}
                verify patient identity with OTPs before sharing medical
                records, appointment confirmations, or telemedicine sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

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
        secondaryLabel="View Features"
        secondaryHref="/features"
      />
    </article>
  );
}
