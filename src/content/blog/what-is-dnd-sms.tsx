import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-dnd-sms',
  title: 'What is DND in SMS? India’s Do-Not-Disturb Register Explained',
  description:
    'DND in SMS explained for developers: India’s national Do-Not-Disturb register, the categories, how DND interacts with OTP / transactional SMS, and what happens when you send to a DND number.',
  category: 'compliance',
  keywords: [
    'what is dnd',
    'dnd sms',
    'dnd india',
    'dnd register',
    'national do not disturb',
    'dnd otp india',
    'dnd transactional',
  ],
  publishedAt: '2026-04-25',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'DND — Definition' },
    { id: 'categories', title: 'DND Categories' },
    { id: 'otp-vs-promo', title: 'How DND Affects OTP vs Promotional SMS' },
    { id: 'check-dnd', title: 'Checking DND Status' },
    { id: 'penalties', title: 'Penalties for Violating DND' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'transactional-vs-promotional-sms-india',
    'what-is-dlt-registration-india',
    'trai-message-scrubbing-india',
    'what-is-sms-gateway',
  ],
  faq: [
    {
      question: 'Does DND block OTP SMS?',
      answer:
        'No. OTP SMS — registered as service-implicit / transactional under the DLT framework — is exempt from DND. Customers cannot opt out of OTPs sent for transactions they themselves initiated.',
    },
    {
      question: 'Can I send promotional SMS to a DND number?',
      answer:
        'Generally no. The recipient must have explicitly opted in (consent registered against their number) or fall under one of the narrow exceptions. Sending promotional SMS to a fully-DND-active number is a TRAI violation.',
    },
    {
      question: 'How long does DND registration take to activate?',
      answer:
        'TRAI specifies a maximum of 7 working days from the user’s opt-in for DND status to be enforced across the network.',
    },
  ],
  content: (
    <>
      <p>
        Anyone who has registered for DND in India knows it as &ldquo;the
        thing that makes loan-pitching SMS stop arriving.&rdquo; For
        developers shipping SMS-driven products, DND is a piece of telecom
        regulation that interacts in subtle ways with OTP, transactional and
        promotional SMS — and getting it wrong invites TRAI penalties.
      </p>
      <p>
        This explainer covers <strong>what DND is</strong>, the categories,
        how it overlaps (or doesn&rsquo;t) with OTP delivery, how to check a
        number&rsquo;s DND state, and the practical playbook for staying
        compliant.
      </p>

      <h2 id="definition">DND — Definition</h2>
      <p>
        <strong>DND (Do Not Disturb)</strong> in the Indian telecom context
        refers to the National Customer Preference Register run under TRAI&rsquo;s
        TCCCPR (Telecom Commercial Communications Customer Preference
        Regulations) framework. Subscribers can register their phone number to
        block specific categories of unsolicited commercial communication.
      </p>
      <p>
        DND is enforced at the network level: telcos check the DND state of
        every recipient before delivering commercial messages. If the message
        category is blocked for that subscriber, the message is silently
        dropped (scrubbed).
      </p>

      <h2 id="categories">DND Categories</h2>
      <p>
        Subscribers can choose to block messages by category, allowing some
        types while blocking others. The standard categories:
      </p>
      <ul>
        <li>1. Banking / Insurance / Financial products</li>
        <li>2. Real estate</li>
        <li>3. Education</li>
        <li>4. Health</li>
        <li>5. Consumer goods and automobiles</li>
        <li>6. Communication / Broadcasting / Entertainment / IT</li>
        <li>7. Tourism and leisure</li>
        <li>8. Food and beverages</li>
      </ul>
      <p>
        Subscribers can also choose &ldquo;Block all promotional&rdquo; (full DND).
        Service / transactional categories are governed separately and cannot
        be blocked unilaterally by subscribers.
      </p>

      <h2 id="otp-vs-promo">How DND Affects OTP vs Promotional SMS</h2>
      <ul>
        <li>
          <strong>OTP / transactional SMS</strong> — registered under the DLT
          framework as service-implicit or transactional, these are{' '}
          <em>not</em> blocked by DND. The user initiated the transaction;
          the OTP is functional, not promotional.
        </li>
        <li>
          <strong>Service-explicit SMS</strong> — promotional content sent to
          users who have explicitly opted in. Subject to the granular DND
          category preferences.
        </li>
        <li>
          <strong>Promotional SMS</strong> — generic marketing. Always
          subject to full DND.
        </li>
      </ul>
      <p>
        See our breakdown of{' '}
        <Link href="/blog/transactional-vs-promotional-sms-india">
          transactional vs promotional SMS in India
        </Link>{' '}
        for the registration details.
      </p>

      <h2 id="check-dnd">Checking DND Status</h2>
      <p>
        Apps almost never need to query DND state directly because the
        operator does the check at delivery time. But if you must:
      </p>
      <ul>
        <li>
          TRAI publishes a national DND check tool at{' '}
          <a
            href="https://nccpregistry.gov.in"
            target="_blank"
            rel="noreferrer noopener"
          >
            nccpregistry.gov.in
          </a>
          .
        </li>
        <li>
          Some SMS providers expose a check-DND API for bulk validation.
        </li>
        <li>
          For OTP and transactional volume, just rely on the operator-side
          enforcement and monitor delivery rates per provider.
        </li>
      </ul>

      <h2 id="penalties">Penalties for Violating DND</h2>
      <p>
        TRAI has published a sliding-scale penalty matrix:
      </p>
      <ul>
        <li>First offence: warning + Rs 1,000 fine.</li>
        <li>Second offence: Rs 5,000.</li>
        <li>Third offence: Rs 10,000.</li>
        <li>
          Repeat / large-scale violations: telecom resource (sender ID, PE-ID)
          can be deactivated, blacklisting the brand from sending bulk SMS.
        </li>
      </ul>

      <h2 id="best-practices">Best Practices</h2>
      <ul>
        <li>
          <strong>Categorise messages correctly.</strong> Wrong category =
          scrubbing or DND violation. OTPs are service-implicit /
          transactional; never promotional.
        </li>
        <li>
          <strong>Capture explicit consent.</strong> For service-explicit
          SMS, store opt-in date, source, and IP address.
        </li>
        <li>
          <strong>Honour opt-out requests promptly.</strong> Process within 7
          working days max.
        </li>
        <li>
          <strong>Use a managed provider.</strong> Most modern{' '}
          <Link href="/blog/best-otp-api-india">OTP APIs in India</Link>{' '}
          handle DND classification automatically. With{' '}
          <Link href="/dlt-free-otp">StartMessaging</Link> you do not have to
          touch any of it for OTP traffic.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        DND is mostly invisible to OTP-focused products because OTP traffic
        is exempt. If you also send promotional SMS, build a clean
        consent-management workflow up front; retrofitting it under
        regulator pressure is expensive.
      </p>
    </>
  ),
};
