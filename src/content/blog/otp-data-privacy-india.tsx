import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-data-privacy-india',
  title: 'OTP Data Privacy: DPDP Act Compliance',
  description:
    'How India\'s Digital Personal Data Protection Act affects OTP and SMS implementations. Phone numbers as personal data, consent, retention, and compliance checklist.',
  category: 'compliance',
  keywords: [
    'DPDP Act OTP',
    'data privacy OTP India',
    'Digital Personal Data Protection Act',
    'phone number personal data India',
    'OTP consent requirements',
    'data retention OTP',
    'DPDP compliance SMS',
    'cross-border data transfer India',
    'OTP data protection',
  ],
  publishedAt: '2026-02-09',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'dpdp-act-overview', title: 'DPDP Act Overview' },
    { id: 'phone-numbers-as-personal-data', title: 'Phone Numbers as Personal Data' },
    { id: 'consent-for-otp', title: 'Consent for OTP Delivery' },
    { id: 'data-retention', title: 'Data Retention Requirements' },
    { id: 'cross-border-transfer', title: 'Cross-Border Data Transfer' },
    { id: 'compliance-checklist', title: 'Compliance Checklist' },
    { id: 'startmessaging-and-dpdp', title: 'StartMessaging and DPDP Compliance' },
    { id: 'faq', title: 'FAQ' },
  ],
  content: (
    <>
      <p>
        India&apos;s Digital Personal Data Protection (DPDP) Act has changed how businesses must
        handle personal data, and that includes phone numbers used for OTP verification. If your
        application sends OTPs to Indian phone numbers, you are processing personal data under
        the DPDP Act, and you have specific obligations.
      </p>
      <p>
        This guide explains what the DPDP Act means for developers implementing OTP-based
        verification, what you need to do to stay compliant, and how choosing the right OTP
        provider can simplify your compliance posture.
      </p>

      <h2 id="dpdp-act-overview">DPDP Act Overview</h2>
      <p>
        The Digital Personal Data Protection Act, 2023, is India&apos;s comprehensive data
        protection legislation. It governs the processing of digital personal data within India
        and applies to any entity that collects, stores, or processes personal data of
        individuals in India, regardless of where the entity is incorporated.
      </p>
      <p>Key concepts defined by the Act:</p>
      <ul>
        <li>
          <strong>Data Principal</strong> &mdash; the individual whose personal data is being
          processed (your end user)
        </li>
        <li>
          <strong>Data Fiduciary</strong> &mdash; the entity that determines the purpose and
          means of processing (your company)
        </li>
        <li>
          <strong>Data Processor</strong> &mdash; an entity that processes data on behalf of the
          Data Fiduciary (your OTP provider, like StartMessaging)
        </li>
        <li>
          <strong>Personal Data</strong> &mdash; any data about an individual who is identifiable
          by or in relation to such data
        </li>
        <li>
          <strong>Consent</strong> &mdash; free, specific, informed, unconditional, and
          unambiguous indication of the Data Principal&apos;s wishes
        </li>
      </ul>
      <p>
        The DPDP Act works alongside TRAI&apos;s existing telecom regulations. While TRAI
        governs the mechanics of SMS delivery (DLT, templates, scrubbing), the DPDP Act governs
        how you handle the personal data involved in that process. For current TRAI rules, see
        our article on{' '}
        <Link href="/blog/trai-sms-regulations-2026">TRAI SMS regulations in 2026</Link>.
      </p>

      <h2 id="phone-numbers-as-personal-data">Phone Numbers as Personal Data</h2>
      <p>
        Under the DPDP Act, phone numbers are classified as personal data. This is unambiguous:
        a mobile number can identify an individual, making it personal data by definition. When
        your application collects a phone number for OTP verification, you are collecting
        personal data.
      </p>
      <p>This classification has several implications:</p>
      <ul>
        <li>
          <strong>Lawful purpose required</strong> &mdash; you must have a legitimate reason to
          collect and process the phone number. OTP verification for authentication is a valid
          lawful purpose.
        </li>
        <li>
          <strong>Notice obligation</strong> &mdash; you must inform the user about what data you
          collect, why you collect it, and how you process it, typically through a privacy policy.
        </li>
        <li>
          <strong>Purpose limitation</strong> &mdash; if you collect a phone number for OTP
          verification, you cannot use it for marketing without separate consent.
        </li>
        <li>
          <strong>Storage limitation</strong> &mdash; you must not retain the phone number
          longer than necessary for the purpose it was collected.
        </li>
        <li>
          <strong>Security safeguards</strong> &mdash; you must implement reasonable security
          measures to protect stored phone numbers from breaches.
        </li>
      </ul>

      <h3>OTP Codes Themselves</h3>
      <p>
        While the DPDP Act does not specifically address OTP codes, best practice is to treat
        them with the same care as personal data. An OTP code, combined with a phone number,
        provides access to an account. OTP codes should be hashed (never stored in plaintext),
        time-limited, and deleted after use or expiry.
      </p>
      <p>
        StartMessaging follows this principle by bcrypt-hashing all OTP codes server-side. The
        plaintext OTP exists only during the brief moment it is sent via SMS and never persists
        in our systems.
      </p>

      <h2 id="consent-for-otp">Consent for OTP Delivery</h2>
      <p>
        Consent under the DPDP Act must be free, specific, informed, and unambiguous. For OTP
        delivery, the consent model depends on the context:
      </p>

      <h3>Registration and Login OTPs</h3>
      <p>
        When a user enters their phone number on your signup or login page and clicks &quot;Send
        OTP,&quot; they are providing consent to receive an OTP message. This is generally
        considered valid consent under the DPDP Act because:
      </p>
      <ul>
        <li>The user initiated the action voluntarily (free)</li>
        <li>The purpose is clear &mdash; phone verification (specific)</li>
        <li>The user knows an SMS will be sent (informed)</li>
        <li>The user clicked a button to trigger it (unambiguous)</li>
      </ul>

      <h3>Transaction OTPs</h3>
      <p>
        OTPs sent for transaction verification (payment confirmation, bank transfers) are
        generally covered under the &quot;legitimate use&quot; provisions. When a user initiates
        a transaction, the OTP is part of the security mechanism they implicitly consent to by
        using the service.
      </p>

      <h3>What Requires Separate Consent</h3>
      <p>
        If you want to use the phone number collected for OTP verification to send marketing
        messages, promotional offers, or other non-transactional communications, you need
        separate, explicit consent. This consent must be:
      </p>
      <ul>
        <li>Obtained through a separate action (not bundled with OTP consent)</li>
        <li>Clearly documented and stored</li>
        <li>Easy to withdraw at any time</li>
      </ul>
      <p>
        This is also where TRAI&apos;s regulations intersect: promotional messages require DLT
        compliance and must respect DND preferences. See our{' '}
        <Link href="/blog/transactional-vs-promotional-sms-india">
          transactional vs promotional SMS guide
        </Link>{' '}
        for more details on these categories.
      </p>

      <h2 id="data-retention">Data Retention Requirements</h2>
      <p>
        The DPDP Act requires that personal data be retained only as long as necessary to fulfill
        the purpose for which it was collected. For OTP-related data, here are practical
        guidelines:
      </p>

      <h3>OTP Codes</h3>
      <p>
        OTP codes should be deleted or invalidated as soon as they are verified or expired. There
        is no reason to retain an OTP code after it has served its purpose. Best practice is:
      </p>
      <ul>
        <li>Set a short expiry window (5&ndash;10 minutes)</li>
        <li>Delete or invalidate the OTP immediately after successful verification</li>
        <li>Store only hashed versions during the active period</li>
        <li>Purge expired OTPs from your database regularly</li>
      </ul>

      <h3>Phone Numbers</h3>
      <p>
        If the phone number is part of the user&apos;s account, retention is justified for the
        duration of the account relationship. If the phone number was collected solely for a
        one-time verification (for example, verifying age or identity), it should be deleted once
        verification is complete.
      </p>

      <h3>Message Logs</h3>
      <p>
        Delivery logs (timestamps, delivery status, provider details) may be retained for
        operational and debugging purposes, but they should be anonymized or pseudonymized where
        possible. Avoid storing full phone numbers in logs; use hashed or truncated formats
        instead.
      </p>

      <h2 id="cross-border-transfer">Cross-Border Data Transfer</h2>
      <p>
        The DPDP Act restricts the transfer of personal data outside India to countries that the
        Indian government has not specifically restricted. This is relevant for OTP
        implementations in several ways:
      </p>
      <ul>
        <li>
          <strong>SMS provider location</strong> &mdash; if your OTP provider routes messages
          through infrastructure outside India, phone numbers are technically transferred
          cross-border. Ensure your provider processes data within India or in approved
          jurisdictions.
        </li>
        <li>
          <strong>Cloud infrastructure</strong> &mdash; if your application stores phone numbers
          in a database hosted outside India, that constitutes cross-border transfer.
        </li>
        <li>
          <strong>Analytics and logging</strong> &mdash; if delivery logs containing phone numbers
          are sent to analytics services hosted abroad, that is also a transfer.
        </li>
      </ul>
      <p>
        The government maintains and periodically updates a list of countries to which data
        transfer is restricted. As of now, the implementation rules are still being finalized,
        but the safest approach is to ensure all OTP-related data processing happens within
        India.
      </p>

      <h2 id="compliance-checklist">Compliance Checklist</h2>
      <p>
        Here is a practical checklist for ensuring your OTP implementation complies with the
        DPDP Act:
      </p>
      <ol>
        <li>
          <strong>Privacy policy</strong> &mdash; include phone number collection and OTP
          processing in your privacy policy. State the purpose, retention period, and user rights.
        </li>
        <li>
          <strong>Consent mechanism</strong> &mdash; ensure the OTP request flow constitutes
          valid consent (user-initiated, informed, unambiguous).
        </li>
        <li>
          <strong>Purpose limitation</strong> &mdash; do not use phone numbers collected for OTP
          for marketing without separate consent.
        </li>
        <li>
          <strong>Data minimization</strong> &mdash; collect only the phone number needed for
          verification. Do not require additional personal data solely for OTP delivery.
        </li>
        <li>
          <strong>OTP hashing</strong> &mdash; store OTP codes as hashes (bcrypt or equivalent),
          never in plaintext.
        </li>
        <li>
          <strong>Expiry and deletion</strong> &mdash; set OTP expiry (5&ndash;10 minutes) and
          delete codes after verification or expiry.
        </li>
        <li>
          <strong>Secure transmission</strong> &mdash; use HTTPS for all API calls to your OTP
          provider. Never send phone numbers over unencrypted connections.
        </li>
        <li>
          <strong>Access controls</strong> &mdash; limit who in your organization can access
          phone numbers and OTP logs.
        </li>
        <li>
          <strong>Breach notification plan</strong> &mdash; have a plan to notify the Data
          Protection Board and affected users within 72 hours of a data breach.
        </li>
        <li>
          <strong>Data processor agreement</strong> &mdash; ensure your OTP provider has a data
          processing agreement that covers DPDP Act obligations.
        </li>
        <li>
          <strong>User rights</strong> &mdash; implement mechanisms for users to request access
          to, correction of, or deletion of their personal data.
        </li>
        <li>
          <strong>Audit trail</strong> &mdash; maintain logs of consent and data processing
          activities for accountability.
        </li>
      </ol>

      <h2 id="startmessaging-and-dpdp">StartMessaging and DPDP Compliance</h2>
      <p>
        When you use <Link href="/features">StartMessaging</Link> as your OTP provider, several
        DPDP compliance requirements are addressed by our infrastructure:
      </p>
      <ul>
        <li>
          <strong>OTP hashing</strong> &mdash; all OTP codes are bcrypt-hashed at creation. The
          plaintext code exists only in the SMS message itself.
        </li>
        <li>
          <strong>Automatic expiry</strong> &mdash; OTPs expire after the configured window and
          are automatically invalidated.
        </li>
        <li>
          <strong>India-based processing</strong> &mdash; all OTP processing and SMS routing
          happens through infrastructure within India.
        </li>
        <li>
          <strong>Secure API</strong> &mdash; all API communication is over HTTPS with
          SHA-256 hashed API key authentication.
        </li>
        <li>
          <strong>Minimal data retention</strong> &mdash; we retain only the data necessary for
          delivery verification and billing, with configurable retention periods.
        </li>
        <li>
          <strong>DLT compliance included</strong> &mdash; our{' '}
          <Link href="/dlt-free-otp">DLT-free OTP delivery</Link> means you skip the entire
          DLT registration process while remaining fully compliant with TRAI regulations.
        </li>
      </ul>
      <p>
        At <strong>Rs 0.25 per OTP</strong>, StartMessaging provides a compliant, secure, and
        affordable OTP solution.{' '}
        <Link href="/send-otp-without-dlt">Get started without DLT registration</Link>, or
        review our <Link href="/otp-api">API documentation</Link> and{' '}
        <Link href="/pricing">pricing</Link>.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
    </>
  ),
  relatedSlugs: ['trai-sms-regulations-2026', 'otp-security-best-practices'],
  faq: [
    {
      question: 'Is a phone number considered personal data under the DPDP Act?',
      answer:
        'Yes. A mobile phone number is personal data under the DPDP Act because it can identify an individual. Collecting a phone number for OTP verification means you are processing personal data and must comply with the Act\'s requirements, including purpose limitation, consent, and data retention rules.',
    },
    {
      question: 'Do I need explicit consent to send an OTP?',
      answer:
        'When a user enters their phone number and clicks a "Send OTP" button, this constitutes valid consent for receiving the OTP. The user initiated the action, the purpose is clear, and the consent is unambiguous. You do not need a separate consent popup for transactional OTPs. However, you do need separate consent if you want to use that phone number for marketing messages.',
    },
    {
      question: 'How long can I retain OTP-related data?',
      answer:
        'OTP codes should be deleted immediately after verification or expiry, whichever comes first. Phone numbers that are part of a user account can be retained for the duration of the account relationship. Delivery logs should be retained only as long as needed for operational purposes and should avoid storing full phone numbers where possible.',
    },
    {
      question: 'Does using StartMessaging help with DPDP Act compliance?',
      answer:
        'Yes. StartMessaging bcrypt-hashes all OTP codes, processes data within India, uses HTTPS for all API communication, and enforces automatic OTP expiry. This addresses several DPDP Act requirements out of the box. You remain the Data Fiduciary and need to ensure your own application also complies, but StartMessaging as your Data Processor handles the OTP-specific security and data handling requirements.',
    },
  ],
};
