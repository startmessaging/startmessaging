import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'dlt-template-rejected-fix',
  title: 'DLT Template Rejected? Common Reasons and Fixes',
  description:
    'When your DLT SMS template is rejected — the precise causes Indian operators flag, how to fix variable markers, category mismatches, and language issues, and how to skip DLT entirely.',
  category: 'compliance',
  keywords: [
    'dlt template rejected',
    'jio template rejection',
    'airtel template approval',
    'dlt approval failed',
    'fix dlt template',
  ],
  publishedAt: '2026-05-15',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'causes', title: 'Top Rejection Causes' },
    { id: 'variables', title: 'Variable Marker Issues' },
    { id: 'category', title: 'Category Mismatch' },
    { id: 'wording', title: 'Wording / Keyword Issues' },
    { id: 'fix', title: 'How to Resubmit Successfully' },
    { id: 'skip', title: 'How to Skip DLT' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'dlt-template-approval-guide',
    'dlt-template-variables-rules-india',
    'what-is-sms-sender-id',
    'dlt-registration-step-by-step-india',
  ],
  faq: [
    {
      question: 'Can I appeal a DLT template rejection?',
      answer:
        'Each operator portal has a &ldquo;modify and resubmit&rdquo; button — that is your path. Direct appeal beyond resubmission is rare and slow.',
    },
  ],
  content: (
    <>
      <p>
        DLT template rejection is the #1 reason Indian devs get blocked on
        a launch. Most rejections trace to one of four predictable causes —
        and almost all are fixable on resubmit.
      </p>

      <h2 id="causes">Top Rejection Causes</h2>
      <ol>
        <li>Wrong variable markers.</li>
        <li>Category mismatch (transactional template marked promotional).</li>
        <li>Banned keywords (operator-name impersonation, etc.).</li>
        <li>Body deviates from template format.</li>
      </ol>

      <h2 id="variables">Variable Marker Issues</h2>
      <ul>
        <li>Use <code>{'{#var#}'}</code> exactly, no spaces.</li>
        <li>Variables must be sequential — first <code>{'{#var#}'}</code>, then second, etc.</li>
        <li>Don&rsquo;t embed variables inside other variables.</li>
      </ul>

      <h2 id="category">Category Mismatch</h2>
      <p>
        OTP template under promotional category? Operator rejects it. Make
        sure category matches use case. See{' '}
        <Link href="/blog/transactional-vs-promotional-sms-india">
          transactional vs promotional
        </Link>
        .
      </p>

      <h2 id="wording">Wording / Keyword Issues</h2>
      <ul>
        <li>Avoid &ldquo;RBI&rdquo;, &ldquo;BANK&rdquo; without proper authorisation.</li>
        <li>No claims of guaranteed returns.</li>
        <li>No ALL-CAPS spam wording.</li>
      </ul>

      <h2 id="fix">How to Resubmit Successfully</h2>
      <ol>
        <li>Read the rejection reason carefully.</li>
        <li>Fix exactly that — don&rsquo;t over-engineer the template.</li>
        <li>Resubmit through the same portal.</li>
        <li>Repeat across all operator portals if needed.</li>
      </ol>

      <h2 id="skip">How to Skip DLT</h2>
      <p>
        Use a DLT-free OTP API. <Link href="/dlt-free-otp">StartMessaging</Link>{' '}
        absorbs template approvals on your behalf — no rejection, no
        resubmission cycle.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        DLT is solvable but tedious; outsourcing it to a managed provider
        is the fastest path for most teams.
      </p>
    </>
  ),
};
