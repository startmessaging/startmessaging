import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-insurance-apps-india',
  title: 'OTP for Insurance Apps in India (IRDAI-Compliant Patterns)',
  description:
    'How Indian insurance apps use OTPs for policy issuance, claims, nominee changes and renewals. IRDAI rules, audit requirements, and a reference implementation.',
  category: 'use-cases',
  keywords: [
    'otp insurance app india',
    'irdai otp',
    'policy otp',
    'claims otp',
    'insurance digital onboarding',
    'irdai 2fa',
  ],
  publishedAt: '2026-04-29',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Insurance Apps Need Strict OTP Design' },
    { id: 'flows', title: 'OTP Flows Across the Policy Lifecycle' },
    { id: 'irdai', title: 'IRDAI Rules to Know' },
    { id: 'fraud', title: 'Fraud Patterns Specific to Insurance' },
    { id: 'patterns', title: 'Production Patterns' },
    { id: 'audit', title: 'Audit Trail and Retention' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-nbfc-loan-apps-india',
    'rbi-2fa-2026-mandate',
    'otp-data-privacy-india',
    'otp-fintech-india',
  ],
  faq: [
    {
      question: 'Does IRDAI require OTP for nominee changes?',
      answer:
        'Yes. IRDAI’s digital-self-service circular requires customer authentication for any change to nominee, sum-assured or contact details. SMS OTP via the registered mobile is the standard control.',
    },
    {
      question: 'How long must I keep OTP records for an insurance policy?',
      answer:
        'IRDAI mandates retention aligned with the policy lifecycle plus statutory minimums — typically 8 years post-policy-end. Retain (requestId, action, timestamp, status), never the plaintext code.',
    },
    {
      question: 'Can a claim be submitted with an SMS OTP alone?',
      answer:
        'For low-value motor and health claims, yes. High-value or contested claims layer on document upload, video KYC, and additional fraud signals on top of OTP.',
    },
  ],
  content: (
    <>
      <p>
        Indian insurance apps sit at the intersection of two strict
        regulators — IRDAI and the DPDP regime — and a customer base that
        almost never logs in until something goes wrong. OTP is the
        authentication thread that connects every milestone: from buying a
        policy on a long weekend to filing a claim after an accident.
      </p>

      <h2 id="context">Why Insurance Apps Need Strict OTP Design</h2>
      <ul>
        <li>Long policy lifecycle (months to decades) — contact details drift.</li>
        <li>Claims are emotionally loaded and time-sensitive.</li>
        <li>Pay-outs are large; fraud is a constant pressure.</li>
        <li>IRDAI examines OTP audit trails during digital-readiness reviews.</li>
      </ul>

      <h2 id="flows">OTP Flows Across the Policy Lifecycle</h2>
      <ol>
        <li>Quote &amp; sign-up — phone OTP.</li>
        <li>KYC — Aadhaar / PAN OTP.</li>
        <li>Premium payment — bank-issued OTP.</li>
        <li>Policy issuance SMS — transactional.</li>
        <li>Renewal reminder — service-explicit.</li>
        <li>Nominee change — fresh OTP, audited.</li>
        <li>Claim intimation — OTP + document upload.</li>
        <li>Claim disbursement — confirmation SMS with UTR.</li>
      </ol>

      <h2 id="irdai">IRDAI Rules to Know</h2>
      <ul>
        <li>OTP-based digital onboarding permitted under IRDAI&rsquo;s e-policy framework.</li>
        <li>Customer authentication required for any policy modification.</li>
        <li>Audit logs accessible to IRDAI examiners.</li>
        <li>
          See our{' '}
          <Link href="/blog/rbi-2fa-2026-mandate">RBI 2FA mandate guide</Link>{' '}
          — IRDAI broadly mirrors the AFA framework.
        </li>
      </ul>

      <h2 id="fraud">Fraud Patterns Specific to Insurance</h2>
      <ul>
        <li>Account takeover before claim — attacker resets phone, then files.</li>
        <li>Fake claims with rented phone numbers passing OTP.</li>
        <li>Nominee-change attacks before policyholder death-claim.</li>
        <li>Premium-rebate scams — promotional SMS pretending to be transactional.</li>
      </ul>

      <h2 id="patterns">Production Patterns</h2>
      <ul>
        <li>SIM-swap detection on policy modification.</li>
        <li>Step-up auth (video KYC) for high-value claims.</li>
        <li>Cool-off period after phone-number change.</li>
        <li>Email + SMS dual-channel notifications for any modification.</li>
      </ul>

      <h2 id="audit">Audit Trail and Retention</h2>
      <p>Retain for each event:</p>
      <ul>
        <li>OTP requestId.</li>
        <li>Verified phone hash.</li>
        <li>Timestamp.</li>
        <li>Purpose (purchase / kyc / claim / nominee change).</li>
        <li>IP address and device fingerprint.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> provides the
        application OTP layer most insurers need — DLT-handled, hashed-storage,
        DLR-retained — separate from any UIDAI Aadhaar OTP path you also
        operate.
      </p>
    </>
  ),
};
