import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-otp',
  title: 'What is OTP? A Complete Guide for Developers and Users (2026)',
  description:
    'OTP (One-Time Password) explained: how it works, where it is used, the difference between SMS OTP, TOTP, HOTP, and Voice OTP, and how to add OTP to your app safely.',
  category: 'security',
  keywords: [
    'what is otp',
    'otp meaning',
    'otp full form',
    'one time password',
    'how otp works',
    'otp explained',
    'otp full form in english',
  ],
  publishedAt: '2026-04-22',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'OTP — Definition' },
    { id: 'how-it-works', title: 'How OTP Works' },
    { id: 'types', title: 'Types of OTP' },
    { id: 'where-used', title: 'Where OTPs Are Used' },
    { id: 'security', title: 'Why OTPs Matter for Security' },
    { id: 'limitations', title: 'Limitations of OTP' },
    { id: 'add-to-app', title: 'How to Add OTP to Your App' },
    { id: 'india-context', title: 'OTP in the Indian Context (DLT, TRAI)' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-2fa',
    'what-is-totp',
    'how-otp-works-step-by-step',
    'sms-otp-vs-whatsapp-otp',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'What is OTP in simple terms?',
      answer:
        'OTP stands for One-Time Password — a short numeric or alphanumeric code that is valid for a single login attempt or transaction, and only for a few minutes. After it is used or expires, it cannot be used again.',
    },
    {
      question: 'Is OTP the same as 2FA?',
      answer:
        'Not exactly. OTP is one factor (something you receive). 2FA — two-factor authentication — combines two different factors, typically your password (something you know) and an OTP (something you receive). Most modern OTP-based logins are a form of 2FA.',
    },
    {
      question: 'Can OTPs be hacked?',
      answer:
        'OTPs are far safer than reusable passwords, but they are not bulletproof. Common attacks include SIM swapping, phishing pages that capture both password and OTP, and SS7-network interception. Apps should rate-limit attempts, hash stored OTPs, and consider TOTP or silent-auth in higher-risk contexts.',
    },
    {
      question: 'How long is a typical OTP valid?',
      answer:
        'Most production systems use a 5–10 minute validity window. Shorter is safer but more frustrating for users; longer is more forgiving but increases the attack window. StartMessaging defaults to 10 minutes and 3 verification attempts, both configurable.',
    },
    {
      question: 'What does OTP stand for?',
      answer:
        'OTP is short for One-Time Password (sometimes called One-Time Passcode or One-Time PIN). All three names refer to the same idea — a code that is valid only once.',
    },
  ],
  content: (
    <>
      <p>
        If you have logged into a banking app, paid online, or signed up for an
        Indian e-commerce site recently, you have used an OTP. The four-, six-,
        or eight-digit code that landed on your phone? That is a One-Time
        Password — and it is the single most common second factor of
        authentication on the internet today.
      </p>
      <p>
        This guide answers the question{' '}
        <strong>&ldquo;what is OTP?&rdquo;</strong> from both the user&rsquo;s
        and the developer&rsquo;s perspective. It covers what an OTP is, how it
        is generated and verified, the different types of OTPs you will
        encounter, where OTPs are used, their strengths and weaknesses, and how
        to add OTP-based verification to your own application.
      </p>

      <h2 id="definition">OTP — Definition</h2>
      <p>
        An <strong>OTP (One-Time Password)</strong> is a short, automatically
        generated code that authenticates a user for a single transaction or
        session. The defining properties of an OTP are:
      </p>
      <ul>
        <li>
          <strong>Single use.</strong> Once consumed (or once it expires), it
          cannot be used again.
        </li>
        <li>
          <strong>Time-bound.</strong> Most OTPs expire within 5–10 minutes of
          being issued.
        </li>
        <li>
          <strong>Out-of-band delivery.</strong> The code is delivered through a
          different channel from the one being authenticated — usually SMS,
          email, voice call, or an authenticator app — so an attacker who has
          stolen one channel cannot complete the login alone.
        </li>
      </ul>
      <p>
        Compare this to a regular password, which is reusable, has no built-in
        expiry, and lives entirely on the user&rsquo;s side. OTPs trade the
        memorability of a password for stronger guarantees about{' '}
        <em>who</em> is on the other end of the session.
      </p>

      <h2 id="how-it-works">How OTP Works</h2>
      <p>
        At a high level, OTP-based verification has three actors: the user, your
        application, and an OTP service (such as{' '}
        <Link href="/otp-api">StartMessaging</Link>). The flow is straightforward:
      </p>
      <ol>
        <li>
          <strong>User triggers the flow.</strong> They enter their phone number
          to log in or to confirm a payment.
        </li>
        <li>
          <strong>Your backend asks the OTP service to send a code.</strong>{' '}
          The service generates a 4–6 digit number, stores a hashed copy with
          an expiry timestamp, and dispatches it to the user&rsquo;s phone via
          SMS, voice, or WhatsApp.
        </li>
        <li>
          <strong>The user types the code into your app.</strong>
        </li>
        <li>
          <strong>Your backend asks the OTP service to verify.</strong> The
          service compares the submitted code to the hash, checks expiry and
          attempt counts, and returns{' '}
          <code>{'{ verified: true }'}</code> or an error.
        </li>
        <li>
          <strong>You issue a session</strong> (JWT, cookie, etc.) to the
          authenticated user.
        </li>
      </ol>
      <p>
        The exact crypto used to generate the code differs by OTP type
        (described in the next section), but the verification model is always
        the same: hash the input and compare in constant time, never expose the
        plaintext code on your servers, and never log it.
      </p>

      <h2 id="types">Types of OTP</h2>
      <p>
        The acronym &ldquo;OTP&rdquo; covers a small family of related schemes.
        The four you will encounter most often:
      </p>
      <h3>SMS OTP</h3>
      <p>
        A code sent over SMS. By far the most common in India because it works
        on every phone, requires no app install, and is well understood by end
        users. The trade-off is delivery cost (Rs 0.10–0.30 per message) and
        SIM-swap risk. See our{' '}
        <Link href="/blog/what-is-sms-otp">deep dive on SMS OTP</Link>.
      </p>
      <h3>Voice OTP</h3>
      <p>
        Identical to SMS OTP except the code is read aloud over an automated
        voice call. Useful as a fallback when SMS is blocked or for visually
        impaired users.{' '}
        <Link href="/blog/voice-otp-vs-sms-otp-india">
          SMS vs Voice OTP comparison
        </Link>{' '}
        breaks down when each is appropriate.
      </p>
      <h3>TOTP (Time-Based OTP)</h3>
      <p>
        Generated by an authenticator app (Google Authenticator, Authy, 1Password)
        from a shared secret. The current 30-second time window is hashed with
        the secret to derive a 6-digit code. No SMS cost, no SIM-swap risk,
        works offline. Read our explainer on{' '}
        <Link href="/blog/what-is-totp">what TOTP is and how it works</Link>.
      </p>
      <h3>HOTP (Counter-Based OTP)</h3>
      <p>
        Like TOTP but instead of time, a monotonically increasing counter is
        hashed. Older hardware tokens (RSA SecurID-style) are the canonical
        example.
      </p>
      <h3>Flash-call / silent authentication</h3>
      <p>
        A newer pattern where the carrier verifies possession of a number
        without any user-facing code. Faster and cheaper but less compatible.{' '}
        <Link href="/blog/silent-authentication-vs-otp-india">
          When to choose silent authentication over OTP
        </Link>{' '}
        explores the trade-offs.
      </p>

      <h2 id="where-used">Where OTPs Are Used</h2>
      <p>
        OTPs show up almost any time a system needs to verify either{' '}
        <em>identity</em> or <em>intent</em>:
      </p>
      <ul>
        <li>
          <strong>Login &amp; signup.</strong> Phone-number-based auth on
          consumer apps, password-less login flows, and second-factor checks
          after a password.
        </li>
        <li>
          <strong>Payments &amp; high-value transactions.</strong> RBI-mandated
          additional-factor authentication on Indian card payments, UPI
          transactions over a threshold, mutual-fund redemptions, demat-account
          changes.
        </li>
        <li>
          <strong>Account-recovery flows.</strong> Reset password, change phone
          number, recover deleted account.
        </li>
        <li>
          <strong>Sensitive actions.</strong> Withdraw funds, change beneficiary,
          delete data, place a large order.
        </li>
        <li>
          <strong>Delivery handoff.</strong> Food-delivery driver hands over the
          order, courier delivers a Bluetooth lock, you pick up a parcel from a
          locker.
        </li>
      </ul>

      <h2 id="security">Why OTPs Matter for Security</h2>
      <p>
        A correctly implemented OTP defends against three of the most common
        attacks on user accounts:
      </p>
      <ul>
        <li>
          <strong>Credential stuffing.</strong> Even if an attacker has your
          email/password from an unrelated breach, they cannot log in without
          the OTP.
        </li>
        <li>
          <strong>Brute-forcing passwords.</strong> The OTP step throttles
          attempts and adds an unbypassable delay.
        </li>
        <li>
          <strong>Session theft on shared computers.</strong> The user must
          actively prove possession of their phone to extend or escalate a
          session.
        </li>
      </ul>
      <p>
        OTP is not a complete defence — see the limitations section — but it
        raises the cost of attack by orders of magnitude. NIST, ISO/IEC 27001,
        India&rsquo;s RBI, and SEBI all explicitly require OTP or an equivalent
        second factor for sensitive flows.
      </p>

      <h2 id="limitations">Limitations of OTP</h2>
      <p>
        It is important to be honest about what OTPs do <em>not</em> protect
        against:
      </p>
      <ul>
        <li>
          <strong>Phishing.</strong> A fake login page that proxies the OTP to
          the real site in real time can complete the login. TOTP and FIDO2
          (passkeys) are stronger here.
        </li>
        <li>
          <strong>SIM swapping.</strong> An attacker socially engineers the
          telco into porting the victim&rsquo;s number, then receives the OTPs.
          Read our guide on{' '}
          <Link href="/blog/sim-swap-otp-protection-india">
            protecting users from SIM swap attacks
          </Link>
          .
        </li>
        <li>
          <strong>Bot-driven traffic pumping.</strong> Attackers trigger OTP
          sends at scale to inflate your SMS bill.{' '}
          <Link href="/blog/otp-bot-attacks-traffic-pumping">
            How to defend against OTP traffic pumping
          </Link>{' '}
          covers the full playbook.
        </li>
      </ul>

      <h2 id="add-to-app">How to Add OTP to Your App</h2>
      <p>
        The fastest path is to call a managed OTP API rather than build the
        cryptography, retry logic, and DLT compliance yourself. With
        StartMessaging it is two HTTP calls:
      </p>
      <pre>
        <code>{`// 1. Send
POST /otp/send  { "phoneNumber": "+919876543210" }
// → { requestId, expiresAt, attemptsLeft }

// 2. Verify
POST /otp/verify  { "requestId": "...", "otpCode": "482910" }
// → { verified: true }`}</code>
      </pre>
      <p>
        Concrete walk-throughs for the most popular stacks:{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-python">Python</Link>,{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel</Link>,{' '}
        <Link href="/blog/send-otp-django">Django</Link>,{' '}
        <Link href="/blog/send-otp-nextjs-app-router">Next.js App Router</Link>,
        and many more in our{' '}
        <Link href="/blog">developer tutorial library</Link>.
      </p>

      <h2 id="india-context">OTP in the Indian Context (DLT, TRAI)</h2>
      <p>
        India is unique in that every entity sending bulk SMS — including OTPs
        — must register on the DLT (Distributed Ledger Technology) platform run
        by telecom operators, with pre-approved templates and a registered
        sender ID. This adds 1–4 weeks of compliance work and an ongoing
        template-approval process.
      </p>
      <p>
        StartMessaging absorbs this entirely:{' '}
        <Link href="/dlt-free-otp">we run the DLT compliance for you</Link>, so
        your team can ship OTP login the same day. We handle PE-ID
        registration, sender-ID approval, and TRAI message-scrubbing rules. See
        our{' '}
        <Link href="/blog/what-is-dlt-registration-india">
          DLT registration explainer
        </Link>{' '}
        if you want to understand what is happening on our side.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Ready to ship phone-number-based auth?{' '}
        <Link href="https://app.startmessaging.com/register">
          Sign up for a StartMessaging account
        </Link>{' '}
        and send your first OTP in five minutes — at Rs 0.25 per OTP, no DLT
        registration required.
      </p>
    </>
  ),
};
