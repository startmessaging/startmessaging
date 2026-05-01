import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'how-otp-works-step-by-step',
  title: 'How OTP Works: A Step-by-Step Walkthrough (2026)',
  description:
    'A step-by-step explanation of what happens when you click "Send OTP": from generation and hashing on the server, to telecom routing in India, to verification and replay protection.',
  category: 'security',
  keywords: [
    'how otp works',
    'how does otp work',
    'otp step by step',
    'otp flow explained',
    'otp generation algorithm',
    'how sms otp works india',
  ],
  publishedAt: '2026-04-27',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'step-1', title: '1. User Triggers a Flow' },
    { id: 'step-2', title: '2. Backend Calls the OTP API' },
    { id: 'step-3', title: '3. Code Generation and Hashing' },
    { id: 'step-4', title: '4. SMS Delivery (India Specifics)' },
    { id: 'step-5', title: '5. User Reads (or Auto-Fills) the Code' },
    { id: 'step-6', title: '6. Verification' },
    { id: 'step-7', title: '7. Session Issuance' },
    { id: 'attacks', title: 'Where the Attacks Hit' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-otp',
    'what-is-sms-otp',
    'otp-verification-flow',
    'otp-security-best-practices',
    'sim-swap-otp-protection-india',
  ],
  faq: [
    {
      question: 'How is the OTP code generated?',
      answer:
        'A cryptographically secure RNG produces a number in the [10^(d-1), 10^d) range, where d is the configured digit count (typically 6). Using crypto.randomInt or crypto/rand on the server is mandatory; Math.random or Python random.randint are not acceptable.',
    },
    {
      question: 'Is the plaintext OTP ever stored?',
      answer:
        'It should not be. Production OTP services hash the code with bcrypt or scrypt and store only the hash. The plaintext lives only in the SMS body and the user\'s phone for the validity window.',
    },
    {
      question: 'What happens if the user enters the wrong code?',
      answer:
        'The verify endpoint decrements an attempt counter (default 3) and returns an error. Once attempts reach zero, the request ID is invalidated and the user must request a new OTP.',
    },
    {
      question: 'Why does my OTP take 30 seconds sometimes?',
      answer:
        'Network jitter on the carrier side, DLT scrubbing checks, or transient aggregator issues. P50 of a healthy gateway should be well under 6 seconds; consistent 30-second latency means a provider problem.',
    },
  ],
  content: (
    <>
      <p>
        The phrase &ldquo;OTP login&rdquo; hides a surprising amount of moving
        parts: a cryptographic generator, a multi-step delivery pipeline that
        crosses operator boundaries, a hashing routine, attempt counters, and
        an idempotency layer. This guide walks through each step in order so
        that next time something fails in production, you know exactly where
        to look.
      </p>

      <h2 id="overview">Overview</h2>
      <p>
        Seven steps from button-press to authenticated session:
      </p>
      <ol>
        <li>User triggers the flow.</li>
        <li>Backend calls the OTP API.</li>
        <li>Code generation and hashing.</li>
        <li>SMS delivery (with India-specific DLT).</li>
        <li>User reads or auto-fills the code.</li>
        <li>Verification.</li>
        <li>Session issuance.</li>
      </ol>

      <h2 id="step-1">1. User Triggers a Flow</h2>
      <p>
        Tap &ldquo;Send OTP&rdquo;, &ldquo;Pay&rdquo;, or &ldquo;Verify&rdquo;.
        The frontend POSTs to <code>/auth/send-otp</code> with the phone
        number. Critical here: validate format on the server, never trust the
        client. Use E.164 (<code>+919876543210</code>).
      </p>

      <h2 id="step-2">2. Backend Calls the OTP API</h2>
      <p>
        Your server calls the OTP service&rsquo;s <code>/otp/send</code> with
        an idempotency key. Including the key protects against{' '}
        <Link href="/blog/idempotency-keys-otp">duplicate sends</Link> when a
        retry kicks in.
      </p>

      <h2 id="step-3">3. Code Generation and Hashing</h2>
      <ol>
        <li>
          The OTP service uses a CSPRNG (typically{' '}
          <code>crypto.randomInt</code>) to pick a 6-digit code from{' '}
          <code>[100000, 999999]</code>.
        </li>
        <li>
          A bcrypt or scrypt hash of the code is computed with a cost factor
          of 10–12.
        </li>
        <li>
          The hash is persisted with <code>(requestId, expiresAt,
          attemptsLeft, idempotencyKey)</code>.
        </li>
        <li>
          The plaintext code is held in memory only long enough to be passed
          to the SMS gateway.
        </li>
      </ol>

      <h2 id="step-4">4. SMS Delivery (India Specifics)</h2>
      <p>
        On Indian networks the message is enriched with the registered{' '}
        <Link href="/blog/what-is-sms-sender-id">sender ID</Link>, matched to
        a pre-approved DLT template, and submitted to a multi-provider
        gateway. Each operator&rsquo;s network independently:
      </p>
      <ul>
        <li>Verifies sender ID + template ID + PE-ID match.</li>
        <li>
          Runs <Link href="/blog/trai-message-scrubbing-india">TRAI
          scrubbing</Link> for prohibited keywords or DND categories.
        </li>
        <li>Submits to the SMSC, which routes to the recipient handset.</li>
      </ul>
      <p>
        Latency: P50 ~3s, P95 ~10–15s on a healthy route. Failures appear as
        DLR codes returned to the gateway and surfaced via webhook.
      </p>

      <h2 id="step-5">5. User Reads (or Auto-Fills) the Code</h2>
      <p>The arrival path on the user device:</p>
      <ul>
        <li>
          <strong>Android:</strong> the OS uses the SMS Retriever API or
          AutoFill to surface the code without permissions.
        </li>
        <li>
          <strong>iOS:</strong> the keyboard suggestion bar offers the code
          extracted from the most recent SMS.
        </li>
        <li>
          <strong>Manual:</strong> user reads and types.
        </li>
      </ul>
      <p>
        See our breakdown of{' '}
        <Link href="/blog/otp-autofill-android-ios-sms-retriever">
          OTP auto-fill on Android and iOS
        </Link>{' '}
        for the implementation details.
      </p>

      <h2 id="step-6">6. Verification</h2>
      <ol>
        <li>
          Frontend submits <code>(requestId, otpCode)</code> to{' '}
          <code>/auth/verify-otp</code>.
        </li>
        <li>
          Backend forwards to <code>/otp/verify</code>.
        </li>
        <li>
          OTP service hashes the submitted code and compares against the
          stored hash in constant time.
        </li>
        <li>
          On success: invalidate the request ID so it cannot be reused.
        </li>
        <li>
          On wrong code: decrement <code>attemptsLeft</code>; on zero,
          invalidate the request.
        </li>
        <li>On expiry: return 410 Gone.</li>
      </ol>

      <h2 id="step-7">7. Session Issuance</h2>
      <p>
        After successful verification, your backend issues a session — a JWT,
        a signed cookie, or a server-side session row — and returns it to the
        client. The OTP&rsquo;s job is done; from this point on the user is
        authenticated by their session token, not the OTP.
      </p>

      <h2 id="attacks">Where the Attacks Hit</h2>
      <ul>
        <li>
          <strong>Step 2 — pumping.</strong> Bots fire random phone numbers to
          burn your SMS budget.{' '}
          <Link href="/blog/otp-bot-attacks-traffic-pumping">Defence guide</Link>.
        </li>
        <li>
          <strong>Step 4 — interception.</strong> SS7 attacks, SIM swap. See{' '}
          <Link href="/blog/sim-swap-otp-protection-india">SIM swap defence</Link>.
        </li>
        <li>
          <strong>Step 5 — phishing.</strong> Real-time phishing pages capture
          the OTP and replay it on the real site within the validity window.
        </li>
        <li>
          <strong>Step 6 — brute force.</strong> Without attempt limits, an
          attacker could try all 10^6 codes in seconds.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        StartMessaging implements all of steps 2–6 on your behalf. Your code
        deals with steps 1 and 7. Get the{' '}
        <Link href="/dlt-free-otp">DLT-free OTP API</Link> running in five
        minutes.
      </p>
    </>
  ),
};
