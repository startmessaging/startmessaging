import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'rbi-2fa-2026-mandate',
  title: 'RBI 2026 Mandatory 2FA Rules: What Indian Apps Must Do',
  description:
    'Plain-English summary of RBI\'s April 2026 mandatory 2FA rules for digital payments, what counts as a valid second factor, and how OTP fits in.',
  category: 'security',
  keywords: [
    'rbi 2fa 2026',
    'rbi 2fa mandate digital payments',
    'rbi additional factor authentication',
    'rbi otp rules 2026',
    'rbi 2fa india fintech',
    'rbi second factor authentication',
    'india digital payment rules 2026',
    'rbi otp guidelines',
    'fintech compliance india 2026',
    'rbi sms otp regulation',
  ],
  publishedAt: '2026-05-03',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Compliance' },
  tableOfContents: [
    { id: 'what-changed', title: 'What Changed in April 2026' },
    { id: 'who-is-affected', title: 'Who is Affected' },
    { id: 'valid-factors', title: 'What Counts as a Valid Second Factor' },
    { id: 'where-otp-fits', title: 'Where SMS OTP Still Fits' },
    { id: 'exemptions', title: 'Exemptions and Risk-Based Auth' },
    { id: 'implementation', title: 'Implementation Checklist' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['silent-authentication-vs-otp-india', 'sim-swap-otp-protection-india', 'otp-fintech-india'],
  faq: [
    {
      question: 'Is SMS OTP still allowed under the 2026 mandate?',
      answer:
        'Yes. SMS OTP remains a recognised second factor for most transaction tiers. RBI is encouraging dynamic methods (like silent network auth and biometrics) for the highest-risk transactions, but SMS OTP is still valid.',
    },
    {
      question: 'Do small merchants need to comply?',
      answer:
        'The mandate applies to issuers and aggregators handling digital payments — banks, PA/PG aggregators, prepaid wallets, and UPI handles. Small merchants comply transitively through their payment gateway.',
    },
    {
      question: 'What\'s the penalty for non-compliance?',
      answer:
        'RBI can impose monetary penalties under the Payment and Settlement Systems Act and, in serious cases, suspend the entity\'s payment authorization. Most teams treat this as a hard launch blocker.',
    },
  ],
  content: (
    <>
      <p>
        From 1 April 2026, the Reserve Bank of India requires every digital
        payment to be protected by an &ldquo;additional factor of
        authentication&rdquo; (AFA). The headline grabbed attention but the
        operational details matter more &mdash; and SMS OTP is still a
        recognised second factor for most transaction tiers.
      </p>

      <h2 id="what-changed">What Changed in April 2026</h2>
      <p>
        The 2026 framework moves AFA from a card-payment-only rule to a
        cross-channel rule covering UPI, prepaid wallets, recurring mandates,
        and net banking. It also introduces a risk-based tier where the
        chosen factor must scale with transaction value and user risk.
      </p>

      <h2 id="who-is-affected">Who is Affected</h2>
      <ul>
        <li>Banks (issuers and acquirers).</li>
        <li>Payment aggregators and gateways (PA/PG).</li>
        <li>Prepaid Payment Instrument (PPI) issuers and wallets.</li>
        <li>UPI apps and TPAPs.</li>
        <li>NBFCs offering BNPL or instant-credit products.</li>
      </ul>
      <p>
        Most fintech apps inherit compliance through their PG / aggregator,
        but you still need to demonstrate AFA on your own login and
        sensitive-action screens.
      </p>

      <h2 id="valid-factors">What Counts as a Valid Second Factor</h2>
      <p>
        RBI&rsquo;s framework recognises three classes:
      </p>
      <ol>
        <li>
          <strong>Something you have:</strong> SMS OTP, push notification to a
          registered device, hardware token, silent network auth.
        </li>
        <li>
          <strong>Something you are:</strong> fingerprint, face, voice, or
          other biometric.
        </li>
        <li>
          <strong>Something you know:</strong> PIN or password (no longer
          enough on its own &mdash; must combine with one of the above).
        </li>
      </ol>

      <h2 id="where-otp-fits">Where SMS OTP Still Fits</h2>
      <p>
        For most consumer apps, SMS OTP is the cheapest and most universal
        &ldquo;something you have.&rdquo; It works on every Indian phone
        regardless of OS or smartphone status. Pair it with device binding
        for high-risk actions and you satisfy AFA across the full transaction
        ladder. See our deep-dive on{' '}
        <Link href="/blog/silent-authentication-vs-otp-india">
          silent authentication vs OTP
        </Link>{' '}
        for when each fits.
      </p>

      <h2 id="exemptions">Exemptions and Risk-Based Auth</h2>
      <p>
        Low-value contactless payments under Rs 5000 may use a streamlined
        AFA flow (e.g. tap-and-go), and recurring mandates registered with
        AFA at setup don&rsquo;t require AFA on each charge. Risk-based auth
        is encouraged: skip the second factor on low-risk repeats, escalate
        on anomalies.
      </p>

      <h2 id="implementation">Implementation Checklist</h2>
      <ol>
        <li>
          Audit every authenticated action and tag its risk tier (low /
          medium / high).
        </li>
        <li>
          Map each tier to a factor combination (PIN+OTP, biometric+device,
          etc.).
        </li>
        <li>
          Add SIM-age and device-fingerprint checks for high-tier actions
          (defends against{' '}
          <Link href="/blog/sim-swap-otp-protection-india">SIM swap</Link>).
        </li>
        <li>Log every AFA event with a tamper-evident audit trail.</li>
        <li>
          Document your AFA matrix and keep it ready for the next RBI
          inspection.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Building a fintech?{' '}
        <Link href="/blog/otp-fintech-india">
          See our fintech OTP guide
        </Link>{' '}
        for the full architecture.
      </p>
    </>
  ),
};
