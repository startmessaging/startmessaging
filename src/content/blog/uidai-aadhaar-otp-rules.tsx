import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'uidai-aadhaar-otp-rules',
  title: 'UIDAI Aadhaar OTP Rules for Indian Apps',
  description:
    'How UIDAI Aadhaar OTP works for Indian apps: KUA / Sub-AUA licensing, virtual ID flow, purpose limitation, allowed use-cases, and DPDP Act overlap.',
  category: 'compliance',
  keywords: [
    'uidai aadhaar otp',
    'aadhaar otp api',
    'kua license',
    'aadhaar otp rules',
    'aadhaar virtual id',
  ],
  publishedAt: '2026-05-06',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'kua-license', title: 'KUA / Sub-AUA Licensing' },
    { id: 'flow', title: 'Aadhaar OTP Flow' },
    { id: 'virtual-id', title: 'Virtual ID and Masking' },
    { id: 'use-cases', title: 'Permitted Use Cases' },
    { id: 'dpdp', title: 'DPDP Crossover' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-data-privacy-india',
    'dpdp-act-otp-compliance-india',
    'otp-fintech-india',
    'otp-nbfc-loan-apps-india',
  ],
  faq: [
    {
      question: 'Can I use a regular SMS OTP API for Aadhaar verification?',
      answer:
        'No. Aadhaar OTP is issued by UIDAI under your KUA / Sub-AUA license. A regular SMS OTP API is for app-side authentication only — separate paths.',
    },
    {
      question: 'How long can I retain Aadhaar number after verification?',
      answer:
        'UIDAI requires use of Virtual ID (VID) and reference IDs for downstream storage. Raw Aadhaar should not be retained except where strictly required by law.',
    },
  ],
  content: (
    <>
      <p>
        Aadhaar OTP is the UIDAI-issued one-time password used for
        identity verification. It is structurally separate from your
        application OTP. This guide explains how it works and how to
        integrate it correctly.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>Aadhaar OTP issued by UIDAI infrastructure.</li>
        <li>Requires KUA or Sub-AUA license.</li>
        <li>Used for KYC, eSign, e-NACH consent.</li>
        <li>Distinct from your app&rsquo;s SMS OTP layer.</li>
      </ul>

      <h2 id="kua-license">KUA / Sub-AUA Licensing</h2>
      <ul>
        <li>KUA — KYC User Agency, direct UIDAI licensee.</li>
        <li>Sub-AUA — operates under a parent AUA.</li>
        <li>Most fintechs use a Sub-AUA arrangement via a regulated AUA.</li>
      </ul>

      <h2 id="flow">Aadhaar OTP Flow</h2>
      <ol>
        <li>User enters Aadhaar number or VID in your app.</li>
        <li>Backend calls UIDAI <code>/otp/generate</code> via your AUA gateway.</li>
        <li>UIDAI dispatches OTP to the registered mobile.</li>
        <li>User enters OTP; backend calls UIDAI <code>/auth</code> with OTP.</li>
        <li>UIDAI returns verified KYC data.</li>
      </ol>

      <h2 id="virtual-id">Virtual ID and Masking</h2>
      <p>
        UIDAI requires use of VID for most use-cases to avoid storing raw
        Aadhaar. Masked Aadhaar shows only last four digits for display.
      </p>

      <h2 id="use-cases">Permitted Use Cases</h2>
      <ul>
        <li>KYC for regulated entities.</li>
        <li>e-Sign of legal documents.</li>
        <li>e-NACH consent.</li>
        <li>Specific government-service flows.</li>
      </ul>

      <h2 id="dpdp">DPDP Crossover</h2>
      <p>
        DPDP Act 2023 places additional purpose-limitation and
        retention obligations on Aadhaar data. See{' '}
        <Link href="/blog/dpdp-act-otp-compliance-india">
          DPDP / OTP guide
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        For the application-side phone-OTP layer (separate from Aadhaar OTP),{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> provides a clean,
        DLT-free integration that complements your KUA / Sub-AUA setup.
      </p>
    </>
  ),
};
