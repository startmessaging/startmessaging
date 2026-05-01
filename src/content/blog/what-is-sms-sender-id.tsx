import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-sms-sender-id',
  title: 'What is an SMS Sender ID? (India 2026 Guide)',
  description:
    'SMS sender ID explained: the 6-character header that tells users who sent the SMS, India DLT registration rules, transactional vs promotional sender IDs, and how to pick a good one.',
  category: 'compliance',
  keywords: [
    'what is sender id',
    'sms sender id',
    'sender id india',
    'dlt sender id',
    'header registration',
    'tm vs ad sms',
    '6 character sender id',
  ],
  publishedAt: '2026-04-25',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'Sender ID — Definition' },
    { id: 'india-rules', title: 'India Sender ID Rules' },
    { id: 'categories', title: 'Sender ID Categories' },
    { id: 'choosing', title: 'How to Choose a Sender ID' },
    { id: 'registration', title: 'Registering a Sender ID' },
    { id: 'common-issues', title: 'Common Issues' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'sms-sender-id-india-otp-guide',
    'what-is-dlt-registration-india',
    'transactional-vs-promotional-sms-india',
    'dlt-template-approval-guide',
  ],
  faq: [
    {
      question: 'Why are sender IDs exactly 6 characters in India?',
      answer:
        'TRAI standardised on 6-character alphanumeric headers across all operators to give brand identity while keeping the SMS preamble short. The first 2 characters encode message category (TM, TX, JD, AD, etc.) and the last 4 are your brand abbreviation.',
    },
    {
      question: 'Can I use the same sender ID for OTP and marketing?',
      answer:
        'No. India requires separate sender IDs per category — typically TX or TM for transactional / OTP, AD for promotional. Mixing categories invites scrubbing and DND violations.',
    },
    {
      question: 'How long does sender ID approval take?',
      answer:
        'Operator-side approval is typically 1–3 working days after PE-ID and template are in place. The full pipeline including PE-ID and templates is usually 1–4 weeks.',
    },
  ],
  content: (
    <>
      <p>
        When an SMS arrives on an Indian phone reading{' '}
        <code>JD-STMSGE</code> at the top, that header is the sender ID. It is
        the user&rsquo;s primary visual signal of who sent the message and is
        deeply tied into India&rsquo;s SMS compliance system. For developers
        shipping OTP or transactional SMS, getting your sender ID set up
        correctly is non-negotiable.
      </p>
      <p>
        This guide covers <strong>what an SMS sender ID is</strong>, the rules
        India places on them, the categories you must choose between, the
        registration process, and the practical pitfalls.
      </p>

      <h2 id="definition">Sender ID — Definition</h2>
      <p>
        An <strong>SMS sender ID</strong> (also called the SMS header) is the
        short alphanumeric or numeric label that appears in place of a phone
        number when an SMS is delivered. Globally these are typically 11
        characters; India standardised at 6 alphanumeric characters under the
        DLT framework.
      </p>
      <p>
        The sender ID has two functions:
      </p>
      <ul>
        <li>
          <strong>Brand identification.</strong> Users see who sent the
          message at a glance.
        </li>
        <li>
          <strong>Compliance routing.</strong> The 2-character prefix encodes
          the message category, so operators can route and scrub correctly.
        </li>
      </ul>

      <h2 id="india-rules">India Sender ID Rules</h2>
      <ul>
        <li>
          Exactly 6 characters: 2-letter operator-prefix + 4-letter brand
          abbreviation. Example: <code>JM-YRBRND</code>.
        </li>
        <li>
          Each sender ID is registered against a specific Principal Entity
          (PE-ID) and category (transactional, promotional, service-implicit,
          service-explicit).
        </li>
        <li>
          A given brand needs separate sender IDs for separate categories.
        </li>
        <li>
          Reserved or potentially-misleading IDs (containing operator names,
          government acronyms, etc.) are rejected.
        </li>
      </ul>

      <h2 id="categories">Sender ID Categories</h2>
      <p>The two-letter operator prefix encodes the category:</p>
      <ul>
        <li>
          <strong>JD / JM / JT / JX</strong> (varies by operator) — Jio
          transactional / OTP.
        </li>
        <li>
          <strong>VK / VM / VG / VX</strong> — Vi (Vodafone Idea) categories.
        </li>
        <li>
          <strong>AX / AT / AM</strong> — Airtel categories.
        </li>
        <li>
          <strong>AD-</strong> prefix (legacy) — promotional.
        </li>
        <li>
          <strong>TX / TM</strong> — transactional / OTP.
        </li>
      </ul>
      <p>
        See{' '}
        <Link href="/blog/sms-sender-id-india-otp-guide">
          our complete sender ID guide for OTP
        </Link>{' '}
        for the full prefix matrix.
      </p>

      <h2 id="choosing">How to Choose a Sender ID</h2>
      <ul>
        <li>
          <strong>Brand recognisability.</strong> Use a 4-letter abbreviation
          your users will recognise. STMSGE for StartMessaging, AMZN for
          Amazon.
        </li>
        <li>
          <strong>Short and pronounceable.</strong> Easier to remember,
          easier to dispute support tickets about.
        </li>
        <li>
          <strong>Category-correct.</strong> OTP must use a transactional /
          service-implicit sender ID, not promotional.
        </li>
        <li>
          <strong>Avoid keyword traps.</strong> Sender IDs containing
          &ldquo;BANK&rdquo;, &ldquo;GOVT&rdquo;, &ldquo;RBI&rdquo; etc. are
          scrutinised.
        </li>
      </ul>

      <h2 id="registration">Registering a Sender ID</h2>
      <ol>
        <li>
          Register your business as a Principal Entity (PE-ID) on a DLT
          operator platform (Jio, Airtel, Vi, BSNL).
        </li>
        <li>
          Apply for the sender ID by category. You will need
          identity documents (GST, PAN, declaration letter on letterhead).
        </li>
        <li>
          Submit one or more message templates that will use the sender ID.
        </li>
        <li>
          Wait for approval — typically 1–3 working days per operator.
        </li>
        <li>
          Repeat the process for each operator network (Jio, Airtel, Vi, BSNL).
          Some aggregators handle the multi-operator paperwork.
        </li>
      </ol>
      <p>
        With{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> the entire pipeline
        is absorbed — we ship under our registered sender IDs so you can
        start sending OTPs the same day.
      </p>

      <h2 id="common-issues">Common Issues</h2>
      <ul>
        <li>
          <strong>Wrong category prefix.</strong> Most common cause of OTP
          scrubbing.
        </li>
        <li>
          <strong>Misleading abbreviation.</strong> Using letters that imply
          a different brand or government association.
        </li>
        <li>
          <strong>Mismatched PE-ID.</strong> The sender ID is bound to one
          PE-ID; using it under another registration is rejected.
        </li>
        <li>
          <strong>Operator coverage gaps.</strong> Sender ID approved on Jio
          but not Airtel — Airtel deliveries fail silently.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For most teams the answer is to outsource the sender ID problem
        entirely. <Link href="/dlt-free-otp">StartMessaging</Link> manages
        registered sender IDs across all operators on your behalf — your
        engineers just call <code>/otp/send</code>.
      </p>
    </>
  ),
};
