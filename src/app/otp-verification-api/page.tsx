import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import { FaqSection, CtaSection } from '@/components/sections';

export const metadata: Metadata = createMetadata({
  title: 'OTP Verification API - Verify Phone Numbers with OTP',
  description:
    'Complete OTP verification API for phone number verification. Send OTP, verify code, handle retries. Built-in expiry, attempt limits, and bcrypt hashing.',
  path: '/otp-verification-api',
  keywords: [
    'OTP verification API',
    'phone verification API',
    'verify OTP',
    'phone number verification',
    'SMS verification API India',
  ],
});

const verifyFlow = [
  {
    step: 1,
    title: 'Send OTP',
    endpoint: 'POST /otp/send',
    description:
      'Send an OTP to the user\'s phone number. The API returns an otpRequestId for tracking.',
  },
  {
    step: 2,
    title: 'User Enters OTP',
    endpoint: 'Your app',
    description:
      'Show an input field in your app where the user enters the OTP they received via SMS.',
  },
  {
    step: 3,
    title: 'Verify OTP',
    endpoint: 'POST /otp/verify',
    description:
      'Send the otpRequestId and the code the user entered. The API validates against the bcrypt-hashed original.',
  },
];

const faqItems = [
  {
    question: 'How many verification attempts does the user get?',
    answer:
      'Each OTP request has a configurable number of attempts. After exhausting all attempts, the OTP is invalidated and a new one must be sent.',
  },
  {
    question: 'What happens when an OTP expires?',
    answer:
      'Expired OTPs cannot be verified. The verify endpoint will return an error. The user needs to request a new OTP via the resend endpoint.',
  },
  {
    question: 'Can I resend an OTP?',
    answer:
      'Yes. Use the POST /otp/resend endpoint with the original otpRequestId. This generates a new code and sends it to the same phone number.',
  },
  {
    question: 'Are OTP codes stored in plaintext?',
    answer:
      'No. All OTP codes are bcrypt-hashed before storage. The original code is never stored and cannot be retrieved — only verified.',
  },
];

export default function OtpVerificationApiPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd()),
        }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              OTP Verification API
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A complete send-and-verify flow for phone number verification.
              Built-in expiry, attempt limits, and secure bcrypt hashing.
            </p>
          </div>
        </div>
      </section>

      {/* Verification flow */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Verification Flow
            </h2>
            <div className="mt-12 space-y-8">
              {verifyFlow.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {item.endpoint}
                      </code>
                    </p>
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

      {/* Verify request/response */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Verify Request</h2>
              <div className="mt-4 rounded-lg border bg-card p-4">
                <pre className="overflow-x-auto text-sm">
                  <code className="font-mono">{`POST /otp/verify
Content-Type: application/json
X-API-Key: sm_live_your_api_key_here

{
  "otpRequestId": "uuid-from-send-response",
  "otp": "123456"
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Verify Response</h2>
              <div className="mt-4 rounded-lg border bg-card p-4">
                <pre className="overflow-x-auto text-sm">
                  <code className="font-mono">{`{
  "success": true,
  "statusCode": 200,
  "requestId": "req_xyz789",
  "timestamp": "2026-02-15T10:31:00.000Z",
  "data": {
    "verified": true,
    "otpRequestId": "uuid-from-send-response"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection title="Verification API FAQ" items={faqItems} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/otp-api" className="text-sm text-primary hover:underline">
              OTP API Documentation
            </Link>
            <Link href="/send-otp-without-dlt" className="text-sm text-primary hover:underline">
              Send OTP Without DLT
            </Link>
            <Link href="/use-cases" className="text-sm text-primary hover:underline">
              Use Cases
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Add Phone Verification to Your App"
        description="Implement send-and-verify OTP flow in minutes. No DLT registration needed."
        secondaryLabel="View API Docs"
        secondaryHref="/otp-api"
      />
    </article>
  );
}
