import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'irdai-otp-rules-insurance-india',
  title: 'IRDAI OTP Rules for Insurance Apps',
  description:
    'IRDAI OTP rules for insurance apps in India: digital onboarding, claims, nominee changes, e-policy issuance, and audit-grade record-keeping requirements.',
  category: 'compliance',
  keywords: [
    'irdai otp',
    'insurance app otp india',
    'irdai 2fa',
    'irdai e policy',
    'insurance compliance otp',
  ],
  publishedAt: '2026-05-05',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'onboarding', title: 'Digital Onboarding' },
    { id: 'modifications', title: 'Policy Modifications' },
    { id: 'claims', title: 'Claims OTP Requirements' },
    { id: 'audit', title: 'Audit Retention' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-insurance-apps-india',
    'rbi-2fa-2026-mandate',
    'otp-data-privacy-india',
    'dpdp-act-otp-compliance-india',
  ],
  faq: [
    {
      question: 'Is OTP enough for issuing an e-policy?',
      answer:
        'For digital onboarding under IRDAI&rsquo;s e-policy framework, OTP-based authentication of the registered phone is standard. Some products layer Aadhaar-OTP for KYC.',
    },
    {
      question: 'How long are insurance OTP logs retained?',
      answer:
        'Aligned with policy lifecycle: typically policy duration + 8 years statutory minimum. Retain (requestId, action, status, timestamp); never plaintext.',
    },
  ],
  content: (
    <>
      <p>
        IRDAI&rsquo;s digital-self-service framework places OTP at the
        centre of customer authentication for insurance apps. Whether
        issuing a new policy or processing a claim, OTP gates the change and
        produces the audit trail.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>Phone-OTP for digital onboarding.</li>
        <li>Aadhaar-OTP for KYC.</li>
        <li>Fresh OTP for policy modifications.</li>
        <li>OTP-gated claims for low-value claims.</li>
      </ul>

      <h2 id="onboarding">Digital Onboarding</h2>
      <p>
        IRDAI permits OTP-based digital onboarding for term, motor and
        health policies up to specified thresholds. Above threshold, video
        KYC is required.
      </p>

      <h2 id="modifications">Policy Modifications</h2>
      <ul>
        <li>Nominee change — fresh OTP, audited.</li>
        <li>Sum-assured change — OTP + cooling-off period.</li>
        <li>Address change — OTP + transactional confirmation SMS.</li>
        <li>Bank account change — OTP + penny-drop verification.</li>
      </ul>

      <h2 id="claims">Claims OTP Requirements</h2>
      <ul>
        <li>Low-value motor / health — OTP-only intimation.</li>
        <li>High-value — OTP + document upload + video KYC.</li>
        <li>Disbursement — bank-issued OTP + UTR confirmation SMS.</li>
      </ul>

      <h2 id="audit">Audit Retention</h2>
      <p>
        Minimum 8 years post policy end. Retained per (policyId, event,
        OTPrequestId, timestamp, status).
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles application
        OTP and confirmation SMS for insurance apps, separate from the
        UIDAI Aadhaar-OTP path.
      </p>
    </>
  ),
};
