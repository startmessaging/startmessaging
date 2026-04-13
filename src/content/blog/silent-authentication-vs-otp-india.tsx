import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'silent-authentication-vs-otp-india',
  title: 'Silent Network Authentication vs SMS OTP in India (2026)',
  description:
    'Silent Network Authentication is being piloted by Indian banks and telcos. How it differs from SMS OTP, when to use each, and why OTP isn\'t going away.',
  category: 'security',
  keywords: [
    'silent authentication india',
    'silent network authentication',
    'sna vs sms otp',
    'mobile number verify api india',
    'india telco silent auth',
    'rbi silent authentication',
    'tower-based otp',
    'sms otp alternative india',
    'frictionless authentication india',
    'sna fintech india',
  ],
  publishedAt: '2026-05-04',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Security' },
  tableOfContents: [
    { id: 'what-is-sna', title: 'What is Silent Network Authentication' },
    { id: 'how-it-works', title: 'How It Works' },
    { id: 'india-pilots', title: 'Indian Pilots in 2026' },
    { id: 'sna-vs-otp', title: 'SNA vs SMS OTP' },
    { id: 'when-each', title: 'When to Use Each' },
    { id: 'why-otp-stays', title: 'Why SMS OTP Isn\'t Going Away' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['rbi-2fa-2026-mandate', 'sim-swap-otp-protection-india', 'voice-otp-vs-sms-otp-india'],
  faq: [
    {
      question: 'Does SNA require an internet connection?',
      answer:
        'It requires an active mobile data session over the cellular network — Wi-Fi alone won\'t work because the verification happens at the carrier level. That\'s why fallback to SMS OTP is essential.',
    },
    {
      question: 'Will SNA replace SMS OTP in India?',
      answer:
        'Not for years. Carrier coverage is still partial, feature phones can\'t use it, and many users disable mobile data to save costs. SMS OTP remains the fallback and the universal option.',
    },
    {
      question: 'Is SNA cheaper than SMS OTP?',
      answer:
        'Per-call SNA pricing in India is roughly comparable to SMS OTP today. The cost savings come from improved conversion (no user-typed code) rather than per-verification price.',
    },
  ],
  content: (
    <>
      <p>
        Silent Network Authentication (SNA) &mdash; sometimes called Mobile
        Number Verify or Number Verification API &mdash; is the most talked-about
        OTP alternative in India in 2026. It promises a frictionless,
        SMS-free verification by checking the user&rsquo;s SIM and mobile
        session at the carrier level. Here&rsquo;s the realistic picture and
        why SMS OTP stays in the stack.
      </p>

      <h2 id="what-is-sna">What is Silent Network Authentication</h2>
      <p>
        SNA is a backend protocol where your server asks the carrier
        &ldquo;is the user currently on a mobile data session, and does the
        registered SIM match the phone number we expect?&rdquo; The carrier
        replies yes or no. The user never sees a code and never taps a
        button.
      </p>

      <h2 id="how-it-works">How It Works</h2>
      <ol>
        <li>User enters their phone number in your app.</li>
        <li>Your backend opens a verification session via the SNA provider.</li>
        <li>
          The user&rsquo;s device fetches a unique URL over the cellular data
          network (not Wi-Fi).
        </li>
        <li>
          The carrier injects a header confirming the SIM and number, which
          the SNA provider validates.
        </li>
        <li>
          Your backend gets a verified yes/no &mdash; no code, no SMS, no
          delay.
        </li>
      </ol>

      <h2 id="india-pilots">Indian Pilots in 2026</h2>
      <p>
        Multiple Indian carriers and aggregators have pilot SNA endpoints
        live in 2026. RBI&rsquo;s 2026 framework explicitly recognises
        carrier-side verification as a valid second factor. Coverage is
        growing on Jio and Airtel; Vi and BSNL coverage is still partial.
      </p>

      <h2 id="sna-vs-otp">SNA vs SMS OTP</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>SNA</th>
              <th>SMS OTP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User friction</td>
              <td>Zero (silent)</td>
              <td>~10s to read and type code</td>
            </tr>
            <tr>
              <td>SIM swap defense</td>
              <td>Strong (live SIM check)</td>
              <td>None &mdash; OTP goes to attacker SIM</td>
            </tr>
            <tr>
              <td>Wi-Fi-only users</td>
              <td>Fails &mdash; needs cellular data</td>
              <td>Works on any phone</td>
            </tr>
            <tr>
              <td>Feature phones</td>
              <td>Not supported</td>
              <td>Works</td>
            </tr>
            <tr>
              <td>Carrier coverage in India</td>
              <td>Partial (Jio/Airtel mostly)</td>
              <td>All carriers, all numbers</td>
            </tr>
            <tr>
              <td>Cost per verification</td>
              <td>~Rs 0.20&ndash;0.30</td>
              <td>~Rs 0.25 with StartMessaging</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="when-each">When to Use Each</h2>
      <ul>
        <li>
          <strong>Use SNA</strong> for frictionless re-auth on smartphones
          where you have device + SIM continuity (e.g. payment confirmation
          inside your own app).
        </li>
        <li>
          <strong>Use SMS OTP</strong> for first-time login, account recovery,
          cross-device login, and any user without active mobile data.
        </li>
        <li>
          <strong>Use both</strong> as a tiered fallback &mdash; try SNA
          first, fall back to{' '}
          <Link href="/otp-api">SMS OTP via StartMessaging</Link> if SNA
          can&rsquo;t complete.
        </li>
      </ul>

      <h2 id="why-otp-stays">Why SMS OTP Isn&rsquo;t Going Away</h2>
      <p>
        India is mobile-data-rich but Wi-Fi-also-common. A user paying at a
        cafe on Wi-Fi can&rsquo;t complete SNA &mdash; the cellular data
        session isn&rsquo;t active. Feature phones (still tens of millions
        in India) can&rsquo;t do SNA at all. Cross-device flows (login on
        laptop, verify on phone) need a code that crosses the gap. SMS OTP
        remains the universal fallback because it works on every phone in
        every network condition.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/rbi-2fa-2026-mandate">
          RBI 2026 2FA mandate breakdown
        </Link>{' '}
        for the regulatory context.
      </p>
    </>
  ),
};
