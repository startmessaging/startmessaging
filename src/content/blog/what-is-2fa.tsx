import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-2fa',
  title: 'What is 2FA? Two-Factor Authentication Explained (2026)',
  description:
    'Two-Factor Authentication (2FA) explained in plain English. The three factor categories, common 2FA methods, OTP vs TOTP vs passkeys, and how to add 2FA to your product.',
  category: 'security',
  keywords: [
    'what is 2fa',
    'two factor authentication',
    '2fa meaning',
    '2fa explained',
    '2fa vs mfa',
    'how 2fa works',
    'enable 2fa',
  ],
  publishedAt: '2026-04-23',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'What 2FA Means' },
    { id: 'three-factors', title: 'The Three Factor Categories' },
    { id: 'common-methods', title: 'Common 2FA Methods Compared' },
    { id: 'how-it-works', title: 'How a 2FA Login Flow Works' },
    { id: 'why', title: 'Why 2FA Matters' },
    { id: 'mfa-difference', title: '2FA vs MFA — What is Different?' },
    { id: 'add-to-app', title: 'How to Add 2FA to Your App' },
    { id: 'pitfalls', title: 'Common 2FA Pitfalls' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-otp',
    'what-is-mfa',
    'what-is-totp',
    'sms-otp-vs-email-magic-link-vs-totp',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'What does 2FA stand for?',
      answer:
        '2FA stands for Two-Factor Authentication. It refers to verifying a user with two different categories of evidence — typically something they know (a password) plus something they have (a phone or hardware key).',
    },
    {
      question: 'Is OTP the same as 2FA?',
      answer:
        'Not by itself. An OTP is one factor (typically &ldquo;something you have&rdquo; — your phone). It becomes 2FA when combined with another factor, like a password (knowledge factor) or a fingerprint (inherence factor).',
    },
    {
      question: 'Is 2FA mandatory in India?',
      answer:
        'For specific financial flows, yes. RBI mandates Additional Factor of Authentication (AFA, equivalent to 2FA) on online card-not-present transactions, internet banking, and UPI transactions above certain thresholds. SEBI requires 2FA on broker logins.',
    },
    {
      question: 'Which 2FA method is most secure?',
      answer:
        'FIDO2 / passkeys are the strongest because they are phishing-resistant. TOTP from an authenticator app is next. SMS OTP is weakest in theory but still drastically better than no second factor and remains the default in India because of universal handset support.',
    },
  ],
  content: (
    <>
      <p>
        2FA — Two-Factor Authentication — is the single most cost-effective
        defence against account takeover that exists today. Microsoft has
        repeatedly published data showing that enabling 2FA blocks more than
        99.9% of automated attacks on consumer accounts. If your product
        handles money, personal data, or anything a competitor would pay to
        steal, 2FA is not optional.
      </p>
      <p>
        This guide explains <strong>what 2FA is</strong>, how it differs from
        single-factor login, the menu of 2FA methods you can offer, and how to
        ship 2FA in your own application — including the India-specific
        considerations around OTP delivery and DLT compliance.
      </p>

      <h2 id="definition">What 2FA Means</h2>
      <p>
        Two-Factor Authentication requires the user to prove their identity
        using <em>two different categories</em> of evidence before being granted
        access. Submitting two passwords is not 2FA — both belong to the same
        category (knowledge). Submitting a password and a code from your phone
        is 2FA, because they belong to two different categories.
      </p>
      <p>
        The intuition is simple: an attacker who phishes your password still
        needs to physically possess your phone, and an attacker who steals your
        phone still needs to know your password. Compromising both at once is
        much harder than compromising either alone.
      </p>

      <h2 id="three-factors">The Three Factor Categories</h2>
      <p>The standard authentication factors are:</p>
      <ul>
        <li>
          <strong>Something you know.</strong> Passwords, PINs, security
          questions. Cheap to deploy, easy to phish, easy to forget.
        </li>
        <li>
          <strong>Something you have.</strong> A phone (for SMS OTP), a
          hardware key (YubiKey), an authenticator app (Google Authenticator,
          Authy), a smart card. Hard to steal at scale.
        </li>
        <li>
          <strong>Something you are.</strong> Biometrics — fingerprint, face,
          voice, iris. Convenient but hard to revoke if breached and varies in
          accuracy across populations.
        </li>
      </ul>
      <p>
        Some frameworks add a fourth — <em>somewhere you are</em> (location) or{' '}
        <em>something you do</em> (typing rhythm). These are rarely used as
        primary factors but show up as risk signals.
      </p>

      <h2 id="common-methods">Common 2FA Methods Compared</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Factor</th>
              <th>Phishing Resistance</th>
              <th>Cost / OTP</th>
              <th>India Adoption</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SMS OTP</td>
              <td>Have</td>
              <td>Low</td>
              <td>Rs 0.10–0.30</td>
              <td>Universal</td>
            </tr>
            <tr>
              <td>Voice OTP</td>
              <td>Have</td>
              <td>Low</td>
              <td>Rs 0.30–0.60</td>
              <td>Common as fallback</td>
            </tr>
            <tr>
              <td>Email magic link</td>
              <td>Have</td>
              <td>Low</td>
              <td>≈ free</td>
              <td>Used in B2B SaaS</td>
            </tr>
            <tr>
              <td>TOTP app</td>
              <td>Have</td>
              <td>Medium</td>
              <td>Free</td>
              <td>Power users</td>
            </tr>
            <tr>
              <td>Push approval</td>
              <td>Have</td>
              <td>Medium</td>
              <td>Free</td>
              <td>Banking apps</td>
            </tr>
            <tr>
              <td>FIDO2 / Passkey</td>
              <td>Have + are</td>
              <td>High</td>
              <td>Hardware cost</td>
              <td>Emerging</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For a deeper comparison see{' '}
        <Link href="/blog/sms-otp-vs-email-magic-link-vs-totp">
          SMS OTP vs Email Magic Link vs TOTP
        </Link>
        .
      </p>

      <h2 id="how-it-works">How a 2FA Login Flow Works</h2>
      <p>The end-to-end flow with SMS OTP as the second factor:</p>
      <ol>
        <li>User submits email + password (factor 1, knowledge).</li>
        <li>
          Server validates credentials. If correct, marks the session as{' '}
          <code>partial</code> and triggers an OTP send via your{' '}
          <Link href="/otp-api">OTP API</Link>.
        </li>
        <li>User receives SMS, enters the code in the app.</li>
        <li>
          Server calls <code>/otp/verify</code>. On success, upgrades the
          session to <code>fully authenticated</code> and issues the final
          session token.
        </li>
        <li>
          Optional: a &ldquo;remember this device for 30 days&rdquo; checkbox
          stores a long-lived signed cookie so the user is not re-prompted on
          every login.
        </li>
      </ol>
      <p>
        See our{' '}
        <Link href="/blog/otp-verification-flow">
          end-to-end OTP verification flow guide
        </Link>{' '}
        for production-ready code.
      </p>

      <h2 id="why">Why 2FA Matters</h2>
      <ul>
        <li>
          <strong>Stops credential stuffing.</strong> Attackers buy leaked
          username/password pairs and replay them across hundreds of sites.
          Without the second factor, the replay fails.
        </li>
        <li>
          <strong>Defends against weak passwords.</strong> &ldquo;Password
          123&rdquo; is no longer enough on its own.
        </li>
        <li>
          <strong>Compliance.</strong> RBI, SEBI, IRDAI, PCI-DSS, ISO/IEC 27001,
          and India&rsquo;s DPDP Act all expect a second factor for sensitive
          actions.
        </li>
        <li>
          <strong>User trust.</strong> A visible 2FA option signals you take
          security seriously — particularly important for fintech, healthtech
          and any product holding KYC data.
        </li>
      </ul>

      <h2 id="mfa-difference">2FA vs MFA — What is Different?</h2>
      <p>
        2FA is a specific case of MFA (Multi-Factor Authentication). MFA means{' '}
        <em>two or more</em> factors; 2FA means <em>exactly two</em>. In most
        consumer products the two are used interchangeably, and switching from
        2FA marketing copy to MFA marketing copy rarely affects the
        implementation. We unpack the nuance in{' '}
        <Link href="/blog/what-is-mfa">our MFA explainer</Link>.
      </p>

      <h2 id="add-to-app">How to Add 2FA to Your App</h2>
      <p>The minimum viable 2FA in India looks like this:</p>
      <ol>
        <li>
          User signs up with phone + password. Phone is verified with an OTP
          before activation.
        </li>
        <li>
          On every subsequent login, after correct password, send an OTP via{' '}
          <Link href="/otp-api">StartMessaging</Link>.
        </li>
        <li>Allow the user to enrol TOTP later for a faster fallback.</li>
        <li>
          Provide secure recovery (backup codes printed at enrollment, or a
          KYC-bound human-review escalation).
        </li>
      </ol>
      <p>Code samples are in our tutorial library, e.g.:</p>
      <ul>
        <li>
          <Link href="/blog/send-otp-nodejs">Send OTP in Node.js</Link>
        </li>
        <li>
          <Link href="/blog/send-otp-python">Send OTP in Python</Link>
        </li>
        <li>
          <Link href="/blog/send-otp-django">Send OTP in Django</Link>
        </li>
        <li>
          <Link href="/blog/send-otp-nextjs-app-router">
            Send OTP in Next.js (App Router)
          </Link>
        </li>
      </ul>

      <h2 id="pitfalls">Common 2FA Pitfalls</h2>
      <ul>
        <li>
          <strong>No rate limit on OTP send.</strong> An attacker can burn your
          SMS budget by triggering thousands of sends. Throttle per-phone and
          per-IP. See{' '}
          <Link href="/blog/otp-rate-limiting-guide">
            our rate-limiting guide
          </Link>
          .
        </li>
        <li>
          <strong>OTP sent in cleartext over the response.</strong> Never echo
          the code; only return a request ID.
        </li>
        <li>
          <strong>Logging OTPs.</strong> Hash on the server, never write the
          plain code to logs or analytics.
        </li>
        <li>
          <strong>No backup factor.</strong> Users lose phones. Without a
          backup, you create a support nightmare. Bake recovery codes into the
          enrolment flow.
        </li>
        <li>
          <strong>Trusting the client.</strong> Verification must happen
          server-side via the OTP API; do not let the browser decide whether
          the code matched.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        StartMessaging makes the SMS-OTP half of 2FA trivial:{' '}
        <Link href="/dlt-free-otp">no DLT registration</Link>, Rs 0.25 per OTP,
        and a five-minute integration with your existing auth stack.{' '}
        <Link href="https://app.startmessaging.com/register">Get an API key</Link>{' '}
        to start.
      </p>
    </>
  ),
};
