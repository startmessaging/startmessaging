import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import {
  DltExplainer,
  ComparisonTable,
  HowItWorks,
  FaqSection,
  CtaSection,
} from '@/components/sections';

export const metadata: Metadata = createMetadata({
  title: 'DLT Free OTP - Send OTP Without DLT Registration',
  description:
    'Send OTPs in India without DLT registration. No entity registration, no template approval, no sender ID setup. Start sending OTPs in 5 minutes with our simple API.',
  path: '/dlt-free-otp',
  keywords: [
    'DLT free OTP',
    'OTP without DLT',
    'no DLT registration',
    'DLT bypass OTP',
    'TRAI DLT alternative',
    'send SMS without DLT India',
  ],
});

const faqItems = [
  {
    question: 'What is DLT registration?',
    answer:
      'DLT (Distributed Ledger Technology) is a framework mandated by TRAI (Telecom Regulatory Authority of India) for all commercial SMS senders in India. It requires businesses to register their entity, sender IDs, and message templates on a DLT platform before sending any SMS.',
  },
  {
    question: 'Is it legal to send OTPs without DLT registration?',
    answer:
      'Yes. StartMessaging is a registered entity on the DLT platform. When you use our API, your OTPs are sent through our pre-approved DLT-registered channels. You are essentially using our infrastructure, which is fully compliant.',
  },
  {
    question: 'Why is DLT registration difficult?',
    answer:
      'DLT registration involves multiple steps: entity registration with documents, sender ID (header) registration, and template approval for every unique message. The process takes 2-4 weeks, and any errors require resubmission.',
  },
  {
    question: 'How does StartMessaging handle DLT compliance?',
    answer:
      'We are registered on the DLT platform ourselves. When you send an OTP through our API, it goes through our pre-registered templates and sender IDs, so you do not need to do any DLT setup yourself.',
  },
  {
    question: 'Will my OTPs be delivered reliably without my own DLT registration?',
    answer:
      'Yes. Since we use our own DLT-registered templates, your OTPs are treated as legitimate transactional messages by telecom operators. We also use multi-provider failover to maximize delivery rates.',
  },
  {
    question: 'Can I customize the OTP message text?',
    answer:
      'Currently, OTPs are sent using our pre-approved templates optimized for delivery. The templates include your OTP code and are designed to be clear and professional.',
  },
];

export default function DltFreeOtpPage() {
  return (
    <article>
      <DltExplainer />

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">
              How StartMessaging Makes DLT Irrelevant
            </h2>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p>
                StartMessaging is a fully DLT-registered OTP provider. We have
                already completed entity registration, sender ID setup, and
                template approvals on the DLT platform.
              </p>
              <p>
                When you send an OTP through our API, the message is routed
                through our pre-approved DLT channels. Telecom operators see a
                valid, registered message — so your OTPs get delivered just like
                any other DLT-compliant SMS.
              </p>
              <p>
                This means you get full DLT compliance without any of the
                registration burden. No entity forms, no document uploads, no
                template approvals, no waiting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />
      <HowItWorks />
      <FaqSection
        title="DLT Free OTP — Frequently Asked Questions"
        items={faqItems}
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/send-otp-without-dlt"
              className="text-sm text-primary hover:underline"
            >
              How to Send OTP Without DLT
            </Link>
            <Link
              href="/otp-api"
              className="text-sm text-primary hover:underline"
            >
              OTP API Documentation
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-primary hover:underline"
            >
              Pricing
            </Link>
            <Link
              href="/use-cases"
              className="text-sm text-primary hover:underline"
            >
              Use Cases
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Start Sending DLT-Free OTPs Today"
        description="No registration, no paperwork. Sign up and send your first OTP in under 5 minutes."
      />
    </article>
  );
}
