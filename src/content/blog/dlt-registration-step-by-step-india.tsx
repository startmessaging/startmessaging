import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'dlt-registration-step-by-step-india',
  title: 'DLT Registration in India: Step-by-Step Guide (2026)',
  description:
    'Step-by-step DLT registration walkthrough for Indian businesses: PE-ID, sender-ID, template approval, operator portals, costs, timelines and how to skip it entirely.',
  category: 'compliance',
  keywords: [
    'dlt registration step by step',
    'how to register on dlt india',
    'pe id registration',
    'jio dlt portal',
    'airtel dlt registration',
    'dlt approval process',
  ],
  publishedAt: '2026-05-04',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'who-needs', title: 'Who Needs DLT Registration' },
    { id: 'documents', title: 'Documents Required' },
    { id: 'pe-id', title: 'Step 1 — PE-ID Registration' },
    { id: 'sender-id', title: 'Step 2 — Sender ID' },
    { id: 'template', title: 'Step 3 — Template Approval' },
    { id: 'multi-operator', title: 'Step 4 — Multi-Operator' },
    { id: 'cost-time', title: 'Costs and Timelines' },
    { id: 'skip', title: 'How to Skip DLT Entirely' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-dlt-registration-india',
    'dlt-template-approval-guide',
    'dlt-template-variables-rules-india',
    'sms-sender-id-india-otp-guide',
    'peid-registration-india',
  ],
  faq: [
    {
      question: 'Can I do DLT registration in one day?',
      answer:
        'Realistically, 7–28 days for first PE-ID + sender ID + template across all four operators. Some self-service portals are faster than others; expect Airtel and Jio to be quickest, BSNL slowest.',
    },
    {
      question: 'Is DLT registration free?',
      answer:
        'Each operator portal charges Rs 5,000 one-time + Rs 1,000–2,000 / year. Multiplied across operators, the first-year cost is typically Rs 25,000–35,000 plus engineering time.',
    },
    {
      question: 'Do I need separate templates for English and Hindi?',
      answer:
        'Yes. Each language version of an OTP template needs separate approval. Many teams batch-submit five core templates in English + Hindi to cover most flows.',
    },
  ],
  content: (
    <>
      <p>
        DLT (Distributed Ledger Technology) registration is India&rsquo;s
        compliance scaffolding for commercial SMS. Every business that sends
        bulk SMS — including OTPs — must register on the operator-run DLT
        portals, declare their sender IDs, and pre-approve every distinct
        message body. This guide walks through the end-to-end process.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Register your business as a Principal Entity (PE-ID).</li>
        <li>Apply for sender IDs (headers).</li>
        <li>Submit message templates for approval.</li>
        <li>Repeat across all four operator portals (Jio, Airtel, Vi, BSNL).</li>
        <li>Maintain — renew annually, refresh templates as messages change.</li>
      </ol>

      <h2 id="who-needs">Who Needs DLT Registration</h2>
      <p>
        Any entity sending commercial SMS to Indian numbers, including:
      </p>
      <ul>
        <li>OTP / transactional SMS senders.</li>
        <li>Promotional SMS senders.</li>
        <li>Service-explicit notifications.</li>
        <li>Bulk-SMS resellers and aggregators.</li>
      </ul>
      <p>
        Personal SMS via consumer phones, A2P testing under throttle, and
        provider-managed delivery (where the provider owns the registration)
        are exempt.
      </p>

      <h2 id="documents">Documents Required</h2>
      <ul>
        <li>PAN of the business.</li>
        <li>GST registration.</li>
        <li>Business incorporation certificate / partnership deed.</li>
        <li>Authorisation letter on letterhead.</li>
        <li>Contact-person ID (Aadhaar / PAN).</li>
        <li>Bank statement of business account.</li>
      </ul>

      <h2 id="pe-id">Step 1 — PE-ID Registration</h2>
      <p>
        Pick one operator portal as your primary (most teams start with Jio
        or Airtel). Sign up, upload documents, pay the registration fee, wait
        for approval (typically 3–7 working days). PE-ID is your principal
        entity identifier — it is portable across operators but each operator
        recognises it only after their own approval.
      </p>

      <h2 id="sender-id">Step 2 — Sender ID</h2>
      <p>
        Apply for a 6-character alphanumeric sender ID with the correct
        operator-prefix for transactional / OTP. See our{' '}
        <Link href="/blog/what-is-sms-sender-id">sender ID guide</Link>.
      </p>

      <h2 id="template">Step 3 — Template Approval</h2>
      <p>
        Submit each distinct message body. Variables must use{' '}
        <code>{'{#var#}'}</code> markers. See{' '}
        <Link href="/blog/dlt-template-approval-guide">our template guide</Link>{' '}
        and{' '}
        <Link href="/blog/dlt-template-variables-rules-india">
          variable rules
        </Link>
        .
      </p>

      <h2 id="multi-operator">Step 4 — Multi-Operator</h2>
      <p>
        Repeat the PE-ID + sender ID + template flow on each operator portal:
        Jio, Airtel, Vi, BSNL. Expect 1–4 weeks total for first complete
        approval. Some aggregators consolidate the multi-operator paperwork.
      </p>

      <h2 id="cost-time">Costs and Timelines</h2>
      <ul>
        <li>Per-operator: Rs 5,000 one-time + Rs 1,000–2,000 / year.</li>
        <li>Total first-year: Rs 25,000–35,000.</li>
        <li>Initial approval: 7–28 days.</li>
        <li>Per-template approval: 1–7 working days each.</li>
      </ul>

      <h2 id="skip">How to Skip DLT Entirely</h2>
      <p>
        Use a DLT-free OTP API. The provider runs the entire DLT layer — PE-ID,
        sender IDs, templates — under their own registration. You call{' '}
        <code>/otp/send</code> and ship the same day.{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> works exactly this
        way.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        DLT exists for valid compliance reasons but does not have to be your
        problem. Pick a provider that absorbs it and spend your engineering
        time on your actual product.
      </p>
    </>
  ),
};
