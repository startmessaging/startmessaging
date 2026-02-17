import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { CodeShowcase, FaqSection, CtaSection } from '@/components/sections';

export const metadata: Metadata = createMetadata({
  title: 'How to Send OTP Without DLT Registration - Step by Step Guide',
  description:
    'Complete guide to sending OTPs in India without DLT registration. Step-by-step tutorial with code examples in Node.js, Python, PHP, Java, and Go.',
  path: '/send-otp-without-dlt',
  keywords: [
    'send OTP without DLT',
    'no DLT OTP',
    'OTP without DLT registration',
    'how to send OTP India',
    'OTP API tutorial',
  ],
});

const steps = [
  {
    step: 1,
    title: 'Create Your Account',
    description:
      'Sign up at dashboard.startmessaging.com with your email. No company documents or KYC required to get started.',
  },
  {
    step: 2,
    title: 'Generate an API Key',
    description:
      'Go to the API Keys page in your dashboard and click "Create API Key". Copy the key — it is shown only once. The key starts with sm_live_ prefix.',
  },
  {
    step: 3,
    title: 'Top Up Your Wallet',
    description:
      'Add funds to your wallet via Razorpay (UPI, cards, netbanking). Each OTP costs Rs 0.25. Top up any amount you want.',
  },
  {
    step: 4,
    title: 'Send Your First OTP',
    description:
      'Make a POST request to /otp/send with the phone number, OTP code, and an idempotency key. See the code examples below.',
  },
  {
    step: 5,
    title: 'Verify the OTP',
    description:
      'When your user enters the OTP, call POST /otp/verify with the OTP request ID and the code. We handle validation, expiry, and attempt limits.',
  },
];

const faqItems = [
  {
    question: 'Do I need any documents to sign up?',
    answer:
      'No. You can sign up with just an email address. No company registration, PAN card, GST certificate, or any other documents are required.',
  },
  {
    question: 'What phone number format should I use?',
    answer:
      'Use E.164 format: country code + number. For India, that is +91 followed by the 10-digit mobile number. Example: +919876543210.',
  },
  {
    question: 'What is an idempotency key?',
    answer:
      'An idempotency key is a unique string (like a UUID) that you send with each OTP request. If you accidentally send the same request twice, the duplicate is ignored. This prevents users from receiving the same OTP multiple times.',
  },
  {
    question: 'How long does an OTP remain valid?',
    answer:
      'OTPs expire after a configurable time window. The default expiry ensures security while giving users enough time to receive and enter the code.',
  },
  {
    question: 'What happens if SMS delivery fails?',
    answer:
      'StartMessaging automatically retries with a backup SMS provider. We only retry on service errors (5xx or timeout), not on validation errors like invalid phone numbers.',
  },
];

export default function SendOtpWithoutDltPage() {
  return (
    <article>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How to Send OTP Without DLT Registration
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A step-by-step guide to sending OTPs in India without any DLT
              setup. From account creation to your first API call in 5 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-step guide */}
      <section className="py-20 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Step-by-Step Guide
            </h2>
            <div className="mt-12 space-y-12">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CodeShowcase />

      <FaqSection items={faqItems} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/dlt-free-otp"
              className="text-sm text-primary hover:underline"
            >
              DLT Free OTP
            </Link>
            <Link
              href="/otp-api"
              className="text-sm text-primary hover:underline"
            >
              OTP API Documentation
            </Link>
            <Link
              href="/otp-verification-api"
              className="text-sm text-primary hover:underline"
            >
              OTP Verification API
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Send Your First OTP?"
        description="Follow the steps above and go live in under 5 minutes. No DLT registration needed."
      />
    </article>
  );
}
