import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-dating-apps-india',
  title: 'OTP for Dating Apps in India',
  description:
    'OTP design for dating apps in India: phone verification, ghost-account defence, paid-feature unlock, safe meet-up confirmations and DPDP-friendly patterns.',
  category: 'use-cases',
  keywords: [
    'dating app otp',
    'tinder otp',
    'bumble otp',
    'dating app verification india',
    'ghost account defence',
    'safe meetup otp',
  ],
  publishedAt: '2026-05-01',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Dating Apps Need OTP' },
    { id: 'flows', title: 'OTP Flows in Dating Apps' },
    { id: 'fraud', title: 'Catfishing and Fraud Defences' },
    { id: 'safe-meet', title: 'Safe-Meet OTPs' },
    { id: 'compliance', title: 'DPDP Act Considerations' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-matrimony-apps-india',
    'otp-classifieds-olx-india',
    'otp-data-privacy-india',
  ],
  faq: [
    {
      question: 'Should we OTP-verify on every login?',
      answer:
        'Verify at sign-up and on each new device. Login 2FA on every session adds friction that hurts engagement; trade off with adaptive risk scoring.',
    },
    {
      question: 'Do we send the OTP at sign-up before or after the photo upload?',
      answer:
        'OTP first. Verifying the phone before they invest in profile creation reduces fake-account churn dramatically.',
    },
    {
      question: 'Can users get a second-factor for paid features?',
      answer:
        'Yes — premium-feature OTP step-up is a soft fraud control on subscription chargebacks.',
    },
  ],
  content: (
    <>
      <p>
        Dating apps in India navigate fraud, privacy and trust simultaneously.
        OTP-verified phones stand up the trust foundation; the app layers the
        rest of the safety story on top.
      </p>

      <h2 id="context">Why Dating Apps Need OTP</h2>
      <ul>
        <li>Reduce fake-profile creation.</li>
        <li>Anchor account-recovery flows.</li>
        <li>Gate paid features against chargebacks.</li>
        <li>Enable optional safe-meet flows.</li>
      </ul>

      <h2 id="flows">OTP Flows in Dating Apps</h2>
      <ol>
        <li>Sign-up phone OTP.</li>
        <li>New-device login OTP.</li>
        <li>Premium-purchase OTP step-up.</li>
        <li>Account-deletion OTP.</li>
        <li>Optional safe-meet OTP at the date.</li>
      </ol>

      <h2 id="fraud">Catfishing and Fraud Defences</h2>
      <ul>
        <li>Per-IP, per-device sign-up rate limits.</li>
        <li>Reverse-image search on profile photos.</li>
        <li>SIM-swap red flag → step-up before profile-edit.</li>
        <li>Number masking when revealing contact info.</li>
      </ul>

      <h2 id="safe-meet">Safe-Meet OTPs</h2>
      <p>
        Optional pattern for first dates: at the start of the meeting, both
        users tap &ldquo;safe-meet&rdquo;; system issues each user an OTP they
        share with each other. Mutual confirmation gives the app a verified
        timestamped meeting marker for safety / SOS features.
      </p>

      <h2 id="compliance">DPDP Act Considerations</h2>
      <ul>
        <li>Sensitive personal data (location, sexual orientation) requires careful consent.</li>
        <li>Right-to-erasure on account deletion must be honoured promptly.</li>
        <li>Data-minimisation — store only what features need.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles dating-app
        sign-up and step-up OTPs at scale; multi-provider failover keeps
        delivery rates high during sale-day premium upgrades.
      </p>
    </>
  ),
};
