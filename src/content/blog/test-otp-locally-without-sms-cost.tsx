import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'test-otp-locally-without-sms-cost',
  title: 'How to Test OTP Locally Without SMS Costs',
  description:
    'Free patterns to test your OTP integration end-to-end without burning real SMS credits: sandbox modes, mock providers, Mailhog-style local servers, and CI strategies.',
  category: 'security',
  keywords: [
    'test otp locally',
    'mock otp api',
    'sandbox otp',
    'test sms without cost',
    'free otp testing',
  ],
  publishedAt: '2026-05-18',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'options', title: 'Options Overview' },
    { id: 'sandbox', title: 'Provider Sandbox Mode' },
    { id: 'mock', title: 'Mock Provider' },
    { id: 'fixtures', title: 'Fixed Test Phones' },
    { id: 'ci', title: 'CI Strategy' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'testing-otp-flows-staging-sandboxes',
    'send-otp-nodejs',
    'idempotency-keys-otp',
  ],
  faq: [
    {
      question: 'Does StartMessaging have a sandbox?',
      answer:
        'Yes — sandbox keys deliver to a fixed test number with a known OTP code. No real SMS sent.',
    },
  ],
  content: (
    <>
      <p>
        Testing OTP integrations end-to-end without burning the wallet is
        easy with the right pattern. This guide covers the three main
        approaches.
      </p>

      <h2 id="options">Options Overview</h2>
      <ul>
        <li>Sandbox key — provider simulates delivery.</li>
        <li>Mock provider — local HTTP service that mimics the API.</li>
        <li>Fixed test phone — real OTPs sent to one staging number.</li>
      </ul>

      <h2 id="sandbox">Provider Sandbox Mode</h2>
      <p>
        Most providers ship a sandbox key. With{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link>, sandbox mode
        accepts any phone number and verifies any OTP code marked as the
        test code.
      </p>

      <h2 id="mock">Mock Provider</h2>
      <pre>
        <code>{`// tests/mock-sm.ts
import { rest } from 'msw';
export const handlers = [
  rest.post('https://api.startmessaging.com/otp/send', (req, res, ctx) =>
    res(ctx.json({ data: { requestId: 'mock_123', expiresAt: 'X', attemptsLeft: 3 }}))
  ),
  rest.post('https://api.startmessaging.com/otp/verify', (req, res, ctx) =>
    res(ctx.json({ data: { verified: true }}))
  ),
];`}</code>
      </pre>

      <h2 id="fixtures">Fixed Test Phones</h2>
      <p>
        Designate one phone you control as the staging recipient. Real OTPs
        delivered, manual entry. Fine for human tests, painful in CI.
      </p>

      <h2 id="ci">CI Strategy</h2>
      <ul>
        <li>Use mock provider in unit / integration tests.</li>
        <li>Use sandbox key in nightly e2e.</li>
        <li>Real provider only in pre-prod staging environment.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For the broader staging story see{' '}
        <Link href="/blog/testing-otp-flows-staging-sandboxes">
          OTP testing in staging guide
        </Link>
        .
      </p>
    </>
  ),
};
