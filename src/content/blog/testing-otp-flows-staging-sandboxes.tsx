import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'testing-otp-flows-staging-sandboxes',
  title: 'Testing OTP Flows in Staging Without Burning Budget or Users',
  description:
    'Strategies for integration tests, DLT-aligned staging, fake numbers, and safe load tests when production uses StartMessaging or other TRAI SMS APIs.',
  category: 'tutorials',
  keywords: [
    'test OTP SMS integration',
    'staging SMS API',
    'mock OTP provider',
    'SMS integration testing',
    'OTP E2E test',
    'fake phone number testing',
    'DLT SMS testing environment',
    'TRAI SMS OTP sandbox',
    'SMS template testing India',
    'transactional SMS QA',
    'OTP SMS API India test',
  ],
  publishedAt: '2026-04-15',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-testing-is-hard', title: 'Why OTP Testing Is Hard' },
    { id: 'environment-separation', title: 'Environment Separation' },
    { id: 'mock-vs-provider', title: 'Mocks vs Real Provider Paths' },
    { id: 'load-testing', title: 'Load Testing Without SMS Pumping' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nodejs',
    'idempotency-keys-otp',
    'prevent-otp-fraud',
  ],
  faq: [
    {
      question: 'Should CI send real SMS?',
      answer:
        'Usually no for every commit. Reserve real SMS for nightly or pre-release pipelines with capped numbers, and rely on contract tests against a mock or sandbox for day-to-day CI.',
    },
    {
      question: 'How do we avoid accidental fraud flags during tests?',
      answer:
        'Use dedicated test numbers, throttle scripts, and never point load generators at random real MSISDNs. Follow the same discipline as production abuse prevention described in our OTP fraud prevention guide.',
    },
  ],
  content: (
    <>
      <p>
        Code samples in{' '}
        <Link
          href="/blog/send-otp-nodejs"
          className="text-primary hover:underline"
        >
          Node
        </Link>
        ,{' '}
        <Link
          href="/blog/send-otp-python"
          className="text-primary hover:underline"
        >
          Python
        </Link>
        , and{' '}
        <Link
          href="/blog/send-otp-php-laravel"
          className="text-primary hover:underline"
        >
          PHP
        </Link>{' '}
        assume you want a working send. This article covers <strong>testing</strong>{' '}
        that integration—CI, staging, and QA—without repeating those tutorials or
        our security guides word for word.
      </p>

      <h2 id="why-testing-is-hard">Why OTP Testing Is Hard</h2>
      <p>
        SMS costs money, carriers add latency, and hitting real phone numbers at
        high frequency looks like abuse. You need a disciplined split: fast
        feedback in development, realistic paths before release, and guardrails
        so automated tests never become{' '}
        <Link
          href="/blog/prevent-otp-fraud"
          className="text-primary hover:underline"
        >
          SMS pumping
        </Link>
        .
      </p>

      <h2 id="environment-separation">Environment Separation</h2>
      <p>
        Use separate API keys per environment. Never share production keys with
        staging databases. If your provider supports distinct projects or keys,
        map them 1:1 to dev, staging, and prod so a staging bug cannot debit
        production wallet balance.
      </p>

      <h2 id="mock-vs-provider">Mocks vs Real Provider Paths</h2>
      <p>
        A <strong>mock</strong> implements the same interface your app uses but
        skips the network—ideal for unit tests and most CI runs. A{' '}
        <strong>staging send</strong> hits the real API with test numbers to
        validate headers, templates, and HTTP error shapes. Schedule the latter
        weekly or on release candidates, not on every pull request.
      </p>
      <p>
        Keep idempotency tests using the patterns from{' '}
        <Link
          href="/blog/idempotency-keys-otp"
          className="text-primary hover:underline"
        >
          idempotency keys for OTP
        </Link>
        —they are about correctness, not SMS content.
      </p>

      <h2 id="load-testing">Load Testing Without SMS Pumping</h2>
      <p>
        Load tests should stress <em>your servers</em>, not every downstream SMS.
        Simulate the SMS gateway with a stub that records concurrency and latency
        distributions, then run a smaller canary test against real SMS to
        validate credentials and quotas.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        The FAQ above addresses CI and abuse prevention; align internal runbooks
        with your actual dashboard and API key rotation policy.
      </p>
    </>
  ),
};
