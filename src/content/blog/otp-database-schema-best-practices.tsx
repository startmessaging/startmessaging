import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-database-schema-best-practices',
  title: 'OTP Database Schema: Best Practices (2026)',
  description:
    'Database schema patterns for storing OTP request metadata: required columns, indexes, retention, hashing, and the columns you should never have.',
  category: 'security',
  keywords: [
    'otp database schema',
    'store otp database',
    'otp table design',
    'sql otp storage',
    'otp data model',
  ],
  publishedAt: '2026-05-18',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'principles', title: 'Principles' },
    { id: 'schema', title: 'Recommended Schema' },
    { id: 'indexes', title: 'Indexes' },
    { id: 'retention', title: 'Retention' },
    { id: 'do-not-store', title: 'Columns You Should Never Store' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-redis-vs-sql-storage',
    'should-you-hash-otp-in-database',
    'otp-security-best-practices',
    'otp-data-privacy-india',
  ],
  faq: [
    {
      question: 'Do I need to store OTPs at all if I use a managed provider?',
      answer:
        'Most teams store the requestId + audit metadata. The plaintext OTP and its hash live with the provider. The audit row is the link between your application logic and the OTP service.',
    },
  ],
  content: (
    <>
      <p>
        If you use a managed OTP provider, you store metadata not codes.
        This guide covers the schema pattern that satisfies audit, fraud
        and DPDP requirements without leaking sensitive data.
      </p>

      <h2 id="principles">Principles</h2>
      <ul>
        <li>Never store the plaintext OTP.</li>
        <li>Bind OTP requests to your own user/session ID.</li>
        <li>Index for the queries you actually run.</li>
        <li>TTL or partition to control retention.</li>
      </ul>

      <h2 id="schema">Recommended Schema</h2>
      <pre>
        <code>{`CREATE TABLE otp_requests (
  id            uuid PRIMARY KEY,
  request_id    text NOT NULL,           -- from provider
  user_id       uuid,
  phone_hash    bytea NOT NULL,          -- sha256 of phone for indexing without PII leak
  purpose       text NOT NULL,           -- 'login' | 'kyc' | 'order'
  ip            inet,
  device_id     text,
  status        text NOT NULL,           -- 'sent' | 'verified' | 'expired' | 'failed'
  attempts      smallint NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  verified_at   timestamptz,
  expires_at    timestamptz NOT NULL
);`}</code>
      </pre>

      <h2 id="indexes">Indexes</h2>
      <ul>
        <li><code>(phone_hash, created_at desc)</code> — rate-limit queries.</li>
        <li><code>(user_id, purpose, created_at desc)</code> — audit queries.</li>
        <li><code>(request_id)</code> — provider correlation.</li>
      </ul>

      <h2 id="retention">Retention</h2>
      <ul>
        <li>Login OTP: 90 days hot, 7 years cold.</li>
        <li>Financial OTP: 7+ years per RBI / SEBI.</li>
        <li>Drop user data on account-deletion under DPDP right-to-erasure.</li>
      </ul>

      <h2 id="do-not-store">Columns You Should Never Store</h2>
      <ul>
        <li>Plaintext OTP code.</li>
        <li>Raw phone number (use hash + last-4 if needed for support).</li>
        <li>API key.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        See <Link href="/blog/should-you-hash-otp-in-database">
          should you hash OTPs?
        </Link>{' '}
        for the cryptographic side.
      </p>
    </>
  ),
};
