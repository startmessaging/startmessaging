import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-bot-attacks-traffic-pumping',
  title: 'OTP Bot Attacks & SMS Traffic Pumping: Detection and Defense',
  description:
    'How attackers exploit OTP send endpoints with bots and SMS traffic pumping schemes — and the rate limits, fingerprinting, and routing controls that stop them.',
  category: 'security',
  keywords: [
    'otp bot attack',
    'sms traffic pumping',
    'sms toll fraud',
    'otp api abuse',
    'sms pumping prevention',
    'phone verification bot defense',
    'twilio toll fraud',
    'sms traffic pumping india',
    'rate limit otp send',
    'imsi pumping fraud',
  ],
  publishedAt: '2026-04-30',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Security' },
  tableOfContents: [
    { id: 'what-is-pumping', title: 'What is SMS Traffic Pumping' },
    { id: 'how-attacks-work', title: 'How OTP Bot Attacks Work' },
    { id: 'detection', title: 'Detection Signals' },
    { id: 'rate-limiting', title: 'Layered Rate Limiting' },
    { id: 'fingerprinting', title: 'Device & Behavior Fingerprinting' },
    { id: 'routing', title: 'Routing-Level Controls' },
    { id: 'india-context', title: 'The Indian Context' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['prevent-otp-fraud', 'otp-rate-limiting-guide', 'otp-security-best-practices'],
  faq: [
    {
      question: 'How much can SMS pumping cost a startup?',
      answer:
        'Real incidents have ranged from a few thousand dollars over a weekend to over $100K in a single weekend for high-profile apps. The risk scales with your wallet balance and how generous your send rate limits are.',
    },
    {
      question: 'Does StartMessaging help detect pumping?',
      answer:
        'Yes. StartMessaging\'s standard routes apply per-IP and per-phone rate limits at the API edge, and our risk engine flags bursts of sends to high-risk number ranges. You should still apply rate limits in your own application.',
    },
    {
      question: 'Are Indian numbers exposed to pumping?',
      answer:
        'India is less affected than premium-rate ranges in some Eastern European or African countries because Indian carrier termination fees are low. The bigger risk for Indian apps is bot abuse that wastes wallet credit and clogs delivery, even if no pumping kickback exists.',
    },
  ],
  content: (
    <>
      <p>
        SMS traffic pumping (also called toll fraud or IMSI pumping) is one of
        the fastest-growing attack types against verification APIs in 2026.
        Bots hammer your <code>/send-otp</code> endpoint with phone numbers in
        ranges where the attacker collects a kickback from the terminating
        carrier. Even when no kickback exists, OTP bot attacks burn your
        wallet, slow legitimate delivery, and make your fraud team look bad.
      </p>

      <h2 id="what-is-pumping">What is SMS Traffic Pumping</h2>
      <p>
        SMS pumping happens when an attacker controls (or has revenue-share
        with) a small mobile operator. They generate fake signups on your app
        with phone numbers in that operator&rsquo;s range. Every SMS you send
        terminates on the operator&rsquo;s network and they pocket part of
        the termination fee. You pay; they earn.
      </p>

      <h2 id="how-attacks-work">How OTP Bot Attacks Work</h2>
      <ol>
        <li>
          Attacker scripts a bot to hit your public signup or login page.
        </li>
        <li>
          Bot fills in random phone numbers in target ranges (often premium
          number plans in less-developed mobile markets).
        </li>
        <li>
          Bot triggers <code>/send-otp</code> hundreds or thousands of times
          per minute.
        </li>
        <li>
          Bot never enters the OTP &mdash; the goal is the SMS bill, not the
          login.
        </li>
      </ol>

      <h2 id="detection">Detection Signals</h2>
      <ul>
        <li>
          <strong>Send-to-verify ratio drops.</strong> A healthy app verifies
          ~80&ndash;95% of sends. Pumping attacks push that toward 0%.
        </li>
        <li>
          <strong>Phone-number diversity spikes.</strong> Suddenly thousands of
          unique numbers from a country where you have ~zero real users.
        </li>
        <li>
          <strong>IP concentration.</strong> A handful of IPs (or a single
          ASN) generating most sends.
        </li>
        <li>
          <strong>Time-of-day pattern breaks.</strong> Real users follow
          time-of-day curves; bots hit flat 24/7 RPS.
        </li>
      </ul>

      <h2 id="rate-limiting">Layered Rate Limiting</h2>
      <p>
        One rate limit is not enough. Combine three:
      </p>
      <ol>
        <li>
          <strong>Per phone number:</strong> max 3 sends per 10 minutes per
          E.164 number. See our{' '}
          <Link href="/blog/otp-rate-limiting-guide">
            OTP rate limiting guide
          </Link>
          .
        </li>
        <li>
          <strong>Per IP address:</strong> max 5 sends per minute per IP, with
          stricter limits for unauthenticated traffic.
        </li>
        <li>
          <strong>Per device fingerprint:</strong> max 10 sends per day per
          fingerprint regardless of phone or IP.
        </li>
      </ol>

      <h2 id="fingerprinting">Device &amp; Behavior Fingerprinting</h2>
      <p>
        Use a lightweight fingerprint library on your signup form to bind a
        browser to a stable ID. Combine it with bot-detection signals like
        mouse-move entropy, time-on-form, and challenge tokens (Turnstile,
        hCaptcha). Real users dwell, scroll, and tab; bots POST and leave.
      </p>

      <h2 id="routing">Routing-Level Controls</h2>
      <p>
        At StartMessaging we apply edge filters to drop sends to high-risk
        number ranges before they hit a carrier. You should also restrict your
        own app to only the country codes you serve &mdash; if you only have
        Indian users, refuse +44 / +1 / +234 phone numbers at the API gate.
      </p>

      <h2 id="india-context">The Indian Context</h2>
      <p>
        Indian carrier termination fees are low, so direct pumping kickbacks
        are rare for +91 numbers. The bigger threat for Indian apps is bot
        abuse that blows the wallet and chokes legitimate delivery. Combine
        the controls above with{' '}
        <Link href="/blog/prevent-otp-fraud">
          our broader OTP fraud guide
        </Link>{' '}
        for full coverage.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Want a deeper read? See our{' '}
        <Link href="/blog/otp-security-best-practices">
          OTP security best practices
        </Link>{' '}
        article.
      </p>
    </>
  ),
};
