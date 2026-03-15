import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import { CodeShowcase, FaqSection, CtaSection } from '@/components/sections';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = createMetadata({
  title: 'OTP API Documentation - REST API to Send & Verify OTPs',
  description:
    'Complete REST API documentation for sending and verifying OTPs. Code examples in cURL, Node.js, Python, PHP, Java, and Go. Simple JSON API with idempotent sends.',
  path: '/otp-api',
  keywords: [
    'OTP API',
    'OTP verification API',
    'free OTP API',
    'REST API OTP',
    'send OTP API',
    'verify OTP API',
  ],
});

const endpoints = [
  {
    method: 'POST',
    path: '/otp/send',
    description:
      'Send an OTP code to a phone number via SMS. Requires phoneNumber and a variables object containing the otp (4-8 digits). templateId is optional if using the default template.',
  },
  {
    method: 'POST',
    path: '/otp/verify',
    description:
      'Verify an OTP code entered by the user. Requires otpRequestId and the original otp code.',
  },
  {
    method: 'POST',
    path: '/otp/resend',
    description:
      'Resend an OTP for an existing request. Generates a new OTP code if one wasn\'t provided or reuse the existing one.',
  },
];

const faqItems = [
  {
    question: 'What authentication does the API use?',
    answer:
      'All requests require an API key passed in the X-API-Key header. API keys start with sm_live_ and can be created from the dashboard.',
  },
  {
    question: 'What format should phone numbers be in?',
    answer:
      'Phone numbers must be in E.164 format: +{country code}{number}. For Indian numbers: +919876543210.',
  },
  {
    question: 'What is the rate limit?',
    answer:
      'We support a high throughput of 20 OTPs per second globally per account. Additionally, there is a security limit of 3 OTPs per 5 minutes per mobile number to prevent abuse.',
  },
  {
    question: 'Do you support webhooks for delivery status?',
    answer:
      'Delivery status is available via the messages API endpoint. You can poll for status updates using the message ID returned from the send endpoint.',
  },
];

export default function OtpApiPage() {
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
              OTP API Documentation
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A simple REST API to send and verify OTPs via SMS. One endpoint to
              send, one to verify. Works with any language or framework.
            </p>
          </div>
        </div>
      </section>

      {/* Auth & Base URL */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Authentication</h2>
              <p className="mt-3 text-muted-foreground">
                All API requests require an API key in the{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  X-API-Key
                </code>{' '}
                header. Create API keys from your dashboard.
              </p>
              <div className="mt-4 rounded-lg border bg-card p-4">
                <pre className="text-sm">
                  <code className="font-mono">
                    X-API-Key: sm_live_your_api_key_here
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Base URL</h2>
              <div className="mt-3 rounded-lg border bg-card p-4">
                <pre className="text-sm">
                  <code className="font-mono">
                    https://api.startmessaging.com
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold">API Endpoints</h2>
            <div className="mt-8 space-y-4">
              {endpoints.map((ep) => (
                <Card key={ep.path}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <Badge
                        variant={
                          ep.method === 'POST' ? 'default' : 'secondary'
                        }
                      >
                        {ep.method}
                      </Badge>
                      <code className="font-mono font-normal">{ep.path}</code>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {ep.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response format */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold">Response Format</h2>
            <p className="mt-3 text-muted-foreground">
              All responses follow a consistent JSON envelope:
            </p>
            <div className="mt-4 rounded-lg border bg-card p-4">
              <pre className="overflow-x-auto text-sm">
                <code className="font-mono">{`{
  "success": true,
  "statusCode": 201,
  "requestId": "req_abc123",
  "timestamp": "2026-02-15T10:30:00.000Z",
  "data": {
    "otpRequestId": "uuid-of-otp-request",
    "messageId": "uuid-of-message",
    "status": "queued"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <CodeShowcase />

      <FaqSection title="API FAQ" items={faqItems} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/otp-api"
              className="text-sm text-primary hover:underline"
            >
              OTP API Docs
            </Link>
            <Link
              href="/bulk-otp-api"
              className="text-sm text-primary hover:underline"
            >
              Bulk OTP API
            </Link>
            <Link
              href="/send-otp-without-dlt"
              className="text-sm text-primary hover:underline"
            >
              Send OTP Without DLT
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Start Building with the OTP API"
        description="Get your API key and send your first OTP in under 5 minutes."
        secondaryLabel="View DLT Free OTP"
        secondaryHref="/dlt-free-otp"
      />
    </article>
  );
}
