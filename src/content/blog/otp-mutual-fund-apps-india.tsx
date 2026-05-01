import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-mutual-fund-apps-india',
  title: 'OTP for Mutual Fund Apps in India',
  description:
    'How mutual-fund apps in India use OTP across KYC, SIP enrolment, switch / redemption and folio management — with AMFI / SEBI compliance pointers and reference flow.',
  category: 'use-cases',
  keywords: [
    'mutual fund otp india',
    'sip enrolment otp',
    'mf redemption otp',
    'amfi compliance otp',
    'folio otp',
    'mutual fund kyc otp',
  ],
  publishedAt: '2026-05-01',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why MF Apps Need OTP' },
    { id: 'flows', title: 'OTP Flows Across the MF Lifecycle' },
    { id: 'sip', title: 'SIP Enrolment via e-Mandate' },
    { id: 'redemption', title: 'Redemption Step-Up' },
    { id: 'folio', title: 'Folio-Management OTPs' },
    { id: 'amfi', title: 'AMFI / SEBI Compliance Pointers' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-stock-broking-apps-india',
    'otp-fintech-india',
    'otp-nbfc-loan-apps-india',
    'otp-data-privacy-india',
  ],
  faq: [
    {
      question: 'Do MF redemptions need OTP?',
      answer:
        'Most platforms now require fresh OTP on redemption above a threshold. Below that, the standard login 2FA suffices. Tax-saver ELSS unlocks (after 3-year lock-in) almost always go through fresh OTP.',
    },
    {
      question: 'Should the SIP confirmation OTP be the same as login OTP?',
      answer:
        'No. Separate request flows means cleaner audit and better fraud isolation. Reusing login OTP for SIP enrolment creates a small but real replay window.',
    },
    {
      question: 'How do we handle joint-holder accounts?',
      answer:
        'Both holders register phone numbers; redemption above threshold requires OTP from both. The application OTP API must support multi-recipient verification with a single logical request.',
    },
  ],
  content: (
    <>
      <p>
        Mutual-fund apps in India operate under AMFI norms and SEBI scrutiny.
        OTP plays a structural role in onboarding, recurring contributions
        (SIPs), and audit-friendly redemption flows.
      </p>

      <h2 id="context">Why MF Apps Need OTP</h2>
      <ul>
        <li>KYC — Aadhaar OTP for identity proof.</li>
        <li>e-NACH / e-Mandate for SIP — bank OTP.</li>
        <li>App-side login 2FA.</li>
        <li>Redemption / switch / nominee change — fresh app OTP.</li>
      </ul>

      <h2 id="flows">OTP Flows Across the MF Lifecycle</h2>
      <ol>
        <li>Onboarding phone OTP.</li>
        <li>UIDAI Aadhaar OTP for KYC.</li>
        <li>e-NACH OTP for SIP registration.</li>
        <li>Login 2FA OTP per session.</li>
        <li>Redemption step-up OTP.</li>
        <li>Folio-modification OTP (nominee, bank account).</li>
        <li>Confirmation SMS — folio statement, dividend, redemption proceeds.</li>
      </ol>

      <h2 id="sip">SIP Enrolment via e-Mandate</h2>
      <p>
        SIP relies on NPCI&rsquo;s e-NACH. The OTP is issued by the
        investor&rsquo;s bank, not your MF platform. Your job is presentation
        + audit trail:
      </p>
      <ul>
        <li>Display amount, frequency and AMC clearly on consent screen.</li>
        <li>Capture consent timestamp and IP.</li>
        <li>Send transactional confirmation SMS once mandate is active.</li>
      </ul>

      <h2 id="redemption">Redemption Step-Up</h2>
      <p>Default pattern:</p>
      <ul>
        <li>&lt; Rs 50,000 — login 2FA suffices.</li>
        <li>&gt; Rs 50,000 — fresh OTP step-up.</li>
        <li>&gt; Rs 5,00,000 — step-up + bank-account verification cooling period.</li>
      </ul>

      <h2 id="folio">Folio-Management OTPs</h2>
      <p>
        Nominee change, bank account update, and address change all require
        fresh app OTP plus a transactional confirmation SMS. Two-channel
        confirmation reduces fraud window.
      </p>

      <h2 id="amfi">AMFI / SEBI Compliance Pointers</h2>
      <ul>
        <li>Audit trail retained 8+ years.</li>
        <li>OTP records admissible in dispute resolution.</li>
        <li>DPDP Act applies to investor PII.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles
        application-side OTPs and confirmation SMS at scale, decoupled from
        the bank-issued e-NACH OTP path.
      </p>
    </>
  ),
};
