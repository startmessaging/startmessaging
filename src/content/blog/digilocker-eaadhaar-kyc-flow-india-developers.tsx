import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'digilocker-eaadhaar-kyc-flow-india-developers',
  title: 'DigiLocker eAadhaar and KYC: What App Developers Integrate (and What OTP Still Does)',
  description:
    'How DigiLocker-based eAadhaar XML fits into Indian KYC stacks, where OTP still appears in the citizen consent journey, and common pitfalls for fintech and SaaS engineering teams.',
  category: 'compliance',
  keywords: [
    'DigiLocker API India developers',
    'eAadhaar XML KYC',
    'DigiLocker integration fintech',
    'Aadhaar OTP vs DigiLocker',
    'paperless KYC India developers',
    'UIDAI KYC OTP flow',
    'India Stack KYC developers',
  ],
  publishedAt: '2026-05-11',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Compliance' },
  tableOfContents: [
    { id: 'roles', title: 'Roles: DigiLocker, UIDAI, and Your App' },
    { id: 'otp-touchpoints', title: 'Where OTP Still Appears' },
    { id: 'xml', title: 'eAadhaar XML vs Masked Aadhaar' },
    { id: 'storage', title: 'Storage, Redaction, and DPDP Minimisation' },
    { id: 'patterns', title: 'Engineering Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'uidai-aadhaar-otp-rules',
    'dpdp-act-otp-compliance-india',
    'otp-nbfc-loan-apps-india',
    'otp-fintech-india',
  ],
  faq: [
    {
      question: 'Does DigiLocker remove the need for Aadhaar OTP entirely?',
      answer:
        'Citizens still authenticate to DigiLocker and issue documents through flows controlled by MeitY / UIDAI policies. Your app does not bypass consent screens; you consume issued XML or JSON after the user shares it.',
    },
    {
      question: 'Can I store the full eAadhaar XML indefinitely?',
      answer:
        'Treat Aadhaar-derived identity data as high sensitivity. Minimise retention, encrypt at rest, and align with DPDP purpose limitation. Many teams store a hash of the document reference plus masked fields for display.',
    },
    {
      question: 'Is DigiLocker the same as eSign?',
      answer:
        'No. DigiLocker issues documents; Aadhaar eSign is a separate DSC pipeline for signatures. Your architecture may call both for loan agreements.',
    },
  ],
  content: (
    <>
      <p>
        Indian KYC conversations often jump between &ldquo;Aadhaar
        OTP&rdquo; and &ldquo;DigiLocker pull.&rdquo; They solve different
        layers: <strong>UIDAI OTP</strong> proves control of the Aadhaar
        number at a point in time, while{' '}
        <strong>DigiLocker document share</strong> proves the user consents
        to release a signed XML snapshot to your relying party. Product and
        backend teams need both mental models.
      </p>

      <h2 id="roles">Roles: DigiLocker, UIDAI, and Your App</h2>
      <p>
        DigiLocker acts as a document vault and consent broker. Your mobile or
        web app deep-links or embeds the DigiLocker experience, receives a
        token or file, and then validates XML signatures inside your KYC
        service. You still own fraud rules, deduplication, and{' '}
        <Link href="/blog/otp-database-schema-best-practices">
          database design
        </Link>{' '}
        for applicant records.
      </p>

      <h2 id="otp-touchpoints">Where OTP Still Appears</h2>
      <ul>
        <li>User login to DigiLocker if they do not use Aadhaar face auth.</li>
        <li>Fallback when document issuance throttles or session expires.</li>
        <li>
          Separate <strong>mobile verification OTP</strong> for your own app
          account — unrelated to Aadhaar but often confused in support tickets.
        </li>
      </ul>
      <p>
        For SMS OTP to your app login, providers such as{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> stay relevant even
        when KYC moves to DigiLocker-first onboarding.
      </p>

      <h2 id="xml">eAadhaar XML vs Masked Aadhaar</h2>
      <p>
        Teams may receive masked Aadhaar numbers alongside demographic
        fields. Your matching logic against PAN or bureau data must tolerate
        masking rules and version changes in issued XML schemas — version pin
        your XSD validators and monitor for format updates.
      </p>

      <h2 id="storage">Storage, Redaction, and DPDP Minimisation</h2>
      <p>
        Pair this implementation with{' '}
        <Link href="/blog/dpdp-act-otp-compliance-india">
          DPDP minimisation guidance
        </Link>
        . Avoid logging raw XML in application logs. Use short-lived pre-signed
        URLs if analysts must inspect documents, and redact Aadhaar numbers in
        every UI surface.
      </p>

      <h2 id="patterns">Engineering Patterns</h2>
      <ol>
        <li>
          Treat DigiLocker callback as an <strong>event</strong> into your
          state machine (received, verified, rejected).
        </li>
        <li>
          Verify XML signatures before marking KYC complete; do not trust
          client-side uploads without signature validation.
        </li>
        <li>
          Correlate DigiLocker session id with your user id using a server-side
          nonce to prevent session fixation across tabs.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        DigiLocker reduces repeated Aadhaar OTP fatigue for users who already
        trust the vault, but it does not replace your obligation to secure
        onboarding, device integrity, and downstream{' '}
        <Link href="/blog/otp-fintech-india">fintech OTP</Link> for
        transactions.
      </p>
    </>
  ),
};
