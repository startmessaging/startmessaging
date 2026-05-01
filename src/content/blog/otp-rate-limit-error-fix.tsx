import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-rate-limit-error-fix',
  title: 'Fix OTP Rate Limit (429) Errors',
  description:
    'How to diagnose and fix HTTP 429 rate-limit errors on OTP APIs. Per-phone vs per-IP limits, exponential backoff, idempotency, and capacity planning for spikes.',
  category: 'security',
  keywords: [
    'otp 429 error',
    'otp rate limit fix',
    'otp api 429',
    'too many requests otp',
    'sms rate limit',
  ],
  publishedAt: '2026-05-15',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'meaning', title: 'What 429 Means' },
    { id: 'sources', title: 'Where the Limit is Hit' },
    { id: 'backoff', title: 'Exponential Backoff' },
    { id: 'capacity', title: 'Capacity Planning' },
    { id: 'monitoring', title: 'Monitoring' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-rate-limiting-guide',
    'otp-bot-attacks-traffic-pumping',
    'idempotency-keys-otp',
    'otp-delivery-delay-fix',
  ],
  faq: [
    {
      question: 'Should I retry on 429 immediately?',
      answer:
        'Never immediate. Use exponential backoff with jitter — 1s, 2s, 4s, 8s — and respect the Retry-After header if the provider sets it.',
    },
  ],
  content: (
    <>
      <p>
        429 means the OTP API has throttled your request. Honest diagnosis
        first — is it your code looping, or a real spike?
      </p>

      <h2 id="meaning">What 429 Means</h2>
      <p>
        Server is rejecting because your client exceeded a rate limit. The
        limit could be on your account, on the destination phone, or on the
        upstream operator route.
      </p>

      <h2 id="sources">Where the Limit is Hit</h2>
      <ul>
        <li>Per-account TPS — you exceeded the account-wide limit.</li>
        <li>Per-phone — the same phone got too many OTPs in the window.</li>
        <li>Per-IP — pumping defence.</li>
        <li>Carrier upstream — operator capping your sender ID.</li>
      </ul>

      <h2 id="backoff">Exponential Backoff</h2>
      <pre>
        <code>{`async function withBackoff<T>(fn: () => Promise<T>, max = 3): Promise<T> {
  for (let i = 0; i < max; i++) {
    try { return await fn(); }
    catch (e: any) {
      if (e.status !== 429 || i === max - 1) throw e;
      await new Promise(r => setTimeout(r, (2 ** i) * 1000 + Math.random() * 1000));
    }
  }
  throw new Error('unreachable');
}`}</code>
      </pre>

      <h2 id="capacity">Capacity Planning</h2>
      <p>
        See <Link href="/blog/otp-rate-limiting-guide">our rate-limiting
        guide</Link>. For sale-day spikes pre-warn your provider.
      </p>

      <h2 id="monitoring">Monitoring</h2>
      <ul>
        <li>Track 429 count per minute.</li>
        <li>Alert when 429s exceed 1% of OTP traffic.</li>
        <li>Surface to user as &ldquo;please wait 30 seconds&rdquo;, not a generic error.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> exposes per-phone
        and per-account limits clearly in the dashboard.
      </p>
    </>
  ),
};
