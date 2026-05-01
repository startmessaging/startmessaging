import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'gdpr-otp-india-eu-customers',
  title: 'GDPR and OTP for Indian Apps Serving EU Customers',
  description:
    'How Indian apps that serve EU customers should handle GDPR for OTP flows: lawful basis, retention, transfers, joint controllers, and DPDP Act overlap.',
  category: 'compliance',
  keywords: [
    'gdpr otp india',
    'gdpr sms otp',
    'gdpr indian saas',
    'eu data otp',
    'gdpr dpdp overlap',
  ],
  publishedAt: '2026-05-06',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'lawful-basis', title: 'Lawful Basis for OTP Processing' },
    { id: 'transfer', title: 'EU-to-India Data Transfer' },
    { id: 'retention', title: 'Retention' },
    { id: 'controller', title: 'Controller / Processor Roles' },
    { id: 'overlap', title: 'GDPR + DPDP Overlap' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'dpdp-act-otp-compliance-india',
    'otp-data-privacy-india',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'If we send OTPs to EU phone numbers from India, do we trigger GDPR?',
      answer:
        'Yes. Processing EU-resident personal data (phone numbers) brings you under GDPR irrespective of where the processor is located. The Indian SMS provider you use is your processor; you remain the controller.',
    },
    {
      question: 'Do we need a DPA with our SMS provider?',
      answer:
        'Yes. The SMS provider processes personal data on your behalf and a written Data Processing Agreement is required.',
    },
  ],
  content: (
    <>
      <p>
        Indian SaaS and fintechs increasingly serve EU customers. GDPR
        applies whenever EU-resident data is processed, no matter where the
        servers live. OTP flows are personal-data processing — phone number,
        IP, timestamp — and need careful design.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>GDPR applies extraterritorially.</li>
        <li>OTP is personal-data processing.</li>
        <li>Processor relationships need DPAs.</li>
        <li>EU-to-India transfers need SCCs or adequacy.</li>
      </ul>

      <h2 id="lawful-basis">Lawful Basis for OTP Processing</h2>
      <p>
        For OTP-based authentication, &ldquo;performance of contract&rdquo;
        is typically the cleanest lawful basis. Marketing SMS requires
        consent.
      </p>

      <h2 id="transfer">EU-to-India Data Transfer</h2>
      <p>
        India is not on the EU adequacy list. EU-origin data sent to Indian
        SMS providers needs Standard Contractual Clauses (SCCs) or
        equivalent transfer mechanisms.
      </p>

      <h2 id="retention">Retention</h2>
      <ul>
        <li>OTP logs minimised to verification window plus minimal audit.</li>
        <li>Phone numbers tied to account lifecycle.</li>
        <li>Right-to-erasure on request.</li>
      </ul>

      <h2 id="controller">Controller / Processor Roles</h2>
      <ul>
        <li>You — controller.</li>
        <li>SMS provider — processor.</li>
        <li>DPA signed in advance.</li>
      </ul>

      <h2 id="overlap">GDPR + DPDP Overlap</h2>
      <p>
        DPDP Act 2023 broadly tracks GDPR for the basics. Where they
        diverge — children&rsquo;s consent thresholds, breach notification
        windows — you generally take the stricter rule. See{' '}
        <Link href="/blog/dpdp-act-otp-compliance-india">our DPDP guide</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        For Indian SaaS serving EU users,{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> can sign the
        necessary DPA and SCC documents — talk to support during onboarding.
      </p>
    </>
  ),
};
