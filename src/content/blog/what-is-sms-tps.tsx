import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-sms-tps',
  title: 'What is SMS TPS? Throughput-Per-Second Explained',
  description:
    'SMS TPS — transactions / messages per second — explained for Indian SMS workloads. How TPS is allocated, why it matters at sale-day, and how to size for OTP traffic.',
  category: 'business',
  keywords: [
    'what is sms tps',
    'sms throughput per second',
    'tps india sms',
    'sms api tps',
    'message tps',
  ],
  publishedAt: '2026-05-22',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'TPS — Definition' },
    { id: 'why', title: 'Why TPS Matters' },
    { id: 'india', title: 'TPS in Indian SMS' },
    { id: 'sizing', title: 'How to Size for OTP Traffic' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-sms-gateway',
    'what-is-sms-api',
    'phone-verification-at-scale-best-practices',
  ],
  faq: [
    {
      question: 'Is TPS the same as concurrency?',
      answer:
        'Related but not identical. TPS is throughput; concurrency is in-flight requests. A provider can have 100 TPS at 10 concurrent connections (each handling 10 messages per second) or any other split.',
    },
  ],
  content: (
    <>
      <p>
        SMS TPS — Transactions Per Second — is the rate at which a provider
        will accept your sends before throttling. For OTP-heavy apps with
        sale-day spikes, TPS is the number that decides whether your sale
        survives.
      </p>

      <h2 id="definition">TPS — Definition</h2>
      <p>
        Maximum number of SMS submissions accepted by the gateway per
        second per account or sender ID.
      </p>

      <h2 id="why">Why TPS Matters</h2>
      <ul>
        <li>Sale-day spikes can demand 50–200× normal TPS.</li>
        <li>Hitting TPS limit causes 429 throttling.</li>
        <li>Users see &ldquo;OTP failed&rdquo; at exactly the wrong moment.</li>
      </ul>

      <h2 id="india">TPS in Indian SMS</h2>
      <ul>
        <li>Operators allocate TPS per sender ID.</li>
        <li>Defaults are conservative (10–30 TPS).</li>
        <li>Higher allocations require operator approval.</li>
      </ul>

      <h2 id="sizing">How to Size for OTP Traffic</h2>
      <ul>
        <li>Average TPS = peak hourly OTPs / 3600.</li>
        <li>Plan for 5× the average for spike absorption.</li>
        <li>Test with sandbox load before launch day.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> auto-elastic TPS —
        no fixed cap as long as wallet is funded. Contact support before
        IPL-scale events for capacity planning.
      </p>
    </>
  ),
};
