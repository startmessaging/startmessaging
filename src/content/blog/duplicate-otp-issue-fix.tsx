import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'duplicate-otp-issue-fix',
  title: 'Duplicate OTP Sent? Causes and Fixes',
  description:
    'Why users receive two OTPs for one request: client retries, queue duplicates, network race conditions. How idempotency keys solve the problem.',
  category: 'security',
  keywords: [
    'duplicate otp',
    'two otp received',
    'otp sent twice fix',
    'otp idempotency',
    'duplicate sms otp',
  ],
  publishedAt: '2026-05-16',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'causes', title: 'Causes of Duplicate OTPs' },
    { id: 'client-retry', title: 'Client Retries' },
    { id: 'queue', title: 'Queue Duplicates' },
    { id: 'race', title: 'Race Conditions' },
    { id: 'fix', title: 'The Fix: Idempotency Keys' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'idempotency-keys-otp',
    'otp-rate-limiting-guide',
    'otp-not-received-india',
  ],
  faq: [
    {
      question: 'Should I de-dup OTPs at the client?',
      answer:
        'No. The right place is server-side via idempotency keys. Client de-dup is fragile across network failures.',
    },
  ],
  content: (
    <>
      <p>
        Duplicate OTPs annoy users, waste your wallet, and trigger fraud
        flags. Almost always the cause is a missing idempotency key.
      </p>

      <h2 id="causes">Causes of Duplicate OTPs</h2>
      <ul>
        <li>User taps &ldquo;send&rdquo; twice in quick succession.</li>
        <li>Network failure → client retries → both succeed.</li>
        <li>Background queue worker re-emits.</li>
        <li>Race between primary and secondary route.</li>
      </ul>

      <h2 id="client-retry">Client Retries</h2>
      <p>
        Mobile networks routinely retry HTTP requests on flaky connections.
        Without idempotency keys, every retry that lands costs an extra OTP.
      </p>

      <h2 id="queue">Queue Duplicates</h2>
      <p>
        At-least-once queues (SQS, Pub/Sub) can deliver the same job twice.
        Worker must idempotency-key on the job ID.
      </p>

      <h2 id="race">Race Conditions</h2>
      <p>
        Failover routes that both succeed before the failover marker
        propagates.
      </p>

      <h2 id="fix">The Fix: Idempotency Keys</h2>
      <pre>
        <code>{`POST /otp/send
{ "phoneNumber": "+91...", "idempotencyKey": "<uuid>" }`}</code>
      </pre>
      <p>
        Same key = same response, no second SMS. See{' '}
        <Link href="/blog/idempotency-keys-otp">our idempotency guide</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> supports idempotency
        keys natively — pass one and we deduplicate for you.
      </p>
    </>
  ),
};
