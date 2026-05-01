import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-redis-vs-sql-storage',
  title: 'Storing OTPs: Redis vs SQL Database',
  description:
    'Trade-offs between Redis and SQL for OTP request data. Latency, durability, audit, retention, and a recommended hybrid pattern that uses both.',
  category: 'security',
  keywords: [
    'otp redis',
    'otp database',
    'redis vs sql otp',
    'otp ttl storage',
    'otp cache',
  ],
  publishedAt: '2026-05-18',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'redis', title: 'Redis Pros' },
    { id: 'sql', title: 'SQL Pros' },
    { id: 'hybrid', title: 'Recommended Hybrid' },
    { id: 'patterns', title: 'Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-database-schema-best-practices',
    'should-you-hash-otp-in-database',
    'otp-rate-limiting-guide',
  ],
  faq: [
    {
      question: 'Can I use Redis only?',
      answer:
        'Only for the active OTP window. For audit (regulator review, fraud reconstruction) you need durable SQL too. Hybrid is the answer.',
    },
  ],
  content: (
    <>
      <p>
        Redis and SQL serve different needs in OTP storage. Most production
        systems use both: Redis for the active window, SQL for the audit.
      </p>

      <h2 id="redis">Redis Pros</h2>
      <ul>
        <li>Sub-ms latency on read.</li>
        <li>Native TTL — auto-expire after 10 min.</li>
        <li>Atomic INCR for attempt counters.</li>
      </ul>

      <h2 id="sql">SQL Pros</h2>
      <ul>
        <li>Durable — survives Redis crash.</li>
        <li>Long-term retention for audit (7+ years).</li>
        <li>Joinable with user / session tables.</li>
      </ul>

      <h2 id="hybrid">Recommended Hybrid</h2>
      <ul>
        <li>Redis: active OTP request (10-min TTL), attempt counters, rate-limit buckets.</li>
        <li>SQL: audit row written on send and updated on verify.</li>
      </ul>

      <h2 id="patterns">Patterns</h2>
      <pre>
        <code>{`// On send:
await redis.set(\`otp:\${requestId}\`, JSON.stringify(meta), 'EX', 600);
await db.insert('otp_audit').values({ requestId, status: 'sent', ... });

// On verify:
const meta = await redis.get(\`otp:\${requestId}\`);
// ... verify with provider ...
await redis.del(\`otp:\${requestId}\`);
await db.update('otp_audit').set({ status: 'verified', verifiedAt: now }).where({ requestId });`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        See <Link href="/blog/otp-database-schema-best-practices">our schema
        guide</Link> for the SQL side.
      </p>
    </>
  ),
};
