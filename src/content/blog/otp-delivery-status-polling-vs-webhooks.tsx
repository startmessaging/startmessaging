import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-delivery-status-polling-vs-webhooks',
  title: 'OTP Delivery Status: Polling APIs vs Webhooks in Production',
  description:
    'Operational patterns for tracking TRAI-compliant SMS delivery: polling vs webhooks for OTP, delivery receipts, and retries without duplicate sends.',
  category: 'tutorials',
  keywords: [
    'SMS delivery status API',
    'OTP delivery webhook',
    'poll SMS status',
    'message status callback',
    'SMS API idempotency',
    'delivery receipt OTP',
    'transactional SMS delivery status',
    'DLT SMS delivery receipt India',
    'TRAI SMS OTP tracking',
    'bulk SMS status API',
    'OTP SMS gateway India',
  ],
  publishedAt: '2026-04-16',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'not-deliverability', title: 'Different From Deliverability Guides' },
    { id: 'polling-model', title: 'Polling the Messages API' },
    { id: 'webhook-model', title: 'Webhooks and Event-Driven Flows' },
    { id: 'failure-handling', title: 'Linking Status to User Experience' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'idempotency-keys-otp',
    'otp-verification-flow',
    'migrate-sms-provider-checklist',
  ],
  faq: [
    {
      question: 'Does StartMessaging document message status today?',
      answer:
        'Integrations typically receive a request or message identifier after send and can query status as documented in the API reference. Treat the docs as source of truth for field names and polling cadence; this article is about architecture patterns, not a duplicate of endpoint documentation.',
    },
    {
      question: 'Will polling hit rate limits?',
      answer:
        'Aggressive polling per message can add load. Use exponential backoff, cap concurrent polls, and prefer batch or webhook models when your provider offers them for your scale tier.',
    },
  ],
  content: (
    <>
      <p>
        Our{' '}
        <Link
          href="/blog/otp-sms-deliverability-checklist"
          className="text-primary hover:underline"
        >
          deliverability checklist
        </Link>{' '}
        focuses on templates, numbers, and carriers. This post covers a separate
        topic: <strong>how your backend learns whether an OTP SMS was delivered</strong>{' '}
        and how to act on that signal—without re-explaining DLT or sender IDs.
      </p>

      <h2 id="not-deliverability">Different From Deliverability Guides</h2>
      <p>
        Deliverability asks &quot;will the message arrive?&quot; Status tracking
        asks &quot;did it arrive yet, and what state is it in?&quot; You need
        both for support tooling and for smart resend UX.
      </p>

      <h2 id="polling-model">Polling the Messages API</h2>
      <p>
        After you call send OTP, you receive an identifier. Polling means
        calling a status endpoint on a schedule until the terminal state
        (delivered, failed, expired) appears. Advantages: simple mental model,
        works behind strict firewalls. Disadvantages: latency to learn failure,
        wasted requests if you poll too often.
      </p>
      <p>
        Combine polling with{' '}
        <Link
          href="/blog/idempotency-keys-otp"
          className="text-primary hover:underline"
        >
          idempotency keys
        </Link>{' '}
        so a background job that rechecks status never accidentally triggers a
        second billable send.
      </p>

      <h2 id="webhook-model">Webhooks and Event-Driven Flows</h2>
      <p>
        Webhooks push status changes to your HTTPS endpoint. They reduce poll
        traffic and speed up analytics when your provider supports them. Costs:
        you must verify signatures, handle retries, and keep endpoints highly
        available. Many teams use a queue: webhook handler enqueues an event,
        workers update user-visible state.
      </p>

      <h2 id="failure-handling">Linking Status to User Experience</h2>
      <p>
        When status is <em>failed</em>, your UI should offer resend—not silent
        failure. When status is <em>delayed</em>, show honest timing copy. Align
        with the state machine described in{' '}
        <Link
          href="/blog/otp-verification-flow"
          className="text-primary hover:underline"
        >
          our OTP verification flow guide
        </Link>
        . If you switch providers, replay the same patterns using{' '}
        <Link
          href="/blog/migrate-sms-provider-checklist"
          className="text-primary hover:underline"
        >
          migration practices
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>See above.</p>
    </>
  ),
};
