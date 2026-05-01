import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'dpdp-act-otp-compliance-india',
  title: 'DPDP Act and OTP Compliance in India',
  description:
    'How the Digital Personal Data Protection Act 2023 affects OTP and SMS workflows: consent, purpose limitation, data minimisation, retention, and OTP-specific patterns.',
  category: 'compliance',
  keywords: [
    'dpdp act otp',
    'data protection india otp',
    'consent otp dpdp',
    'dpdp sms compliance',
    'dpdp 2023 otp',
  ],
  publishedAt: '2026-05-05',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview of DPDP Act' },
    { id: 'consent', title: 'Consent for OTP Processing' },
    { id: 'purpose', title: 'Purpose Limitation' },
    { id: 'minimisation', title: 'Data Minimisation' },
    { id: 'retention', title: 'Retention Rules' },
    { id: 'breach', title: 'Breach Notification' },
    { id: 'patterns', title: 'OTP-Specific Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-data-privacy-india',
    'trai-message-scrubbing-india',
    'rbi-2fa-2026-mandate',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'Is sending an OTP a "processing" event under DPDP?',
      answer:
        'Yes. Phone number + OTP code + timestamp is personal data being processed. You need a lawful basis (typically performance of contract / consent), a stated purpose, and a retention policy.',
    },
    {
      question: 'Do I need explicit consent for OTP login?',
      answer:
        'Sign-up consent at first OTP usually covers it under "performance of contract" or "necessary for the service requested". Layer explicit consent on optional flows like marketing SMS.',
    },
    {
      question: 'Can I store OTP plaintext under DPDP?',
      answer:
        'Storing plaintext OTP is poor practice and likely a DPDP "reasonable security" failure. Always hash. The provider should hash and your servers should never see plaintext.',
    },
  ],
  content: (
    <>
      <p>
        The Digital Personal Data Protection Act 2023 (DPDP) reshaped how
        Indian businesses handle personal data. OTP — being a phone number
        plus authentication code — is squarely in scope. This guide explains
        what changes for OTP flows.
      </p>

      <h2 id="overview">Overview of DPDP Act</h2>
      <ul>
        <li>Lawful basis for processing.</li>
        <li>Purpose limitation.</li>
        <li>Data minimisation.</li>
        <li>Reasonable security safeguards.</li>
        <li>User rights (access, correction, erasure).</li>
        <li>Breach notification obligations.</li>
      </ul>

      <h2 id="consent">Consent for OTP Processing</h2>
      <p>
        Consent for OTP-based authentication is typically captured at
        sign-up under &ldquo;performance of contract&rdquo;. Marketing SMS,
        on-call notifications, and service-explicit messages need separate
        consent.
      </p>

      <h2 id="purpose">Purpose Limitation</h2>
      <p>
        Phone number captured for OTP cannot be repurposed for marketing
        without separate consent. Document the purpose at collection and
        honour it.
      </p>

      <h2 id="minimisation">Data Minimisation</h2>
      <ul>
        <li>Don&rsquo;t collect what you don&rsquo;t need.</li>
        <li>OTP requestId is enough — no need to store the plaintext code.</li>
        <li>IP / device fingerprint only if required for fraud control.</li>
      </ul>

      <h2 id="retention">Retention Rules</h2>
      <ul>
        <li>OTP logs: as long as needed for the stated purpose, plus statutory minimums (financial flows = 7+ years).</li>
        <li>Marketing data: until consent withdrawn.</li>
        <li>Phone numbers: bound to the account lifecycle plus statutory retention.</li>
      </ul>

      <h2 id="breach">Breach Notification</h2>
      <p>
        DPDP requires notification to the Data Protection Board and affected
        individuals on a personal-data breach. OTP plaintext leakage qualifies.
      </p>

      <h2 id="patterns">OTP-Specific Patterns</h2>
      <ul>
        <li>Hash OTPs server-side, store the hash, never log plaintext.</li>
        <li>Capture purpose in the OTP audit row.</li>
        <li>Implement right-to-erasure on the phone-number column.</li>
        <li>Maintain access-request export pipeline.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> hashes OTPs by
        default and provides DLR / audit logs in a DPDP-friendly format.
      </p>
    </>
  ),
};
