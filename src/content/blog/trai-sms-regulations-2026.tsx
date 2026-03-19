import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'trai-sms-regulations-2026',
  title: 'TRAI SMS Regulations in 2026: What Changed',
  description:
    'Latest TRAI SMS regulations for 2026 covering DLT enforcement, scrubbing, content templates, promotional timing, and consent rules. What developers need to know.',
  category: 'compliance',
  keywords: [
    'TRAI SMS regulations 2026',
    'TRAI DLT rules',
    'SMS scrubbing India',
    'TRAI commercial communication',
    'TCCCPR 2026',
    'DLT enforcement',
    'promotional SMS timing',
    'SMS consent requirements India',
    'TRAI OTP regulations',
  ],
  publishedAt: '2026-02-05',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Regulatory Overview' },
    { id: 'dlt-enforcement-tightened', title: 'DLT Enforcement Tightened' },
    { id: 'scrubbing-changes', title: 'Scrubbing Changes' },
    { id: 'content-template-rules', title: 'Content Template Rules' },
    { id: 'promotional-sms-timing', title: 'Promotional SMS Timing' },
    { id: 'consent-requirements', title: 'Consent Requirements' },
    { id: 'penalties-and-enforcement', title: 'Penalties and Enforcement' },
    { id: 'what-developers-should-do', title: 'What Developers Should Do' },
    { id: 'faq', title: 'FAQ' },
  ],
  content: (
    <>
      <p>
        TRAI continues to tighten its grip on commercial SMS communication in India. Over the
        past year, several regulatory updates have changed how businesses and developers send SMS
        and OTPs. If you are building an application that sends messages to Indian phone numbers,
        these changes directly affect you.
      </p>
      <p>
        This article covers the most significant TRAI regulatory changes as of 2026, what they
        mean for your OTP and messaging workflows, and how to stay compliant without derailing
        your development timeline.
      </p>

      <h2 id="overview">Regulatory Overview</h2>
      <p>
        TRAI&apos;s regulation of commercial SMS in India is governed primarily by the Telecom
        Commercial Communications Customer Preference Regulations (TCCCPR), first introduced in
        2018 and amended multiple times since. The DLT (Distributed Ledger Technology) framework
        is the enforcement mechanism for these regulations.
      </p>
      <p>
        The regulatory framework has three core objectives:
      </p>
      <ul>
        <li>
          <strong>Protect consumers</strong> from unsolicited commercial communication (spam)
        </li>
        <li>
          <strong>Create accountability</strong> by making every SMS sender identifiable and
          traceable
        </li>
        <li>
          <strong>Enforce consent</strong> by ensuring recipients have opted in to receive
          commercial messages
        </li>
      </ul>
      <p>
        For a detailed primer on the DLT system itself, see our guide on{' '}
        <Link href="/blog/what-is-dlt-registration-india">
          what DLT registration is and how it works
        </Link>.
      </p>

      <h2 id="dlt-enforcement-tightened">DLT Enforcement Tightened</h2>
      <p>
        The most significant change in recent months has been stricter enforcement of DLT
        compliance. Telecom operators have upgraded their scrubbing infrastructure and are now
        blocking a higher percentage of non-compliant messages.
      </p>

      <h3>100% Scrubbing Enforcement</h3>
      <p>
        Previously, some operators had gaps in their scrubbing coverage, allowing a small
        percentage of unregistered messages to slip through. TRAI has pushed operators toward
        100% scrubbing enforcement, meaning every single commercial SMS is now checked against
        DLT records before delivery. Messages without matching templates are blocked without
        exception.
      </p>

      <h3>Real-Time Blocking</h3>
      <p>
        Operators have moved from batch-based scrubbing (where messages were checked in periodic
        batches) to real-time blocking. This means non-compliant messages are caught and blocked
        within milliseconds, before they reach the recipient&apos;s device. While this improves
        consumer protection, it also means there is zero tolerance for template mismatches or
        expired registrations.
      </p>

      <h3>Cross-Operator Verification</h3>
      <p>
        TRAI has improved cross-operator DLT verification. Previously, a template registered on
        one operator&apos;s DLT portal could sometimes face delivery issues on another
        operator&apos;s network. The updated framework ensures better synchronization across
        portals, so a template registered on Jio&apos;s Vilpower should work consistently on
        Airtel, Vi, and BSNL networks.
      </p>

      <h2 id="scrubbing-changes">Scrubbing Changes</h2>
      <p>
        The scrubbing process has become more sophisticated and stricter in several ways:
      </p>

      <h3>Stricter Template Matching</h3>
      <p>
        Scrubbing engines now use tighter matching algorithms. Previously, minor whitespace
        differences or punctuation variations might pass scrubbing. Now, the match must be
        near-exact. Extra spaces, missing periods, or capitalization changes between your
        template and actual message can trigger a block.
      </p>

      <h3>Variable Length Enforcement</h3>
      <p>
        Some operators have begun enforcing maximum variable lengths more strictly. If your
        template variable (<code>{'{#var#}'}</code>) is configured for a maximum of 30
        characters but your actual message inserts 35 characters, the message may be blocked.
        This particularly affects messages with long URLs or detailed order information in
        variable fields.
      </p>

      <h3>Header Validation</h3>
      <p>
        Sender header (sender ID) validation is now checked at the scrubbing stage along with
        template matching. Previously, header mismatches were handled separately. Now, a message
        must have both a valid header and a matching template from the same registered entity to
        pass scrubbing.
      </p>

      <h2 id="content-template-rules">Content Template Rules</h2>
      <p>
        TRAI and the DLT portals have updated content rules for templates:
      </p>
      <ul>
        <li>
          <strong>URL restrictions expanded</strong> &mdash; beyond URL shorteners, some portals
          now flag templates with URLs from free hosting providers or unverified domains.
        </li>
        <li>
          <strong>Mandatory opt-out for service messages</strong> &mdash; service implicit and
          explicit templates now require opt-out instructions in certain categories.
        </li>
        <li>
          <strong>Regional language templates</strong> &mdash; TRAI has encouraged operators to
          improve support for templates in Hindi and other regional languages, with better Unicode
          handling.
        </li>
        <li>
          <strong>Template expiry awareness</strong> &mdash; while templates do not expire
          automatically, TRAI has asked operators to flag templates that have not been used in
          over 12 months for review.
        </li>
      </ul>
      <p>
        For guidance on writing templates that pass approval, see our{' '}
        <Link href="/blog/dlt-template-approval-guide">DLT template approval guide</Link>.
      </p>

      <h2 id="promotional-sms-timing">Promotional SMS Timing</h2>
      <p>
        The timing restrictions for promotional SMS remain in effect and have been more strictly
        enforced:
      </p>
      <ul>
        <li>
          <strong>Delivery window</strong>: Promotional SMS can only be delivered between{' '}
          <strong>9:00 AM and 9:00 PM</strong> Indian Standard Time.
        </li>
        <li>
          <strong>Weekend/holiday enforcement</strong>: The same timing restrictions apply on
          weekends and national holidays. There is no relaxation.
        </li>
        <li>
          <strong>Queue behavior</strong>: Messages submitted outside the delivery window are
          queued and delivered at 9:00 AM the next day. Some operators discard queued messages
          older than 24 hours.
        </li>
      </ul>
      <p>
        Importantly, <strong>transactional and OTP messages are not subject to timing
        restrictions</strong>. They can be delivered 24/7, including to DND-registered numbers.
        This is one of the key reasons to correctly categorize your messages. Learn more about the
        differences in our{' '}
        <Link href="/blog/transactional-vs-promotional-sms-india">
          transactional vs promotional SMS guide
        </Link>.
      </p>

      <h2 id="consent-requirements">Consent Requirements</h2>
      <p>
        TRAI has strengthened consent requirements, which now intersect with India&apos;s Digital
        Personal Data Protection (DPDP) Act:
      </p>

      <h3>Transactional Messages</h3>
      <p>
        Transactional messages (including OTPs) are considered necessary for service delivery and
        do not require explicit marketing consent. However, the recipient must have an existing
        relationship with the sender. For OTPs, the act of requesting an OTP (entering a phone
        number on your login/signup page) constitutes implied consent.
      </p>

      <h3>Promotional Messages</h3>
      <p>
        Promotional messages require explicit opt-in consent. TRAI now requires that businesses
        maintain auditable records of consent, including:
      </p>
      <ul>
        <li>When consent was obtained</li>
        <li>How consent was obtained (form, checkbox, verbal)</li>
        <li>What the consumer consented to receive</li>
        <li>Proof that the consent was freely given</li>
      </ul>

      <h3>Consent Revocation</h3>
      <p>
        Consumers must be able to revoke consent at any time. TRAI mandates that every
        promotional and service message includes opt-out instructions. Businesses must process
        opt-out requests within 7 days.
      </p>
      <p>
        For more on how data privacy regulations intersect with OTP delivery, read our article on{' '}
        <Link href="/blog/otp-data-privacy-india">OTP data privacy and the DPDP Act</Link>.
      </p>

      <h2 id="penalties-and-enforcement">Penalties and Enforcement</h2>
      <p>
        TRAI has increased the penalties for non-compliance with commercial communication
        regulations:
      </p>
      <ul>
        <li>
          <strong>For telecom operators</strong> &mdash; operators that fail to block
          non-compliant messages can face penalties of up to Rs 1,000 per undelivered scrubbing
          check. This motivates operators to be aggressive with blocking.
        </li>
        <li>
          <strong>For senders</strong> &mdash; businesses caught sending non-compliant messages
          risk having their DLT registration suspended or revoked. Repeat offenders may be
          blacklisted across all operators.
        </li>
        <li>
          <strong>For aggregators</strong> &mdash; SMS aggregators and API providers face
          penalties if they facilitate delivery of unregistered messages. This has led to stricter
          compliance checks by aggregators themselves.
        </li>
      </ul>

      <h2 id="what-developers-should-do">What Developers Should Do</h2>
      <p>
        Given these regulatory changes, here is a practical checklist for developers:
      </p>
      <ol>
        <li>
          <strong>Audit your templates</strong> &mdash; review all registered templates for
          accuracy. Ensure the actual messages your application sends match templates exactly,
          including whitespace and punctuation.
        </li>
        <li>
          <strong>Verify variable lengths</strong> &mdash; check that dynamic content in your
          messages stays within the variable character limits configured in your templates.
        </li>
        <li>
          <strong>Categorize correctly</strong> &mdash; ensure OTPs and transactional messages
          are registered under the correct category. Miscategorization can lead to blocking.
        </li>
        <li>
          <strong>Implement consent tracking</strong> &mdash; if you send any promotional or
          service messages, implement proper consent recording and opt-out handling.
        </li>
        <li>
          <strong>Monitor delivery rates</strong> &mdash; watch for sudden drops in delivery
          rates, which may indicate scrubbing is blocking your messages.
        </li>
        <li>
          <strong>Or use StartMessaging</strong> &mdash; let us handle all compliance complexity
          for you.
        </li>
      </ol>
      <p>
        <Link href="/features">StartMessaging</Link> maintains full TRAI compliance
        automatically. Our pre-approved templates, registered entities, and compliant
        infrastructure mean you never have to worry about regulatory changes. Every OTP sent
        through our <Link href="/otp-api">API</Link> at{' '}
        <strong>Rs 0.25 per message</strong> is fully DLT-compliant.
      </p>
      <p>
        Ready to stop worrying about TRAI compliance?{' '}
        <Link href="/dlt-free-otp">Send OTPs without DLT registration</Link> or{' '}
        <Link href="/send-otp-without-dlt">read our integration guide</Link>. See our{' '}
        <Link href="/pricing">pricing</Link> for volume options.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
    </>
  ),
  relatedSlugs: ['what-is-dlt-registration-india', 'otp-data-privacy-india'],
  faq: [
    {
      question: 'Do TRAI timing restrictions apply to OTPs?',
      answer:
        'No. OTPs and transactional messages are exempt from the 9 AM to 9 PM delivery window restriction. They can be sent and delivered 24/7, including to DND-registered numbers. Only promotional messages are subject to timing restrictions.',
    },
    {
      question: 'What happens if my DLT template does not match the actual SMS?',
      answer:
        'The message will be blocked by the telecom operator\'s scrubbing engine before it reaches the recipient. This happens in real time, and the sender typically receives a delivery failure report. Even minor differences in whitespace or punctuation can trigger a block.',
    },
    {
      question: 'Has TRAI changed the DLT registration process in 2026?',
      answer:
        'The registration process itself remains largely the same: entity registration, header registration, and template approval. The key changes are in enforcement, with stricter scrubbing, tighter template matching, and increased penalties for non-compliance. Using StartMessaging means you avoid dealing with these processes entirely.',
    },
    {
      question: 'Do I need to update my existing DLT templates for 2026 compliance?',
      answer:
        'Existing approved templates remain valid. However, you should audit them to ensure your actual messages match exactly, as stricter scrubbing may now block messages that previously passed with minor mismatches. If you use StartMessaging, template compliance is handled for you automatically.',
    },
  ],
};
