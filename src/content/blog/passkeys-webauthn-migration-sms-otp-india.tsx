import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'passkeys-webauthn-migration-sms-otp-india',
  title: 'Passkeys (WebAuthn) vs SMS OTP for Indian Apps: Migration Notes',
  description:
    'A practical roadmap for Indian product teams adding FIDO2 passkeys alongside SMS OTP: user education, device coverage, RBI-style step-up, recovery, and when SMS remains mandatory.',
  category: 'security',
  keywords: [
    'passkeys India',
    'WebAuthn India developers',
    'replace SMS OTP passkey',
    'FIDO2 migration India',
    'passkey vs OTP banking',
    'Android passkey WebAuthn',
    'passwordless login India',
  ],
  publishedAt: '2026-05-12',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Security' },
  tableOfContents: [
    { id: 'why', title: 'Why Indian Teams Still Default to SMS' },
    { id: 'threat', title: 'Threat Model: What Passkeys Fix' },
    { id: 'phased', title: 'Phased Rollout Pattern' },
    { id: 'rbi', title: 'Regulated Flows and Step-Up Authentication' },
    { id: 'recovery', title: 'Recovery Without SMS-Only Weakness' },
    { id: 'metrics', title: 'Metrics That Prove the Migration' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'sms-otp-vs-email-magic-link-vs-totp',
    'rbi-2fa-2026-mandate',
    'otp-smishing-phishing-prevention',
    'silent-authentication-vs-otp-india',
  ],
  faq: [
    {
      question: 'Can passkeys replace SMS OTP for UPI or card payments?',
      answer:
        'Payment step-up rules come from RBI NPCI and issuer policies, not only your app. Many high-value flows still mandate issuer SMS or app push. Passkeys can replace login OTP while regulated actions keep their own factors.',
    },
    {
      question: 'What about users on budget Android without biometrics?',
      answer:
        'Keep SMS or TOTP fallback with stricter rate limits and device fingerprinting. Passkey adoption should be opt-in until you measure unsupported-device share in your analytics.',
    },
    {
      question: 'Do passkeys help with SIM swap fraud?',
      answer:
        'Yes for phishing and replay against your login endpoint because private keys never leave the device attestation boundary. They do not stop a compromised device OS; combine with risk scoring.',
    },
  ],
  content: (
    <>
      <p>
        SMS OTP is universal in India but vulnerable to smishing and SIM
        events. <strong>Passkeys (FIDO2 / WebAuthn)</strong> bind sign-in to
        a device key pair and resist remote phishing. This guide is for
        engineering managers planning a <strong>migration</strong>, not a
        crypto tutorial — we focus on rollout sequencing and compliance
        touchpoints.
      </p>

      <h2 id="why">Why Indian Teams Still Default to SMS</h2>
      <ul>
        <li>Works on every handset without app updates.</li>
        <li>Aligns with user mental models built by banks and UPI apps.</li>
        <li>Vendor-neutral — no Apple / Google passkey sync assumptions.</li>
      </ul>

      <h2 id="threat">Threat Model: What Passkeys Fix</h2>
      <p>
        SMS OTP can be intercepted by fake login pages that relay codes in
        real time. Passkeys remove shared secrets from the authentication
        ceremony. Read alongside{' '}
        <Link href="/blog/is-otp-secure-strengths-weaknesses">
          OTP strengths and weaknesses
        </Link>{' '}
        to decide where passkeys belong in your stack (login vs payments vs
        account recovery).
      </p>

      <h2 id="phased">Phased Rollout Pattern</h2>
      <ol>
        <li>
          <strong>Shadow mode:</strong> Register passkeys for users who opt
          in; keep SMS OTP unchanged.
        </li>
        <li>
          <strong>Preferred factor:</strong> Offer passkey-first login with
          SMS fallback behind the same risk engine used for{' '}
          <Link href="/blog/otp-failed-attempt-lockout-strategies">
            lockouts
          </Link>
          .
        </li>
        <li>
          <strong>Step-up:</strong> Keep SMS or issuer push for high-risk
          actions even after passkeys win on primary login.
        </li>
      </ol>

      <h2 id="rbi">Regulated Flows and Step-Up Authentication</h2>
      <p>
        Fintech teams should read{' '}
        <Link href="/blog/rbi-afa-guidelines-otp-2026">
          RBI AFA guidance
        </Link>{' '}
        with counsel. Passkeys can satisfy &ldquo;something you have&rdquo;
        for app login, but card-not-present and many wallet actions still
        expect issuer-controlled factors. Document which journeys are
        <em>in-app authentication</em> vs <em>regulated payment authentication</em>.
      </p>

      <h2 id="recovery">Recovery Without SMS-Only Weakness</h2>
      <p>
        If passkey recovery is &ldquo;send SMS OTP,&rdquo; you reintroduce the
        same SIM risks. Stronger patterns include split knowledge with
        in-branch verification, video KYC for high-value accounts, or
        hardware security keys for admin roles.
      </p>

      <h2 id="metrics">Metrics That Prove the Migration</h2>
      <ul>
        <li>Login success rate by device cohort.</li>
        <li>Median time-to-login before vs after passkeys.</li>
        <li>Support tickets tagged smishing / OTP not received.</li>
        <li>Chargeback or fraud loss rate on step-up flows.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Passkeys and SMS OTP can coexist for years. Most Indian apps will keep
        SMS for reachability while passkeys absorb returning users on modern
        devices. For SMS-only flows, providers like{' '}
        <Link href="/otp-api">StartMessaging</Link> keep integration simple
        while you migrate the login surface.
      </p>
    </>
  ),
};
