import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'rbi-afa-guidelines-otp-2026',
  title: 'RBI AFA Guidelines for OTP (2026 Update)',
  description:
    'RBI Additional Factor of Authentication guidelines summarised for OTP developers: scope, exemptions, alternative-factor allowances, and what changed in 2026.',
  category: 'compliance',
  keywords: [
    'rbi afa otp',
    'rbi additional factor authentication',
    'rbi otp guidelines',
    'afa rbi 2026',
    'card not present otp',
  ],
  publishedAt: '2026-05-05',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'scope', title: 'Scope of AFA' },
    { id: 'exemptions', title: 'Exemptions and Carve-Outs' },
    { id: 'alternative-factors', title: 'Alternative Factors RBI Permits' },
    { id: 'patterns', title: 'Production Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'rbi-2fa-2026-mandate',
    'otp-fintech-india',
    'otp-nbfc-loan-apps-india',
    'otp-stock-broking-apps-india',
  ],
  faq: [
    {
      question: 'Is SMS OTP the only acceptable AFA?',
      answer:
        'No. RBI permits any second factor that meets the &ldquo;independent factor&rdquo; criterion: SMS OTP, TOTP, biometric in regulated apps, hardware tokens. SMS OTP remains the default because of universal device support.',
    },
    {
      question: 'Are recurring payments exempt from AFA?',
      answer:
        'Eligible e-mandates have specific exemptions up to defined thresholds. Above threshold, AFA reapplies. Refer to RBI&rsquo;s e-mandate framework.',
    },
  ],
  content: (
    <>
      <p>
        RBI&rsquo;s AFA framework underpins the Indian online-payment
        experience. OTP is the dominant AFA implementation. The 2026 update
        clarifies several edges and recognises modern alternative factors.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>AFA mandatory on card-not-present transactions.</li>
        <li>Internet banking and mobile banking transactions covered.</li>
        <li>UPI transactions above thresholds require AFA.</li>
        <li>Specific e-mandate carve-outs.</li>
      </ul>

      <h2 id="scope">Scope of AFA</h2>
      <ul>
        <li>Card payments (CVV is one factor; OTP is the second).</li>
        <li>Mobile / internet banking logins and high-value transactions.</li>
        <li>UPI transactions above thresholds.</li>
        <li>NBFC loan disbursement and EMI changes.</li>
      </ul>

      <h2 id="exemptions">Exemptions and Carve-Outs</h2>
      <ul>
        <li>Small-value e-mandates (within RBI thresholds).</li>
        <li>Tokenised low-value payments at trusted merchants.</li>
        <li>Some employer-sponsored corporate-card flows.</li>
      </ul>

      <h2 id="alternative-factors">Alternative Factors RBI Permits</h2>
      <ul>
        <li>SMS OTP (default).</li>
        <li>TOTP / authenticator apps.</li>
        <li>Biometric in regulated mobile apps.</li>
        <li>Push approvals on registered devices.</li>
        <li>Hardware tokens for corporate banking.</li>
      </ul>
      <p>
        Read our broader{' '}
        <Link href="/blog/rbi-2fa-2026-mandate">RBI 2FA mandate guide</Link>.
      </p>

      <h2 id="patterns">Production Patterns</h2>
      <ul>
        <li>Default to SMS OTP for breadth.</li>
        <li>Layer biometric for trusted devices.</li>
        <li>Step-up to OTP on cross-device or cross-IP risk.</li>
        <li>Audit retain 7–10 years.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles
        application-side OTPs at scale; you remain compliant with AFA on the
        flows where you control authentication.
      </p>
    </>
  ),
};
