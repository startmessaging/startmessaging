import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-sms-otp',
  title: 'What is SMS OTP? How It Works and When to Use It',
  description:
    'SMS OTP explained: full lifecycle from generation to verification, latency, cost and SIM-swap risks, India DLT context, and modern alternatives like TOTP and silent-auth.',
  category: 'security',
  keywords: [
    'what is sms otp',
    'sms otp meaning',
    'sms one time password',
    'sms otp security',
    'sms otp india',
    'sms otp vs totp',
  ],
  publishedAt: '2026-04-24',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'SMS OTP — Definition' },
    { id: 'lifecycle', title: 'Lifecycle of an SMS OTP' },
    { id: 'why-popular', title: 'Why SMS OTP Dominates in India' },
    { id: 'limitations', title: 'Known Limitations' },
    { id: 'cost', title: 'Cost and Latency' },
    { id: 'alternatives', title: 'When to Pick Something Else' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-otp',
    'sms-otp-vs-whatsapp-otp',
    'sms-otp-vs-email-magic-link-vs-totp',
    'sim-swap-otp-protection-india',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'How long does an SMS OTP usually take to arrive?',
      answer:
        'On Indian carriers, P50 latency is typically 2–6 seconds, and P95 is 10–20 seconds with a healthy gateway. Latency above 30 seconds materially hurts login conversion; if you are seeing it, your provider is the issue.',
    },
    {
      question: 'How long should an SMS OTP be valid?',
      answer:
        '5 to 10 minutes is the consensus sweet spot. Shorter feels rushed; longer enlarges the brute-force window. StartMessaging defaults to 10 minutes.',
    },
    {
      question: 'How many digits should an SMS OTP have?',
      answer:
        '6 digits is the most common choice — 1 million combinations balances brute-force resistance with usability. 4-digit OTPs are still seen in delivery and dial-in scenarios; 8-digit is overkill for most consumer flows.',
    },
    {
      question: 'Are SMS OTPs secure enough for banking?',
      answer:
        'They meet RBI’s AFA requirements when combined with proper rate limits and SIM-swap protections. For higher-risk flows, banks layer on TOTP, biometric in-app prompts, or hardware tokens on top.',
    },
  ],
  content: (
    <>
      <p>
        SMS OTP is the most-used verification mechanism on the internet today —
        and overwhelmingly the most-used in India, where it underpins
        UPI-payment confirmation, e-commerce checkout, food-delivery handoffs,
        bank-account changes, and almost every consumer-app login. It is
        familiar, universal, and well understood by end users. It is also
        flawed in specific ways that every product team should know about.
      </p>
      <p>
        This explainer covers <strong>what SMS OTP is</strong>, the full
        lifecycle of one OTP from generation to expiry, why it remains so
        dominant, where it falls short, and the practical alternatives.
      </p>

      <h2 id="definition">SMS OTP — Definition</h2>
      <p>
        An <strong>SMS OTP</strong> is a one-time password delivered to the
        user&rsquo;s phone via SMS. The defining characteristics — single use,
        time-bound, out-of-band — are inherited from the more general OTP
        concept (see{' '}
        <Link href="/blog/what-is-otp">our OTP explainer</Link>); SMS OTP
        specifically uses SMS as the delivery channel.
      </p>

      <h2 id="lifecycle">Lifecycle of an SMS OTP</h2>
      <ol>
        <li>
          <strong>User triggers a flow</strong> — types phone number, taps
          &ldquo;Pay&rdquo;, or initiates a sensitive change.
        </li>
        <li>
          <strong>Backend calls the OTP API</strong> with the phone number.
          The API generates a 4–6 digit code, computes a bcrypt hash, stores
          (hash, expiresAt, attemptsLeft) keyed by a request ID, and dispatches
          the SMS through a multi-provider gateway.
        </li>
        <li>
          <strong>SMS travels through the gateway → aggregator → telecom
          operator → handset.</strong> In India this hop also passes through
          the DLT scrubber.
        </li>
        <li>
          <strong>User reads the code</strong> from the SMS or — on Android
          and iOS — has it auto-filled by the OS.
        </li>
        <li>
          <strong>Backend calls /otp/verify</strong> with (requestId, code).
          The API hashes and compares, decrements attempt count, returns
          verified=true or an error.
        </li>
        <li>
          <strong>Backend issues a session</strong> or completes the
          high-stakes action.
        </li>
      </ol>

      <h2 id="why-popular">Why SMS OTP Dominates in India</h2>
      <ul>
        <li>
          <strong>Universal handset support.</strong> SMS works on the cheapest
          feature phone. No app install required.
        </li>
        <li>
          <strong>Familiar UX.</strong> Indian users have entered SMS OTPs into
          banking apps for over a decade.
        </li>
        <li>
          <strong>Compliance.</strong> RBI&rsquo;s AFA mandate has been
          interpreted as &ldquo;send SMS OTP&rdquo; for so long that it is now
          industry default.
        </li>
        <li>
          <strong>Auto-fill.</strong> Modern Android (SMS Retriever API) and
          iOS auto-fill the OTP without the user typing.
        </li>
      </ul>

      <h2 id="limitations">Known Limitations</h2>
      <ul>
        <li>
          <strong>SIM swap.</strong> An attacker convinces the telecom carrier
          to port the victim&rsquo;s number to a new SIM. See{' '}
          <Link href="/blog/sim-swap-otp-protection-india">
            SIM swap protection
          </Link>
          .
        </li>
        <li>
          <strong>Phishing.</strong> A real-time phishing proxy captures both
          password and OTP and replays them within the validity window.
        </li>
        <li>
          <strong>Delivery dependence.</strong> Carrier outages, scrubbing
          rules, and template mismatches all silently drop OTPs. A failover
          provider is mandatory.
        </li>
        <li>
          <strong>Cost.</strong> Rs 0.15–0.30 per OTP adds up at scale. A
          login-burst attack can dent your budget.
        </li>
        <li>
          <strong>Bot-driven traffic pumping.</strong> Attackers fire fake
          phone numbers at your endpoint to inflate your SMS bill — see{' '}
          <Link href="/blog/otp-bot-attacks-traffic-pumping">
            our defence guide
          </Link>
          .
        </li>
      </ul>

      <h2 id="cost">Cost and Latency</h2>
      <p>
        Indian SMS OTP economics in 2026:
      </p>
      <ul>
        <li>Per-OTP cost: Rs 0.15–0.30 (Rs 0.25 with StartMessaging).</li>
        <li>P50 latency: 2–6 seconds.</li>
        <li>P95 latency: 10–20 seconds (good gateways), 30+ seconds (bad).</li>
        <li>
          DLT registration overhead: Rs 5,000 one-time + Rs 1,000–2,000/year per
          PE-ID, plus 1–4 weeks of approval lag — <em>unless</em> you use a
          DLT-free provider.
        </li>
      </ul>

      <h2 id="alternatives">When to Pick Something Else</h2>
      <ul>
        <li>
          <strong><Link href="/blog/what-is-totp">TOTP</Link></strong> — for
          power users who want free, offline, faster auth.
        </li>
        <li>
          <strong><Link href="/blog/what-is-flash-call-auth">Flash-call
          / silent auth</Link></strong> — for quick verifications where the
          carrier can confirm possession without the user reading anything.
        </li>
        <li>
          <strong>WhatsApp OTP</strong> — for app-installed users in India,
          cheaper and more visual. See{' '}
          <Link href="/blog/sms-otp-vs-whatsapp-otp">our comparison</Link>.
        </li>
        <li>
          <strong>Voice OTP</strong> — fallback when SMS is blocked or for
          users who cannot read SMS.
        </li>
        <li>
          <strong>Passkeys</strong> — for tech-forward users on modern devices,
          phishing-resistant.
        </li>
      </ul>

      <h2 id="best-practices">Best Practices</h2>
      <ul>
        <li>Hash OTPs server-side — never store plaintext.</li>
        <li>
          Limit attempts per request and per phone per hour. See{' '}
          <Link href="/blog/otp-rate-limiting-guide">rate-limiting guide</Link>.
        </li>
        <li>Log only the request ID, never the OTP.</li>
        <li>Use multi-provider failover.</li>
        <li>
          Use <Link href="/blog/idempotency-keys-otp">idempotency keys</Link> on
          the send endpoint.
        </li>
        <li>
          Watch SIM-swap signals — recent port-out, &ldquo;new device&rdquo; on
          carrier — and require a step-up auth on those sessions.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Want a production SMS OTP API today, with no DLT registration, multi-
        provider failover and Rs 0.25 per OTP?{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> is built for exactly
        this — sign up and ship in five minutes.
      </p>
    </>
  ),
};
