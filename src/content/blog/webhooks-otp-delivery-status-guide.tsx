import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'webhooks-otp-delivery-status-guide',
  title: 'Webhooks for OTP Delivery Status: Complete Guide',
  description:
    'How to implement and operate OTP delivery-status webhooks: signature verification, idempotent handlers, retries, dead-letter queues, and observability.',
  category: 'tutorials',
  keywords: [
    'otp webhook',
    'sms delivery status webhook',
    'dlr webhook',
    'webhook signature verification',
    'otp callback url',
  ],
  publishedAt: '2026-05-20',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Webhooks Beat Polling' },
    { id: 'shape', title: 'Webhook Shape' },
    { id: 'signature', title: 'Signature Verification' },
    { id: 'idempotency', title: 'Idempotent Handlers' },
    { id: 'retries', title: 'Provider Retries and DLQ' },
    { id: 'observability', title: 'Observability' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-delivery-status-polling-vs-webhooks',
    'idempotency-keys-otp',
    'otp-monitoring-slos-error-budgets',
  ],
  faq: [
    {
      question: 'Why does the same webhook fire twice sometimes?',
      answer:
        'At-least-once delivery. Provider retries on transient failure. Always design handlers to be idempotent on (provider, eventId).',
    },
  ],
  content: (
    <>
      <p>
        Polling DLR endpoints wastes both your CPU and the
        provider&rsquo;s. Webhooks push delivery status the moment it
        changes. This guide covers production-grade implementation.
      </p>

      <h2 id="why">Why Webhooks Beat Polling</h2>
      <ul>
        <li>Real-time, sub-second.</li>
        <li>Lower load on both sides.</li>
        <li>Cleaner architecture.</li>
      </ul>

      <h2 id="shape">Webhook Shape</h2>
      <pre>
        <code>{`POST /webhooks/sm
{
  "eventId": "evt_01HQ...",
  "type":    "otp.delivered",
  "createdAt": "2026-05-20T08:01:42Z",
  "data": {
    "requestId": "req_01HQ...",
    "phoneNumberHash": "...",
    "status": "delivered",
    "deliveredAt": "2026-05-20T08:01:39Z"
  }
}`}</code>
      </pre>

      <h2 id="signature">Signature Verification</h2>
      <pre>
        <code>{`function verify(headers: Headers, rawBody: string, secret: string) {
  const sig = headers.get('x-sm-signature')!;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}`}</code>
      </pre>
      <p>Always read the raw body before <code>express.json()</code> parses.</p>

      <h2 id="idempotency">Idempotent Handlers</h2>
      <pre>
        <code>{`async function onWebhook(event: Event) {
  const inserted = await db.insert('webhook_events').values({
    id: event.eventId, ...
  }).onConflictDoNothing();
  if (!inserted.rowCount) return; // already processed
  await processEvent(event);
}`}</code>
      </pre>

      <h2 id="retries">Provider Retries and DLQ</h2>
      <ul>
        <li>Most providers retry 5–10 times with backoff.</li>
        <li>Return 2xx fast — process async.</li>
        <li>Monitor unprocessed-event lag for DLQ.</li>
      </ul>

      <h2 id="observability">Observability</h2>
      <ul>
        <li>Webhook receipt count.</li>
        <li>Verification failure count (signal of misconfig or attack).</li>
        <li>Processing latency p95.</li>
        <li>Lag between OTP send and DLR.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Compare with polling at{' '}
        <Link href="/blog/otp-delivery-status-polling-vs-webhooks">
          our polling vs webhooks guide
        </Link>
        .
      </p>
    </>
  ),
};
