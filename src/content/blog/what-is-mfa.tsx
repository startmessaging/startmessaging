import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-mfa',
  title: 'What is MFA? Multi-Factor Authentication Explained',
  description:
    'Multi-Factor Authentication (MFA) explained: factor types, MFA vs 2FA, adaptive MFA, real-world deployment patterns, and how Indian regulators define MFA.',
  category: 'security',
  keywords: [
    'what is mfa',
    'multi factor authentication',
    'mfa meaning',
    'mfa vs 2fa',
    'adaptive mfa',
    'mfa india',
  ],
  publishedAt: '2026-04-23',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'MFA — Definition' },
    { id: 'mfa-vs-2fa', title: 'MFA vs 2FA' },
    { id: 'factor-types', title: 'Factor Types in MFA' },
    { id: 'adaptive', title: 'Adaptive (Risk-Based) MFA' },
    { id: 'patterns', title: 'Common MFA Patterns' },
    { id: 'india', title: 'MFA in Indian Regulation' },
    { id: 'add-mfa', title: 'How to Add MFA to Your App' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-2fa',
    'what-is-otp',
    'what-is-totp',
    'rbi-2fa-2026-mandate',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'What is the difference between MFA and 2FA?',
      answer:
        'MFA — Multi-Factor Authentication — is the umbrella term for any login that uses two or more independent factors. 2FA is the specific case of exactly two. All 2FA is MFA, but not all MFA is 2FA.',
    },
    {
      question: 'How many factors should an MFA flow use?',
      answer:
        'Two is sufficient for most consumer apps. Three or more is reserved for high-security contexts: corporate VPN, root cloud accounts, banking back-office tools. Adding more factors hurts UX and rarely improves real security past the first two independent ones.',
    },
    {
      question: 'Does India require MFA by law?',
      answer:
        'For specific financial transactions, yes. RBI calls it Additional Factor of Authentication (AFA), which functionally is MFA. SEBI mandates MFA on stock-broker logins. The DPDP Act requires reasonable security measures, which auditors increasingly interpret as MFA.',
    },
    {
      question: 'Can MFA be bypassed?',
      answer:
        'A real-time phishing proxy can intercept SMS or TOTP codes. Push fatigue attacks bombard users until they tap approve by accident. FIDO2 / passkeys are designed to resist these. The safest pattern for sensitive actions is passkey + risk score.',
    },
  ],
  content: (
    <>
      <p>
        Multi-Factor Authentication (MFA) is the formal name for what most
        people call &ldquo;turning on two-factor.&rdquo; It is also the
        compliance term that auditors, regulators and security teams reach for
        when they want a category that covers SMS OTP, TOTP, push approvals,
        and hardware keys without singling any one out.
      </p>
      <p>
        This guide answers <strong>what MFA is</strong>, how it differs from
        2FA, the kinds of factors that count, the modern adaptive variations,
        and how to deploy MFA in an Indian-context product without making your
        users miserable.
      </p>

      <h2 id="definition">MFA — Definition</h2>
      <p>
        <strong>Multi-Factor Authentication</strong> requires the user to
        present <em>two or more</em> independent forms of evidence — drawn from
        different categories — before access is granted. Independence is the
        key word: a password and a security question are both knowledge, so
        they do not count as MFA even though there are two of them.
      </p>
      <p>
        Independence matters because the threat model assumes any single factor
        can be stolen. Combining factors from different categories means a
        successful attack must compromise two different attack surfaces (your
        memory <em>and</em> your phone, for instance), which is exponentially
        harder.
      </p>

      <h2 id="mfa-vs-2fa">MFA vs 2FA</h2>
      <p>
        The difference is purely numeric:
      </p>
      <ul>
        <li>
          <strong>2FA = exactly two factors.</strong> Most consumer products.
        </li>
        <li>
          <strong>MFA = two or more factors.</strong> The umbrella that
          includes 2FA, 3FA, etc.
        </li>
      </ul>
      <p>
        In practice, &ldquo;MFA&rdquo; is the term you will see in compliance
        documents, while &ldquo;2FA&rdquo; is what consumers see in the UI.
        Read{' '}
        <Link href="/blog/what-is-2fa">our 2FA explainer</Link> for the user-facing
        equivalent.
      </p>

      <h2 id="factor-types">Factor Types in MFA</h2>
      <p>The widely accepted taxonomy is:</p>
      <ol>
        <li>
          <strong>Knowledge.</strong> Passwords, PINs, secret questions.
        </li>
        <li>
          <strong>Possession.</strong> SMS OTP to a registered phone, TOTP from
          an authenticator app, hardware key, push notification on a paired
          device.
        </li>
        <li>
          <strong>Inherence.</strong> Biometrics — fingerprint, face, voice.
        </li>
        <li>
          <strong>Location / context.</strong> Trusted device, trusted network,
          known geolocation. Rarely a primary factor on its own; more often a
          risk signal that gates the others.
        </li>
        <li>
          <strong>Behaviour.</strong> Typing rhythm, gait, transaction patterns.
          Used by fraud teams; rarely user-visible.
        </li>
      </ol>

      <h2 id="adaptive">Adaptive (Risk-Based) MFA</h2>
      <p>
        Static MFA — &ldquo;always require OTP after password&rdquo; — is
        annoying to users on trusted devices. Adaptive MFA evaluates risk
        signals at login time and only escalates when something looks off:
      </p>
      <ul>
        <li>New device or new IP range → require OTP.</li>
        <li>Country change or impossible-travel → require OTP and email
          notification.</li>
        <li>Known device, recent successful login, low-risk action → no
          second factor.</li>
        <li>Sensitive action (large transfer, password change) → step-up to
          OTP regardless of risk.</li>
      </ul>
      <p>
        Adaptive MFA is the modern default in fintech and SaaS. The trade-off
        is engineering complexity — you need a risk score, a policy engine,
        and reliable device-fingerprinting.
      </p>

      <h2 id="patterns">Common MFA Patterns</h2>
      <h3>Phone-first MFA (consumer Indian apps)</h3>
      <p>
        Sign-up uses phone-number + OTP only. Password is optional. Every
        sensitive action triggers a fresh OTP. This is the most common pattern
        in Indian consumer apps because it works on any handset and avoids the
        password-recovery support load.
      </p>
      <h3>Password + step-up MFA</h3>
      <p>
        Default login is password. Sensitive flows (transfer money, change
        beneficiary, export data) escalate to OTP or TOTP. Common in B2B SaaS.
      </p>
      <h3>Passwordless with passkey</h3>
      <p>
        FIDO2 / WebAuthn replaces password entirely. The device&rsquo;s
        biometric serves as the inherence factor; the device itself is the
        possession factor. Phishing-resistant but requires modern OS support.
      </p>
      <h3>Hardware-key MFA (admin / corporate)</h3>
      <p>
        YubiKey or equivalent for high-privilege accounts. Often paired with
        TOTP fallback.
      </p>

      <h2 id="india">MFA in Indian Regulation</h2>
      <ul>
        <li>
          <strong>RBI</strong> — Additional Factor of Authentication is
          mandatory for card-not-present, internet banking, and UPI
          transactions over thresholds. See our{' '}
          <Link href="/blog/rbi-2fa-2026-mandate">
            RBI 2FA mandate breakdown
          </Link>
          .
        </li>
        <li>
          <strong>SEBI</strong> — All stockbroking platforms must enforce 2FA
          on user logins.
        </li>
        <li>
          <strong>IRDAI</strong> — Insurance portals require 2FA for policy
          changes.
        </li>
        <li>
          <strong>DPDP Act 2023</strong> — Reasonable security obligations are
          increasingly being interpreted by data-protection officers to include
          MFA on accounts holding personal data.
        </li>
      </ul>

      <h2 id="add-mfa">How to Add MFA to Your App</h2>
      <p>
        Concrete recipe for a typical Indian consumer / B2B SaaS product:
      </p>
      <ol>
        <li>
          <strong>Phase 1: SMS OTP everywhere.</strong> Use{' '}
          <Link href="/otp-api">StartMessaging&rsquo;s OTP API</Link> to enrol
          phone numbers. Send OTP after password on every login. Five-day
          implementation including testing.
        </li>
        <li>
          <strong>Phase 2: Add TOTP enrolment.</strong> Let power users opt
          into TOTP for faster, free, offline second factor.
        </li>
        <li>
          <strong>Phase 3: Add adaptive risk scoring.</strong> Trusted-device
          cookie, IP reputation, geolocation. Suppress OTP on low-risk logins.
        </li>
        <li>
          <strong>Phase 4: Passkey / FIDO2 rollout.</strong> Begin with web
          admin panels, expand to consumer flows as device support normalises.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Looking to add the SMS-OTP component of MFA today?{' '}
        <Link href="/dlt-free-otp">
          StartMessaging ships DLT-free OTP
        </Link>{' '}
        — no template approvals, no PE-ID hoops, just an API key and a phone
        number.{' '}
        <Link href="https://app.startmessaging.com/register">
          Get started for free
        </Link>
        .
      </p>
    </>
  ),
};
