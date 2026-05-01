import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-outage-postmortem-template',
  title: 'OTP Outage Postmortem Template (2026)',
  description:
    'A ready-to-use postmortem template for OTP outages: timeline, root cause categories, customer impact metrics, action items, and a worked example.',
  category: 'security',
  keywords: [
    'otp postmortem',
    'sms outage postmortem',
    'otp incident report',
    'incident review template',
    'otp downtime analysis',
  ],
  publishedAt: '2026-05-21',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'template', title: 'The Template' },
    { id: 'timeline', title: 'Timeline' },
    { id: 'root-cause', title: 'Root-Cause Categories' },
    { id: 'impact', title: 'Customer Impact Metrics' },
    { id: 'actions', title: 'Action Items' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-monitoring-slos-error-budgets',
    'circuit-breaker-pattern-otp-services',
    'otp-delivery-delay-fix',
  ],
  faq: [
    {
      question: 'Should I share the postmortem with users?',
      answer:
        'For mid- to high-severity incidents, yes — a public postmortem builds trust. Redact internal account names but share the timeline and fix.',
    },
  ],
  content: (
    <>
      <p>
        After every meaningful OTP outage, a written postmortem is the
        cheapest way to harden the system. This template captures the
        common shape.
      </p>

      <h2 id="template">The Template</h2>
      <ul>
        <li>Title — date and severity.</li>
        <li>TL;DR — 2 sentences.</li>
        <li>Timeline — every event with timestamp.</li>
        <li>Root cause — narrative with technical detail.</li>
        <li>Customer impact — numbers, not adjectives.</li>
        <li>What went well, what didn&rsquo;t, where we got lucky.</li>
        <li>Action items with owner + due date.</li>
      </ul>

      <h2 id="timeline">Timeline</h2>
      <pre>
        <code>{`13:42 - First failed OTP send observed.
13:44 - Pager fires.
13:45 - On-call ack.
13:48 - Identified: provider primary route degraded.
13:50 - Manual failover to secondary.
13:52 - Recovery confirmed.`}</code>
      </pre>

      <h2 id="root-cause">Root-Cause Categories</h2>
      <ul>
        <li>Provider outage.</li>
        <li>DLT scrubbing change.</li>
        <li>Sender ID expiry.</li>
        <li>Internal code bug.</li>
        <li>Config rollout error.</li>
        <li>Capacity / cost cap hit.</li>
      </ul>

      <h2 id="impact">Customer Impact Metrics</h2>
      <ul>
        <li>OTP success rate before / during / after.</li>
        <li>Affected user count.</li>
        <li>Lost sign-up funnel events.</li>
        <li>Support tickets opened.</li>
      </ul>

      <h2 id="actions">Action Items</h2>
      <ul>
        <li>Add automated failover.</li>
        <li>Add alert on per-carrier DLR drop.</li>
        <li>Schedule renewal calendar for sender IDs.</li>
        <li>Run game-day next quarter.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Combine with the SLO framework in{' '}
        <Link href="/blog/otp-monitoring-slos-error-budgets">
          our SLO guide
        </Link>{' '}
        for an error-budget-aware retro.
      </p>
    </>
  ),
};
