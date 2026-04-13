import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'reduce-sms-otp-cost-india',
  title: 'How to Reduce Your SMS OTP Costs in India (Without Losing Reliability)',
  description:
    'Tactics that cut SMS OTP spend by 30–70% in India: rate limits, idempotency, retry control, fallback channels, and choosing the right provider.',
  category: 'business',
  keywords: [
    'reduce sms otp cost india',
    'cheap otp api india',
    'sms otp cost optimization',
    'lower sms bill india',
    'otp cost saving',
    'otp api pricing india',
    'sms otp budget',
    'pay as you go otp',
    'reduce twilio cost india',
    'sms cost optimization india',
  ],
  publishedAt: '2026-05-13',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Business' },
  tableOfContents: [
    { id: 'biggest-leaks', title: 'Where the Money Leaks' },
    { id: 'rate-limits', title: 'Rate Limit the Send Endpoint' },
    { id: 'idempotency', title: 'Use Idempotency Keys' },
    { id: 'retry-control', title: 'Retry Control' },
    { id: 'fallback', title: 'Smart Fallback Channels' },
    { id: 'provider', title: 'Choose the Right Provider' },
    { id: 'monitoring', title: 'Monitor What You Spend' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-api-pricing-comparison-india', 'pay-as-you-go-wallet-inr-sms-api', 'otp-rate-limiting-guide'],
  faq: [
    {
      question: 'What\'s a realistic SMS OTP budget for a startup?',
      answer:
        'For a B2C app with 10,000 monthly active users and a healthy 1.2 OTPs per active user, the bill at Rs 0.25 per OTP is just Rs 3,000 per month. Costs blow up only when bots, retries, or duplicate sends multiply that by 5x to 20x. The tactics in this article keep the multiplier near 1.0.',
    },
    {
      question: 'Are international SMS providers cheaper for India?',
      answer:
        'Almost never, after FX markups and DLT compliance overhead. India-first providers like StartMessaging at Rs 0.25 per OTP are usually 30–60% cheaper than international CPaaS rates converted to INR.',
    },
    {
      question: 'Is WhatsApp OTP cheaper than SMS?',
      answer:
        'WhatsApp authentication templates are cheaper per send in some countries, but in India the difference is small after factoring in template approval friction and the smartphone-only audience. Most Indian apps still default to SMS for universal coverage.',
    },
  ],
  content: (
    <>
      <p>
        OTP bills are the easiest infrastructure cost to overlook &mdash; and
        the easiest to balloon. A small bug in your retry logic can 10x your
        spend overnight. The good news: most cost leaks have one-line fixes.
      </p>

      <h2 id="biggest-leaks">Where the Money Leaks</h2>
      <ol>
        <li>
          <strong>Bot abuse on the send endpoint.</strong> No rate limits = bots
          burn your wallet.
        </li>
        <li>
          <strong>Duplicate sends from network retries.</strong> No idempotency
          key = the same OTP sends twice.
        </li>
        <li>
          <strong>Aggressive in-app retries.</strong> &ldquo;Resend&rdquo; with
          no cooldown = users tap it 5 times.
        </li>
        <li>
          <strong>Wrong-number sends.</strong> No phone validation = SMS
          delivered to non-existent numbers.
        </li>
        <li>
          <strong>Provider markup.</strong> Paying USD-priced providers in INR
          + FX + GST stack-up.
        </li>
      </ol>

      <h2 id="rate-limits">Rate Limit the Send Endpoint</h2>
      <p>
        Apply three layers of rate limits:
      </p>
      <ul>
        <li>Per phone number: 3 sends per 10 minutes.</li>
        <li>Per IP: 5 sends per minute.</li>
        <li>Per device fingerprint: 10 sends per day.</li>
      </ul>
      <p>
        Implementation details in our{' '}
        <Link href="/blog/otp-rate-limiting-guide">
          OTP rate limiting guide
        </Link>
        .
      </p>

      <h2 id="idempotency">Use Idempotency Keys</h2>
      <p>
        Generate a UUID per send attempt and pass it as{' '}
        <code>idempotencyKey</code>. If the same key is replayed, the API
        returns the original response without sending a second SMS. This
        single change typically saves 5&ndash;15% on busy days. See{' '}
        <Link href="/blog/idempotency-keys-otp">why idempotency matters</Link>.
      </p>

      <h2 id="retry-control">Retry Control</h2>
      <ul>
        <li>Show a 30-second countdown on the resend button.</li>
        <li>
          On the server, debounce sends per phone &mdash; if the last send
          was less than 30 seconds ago, return the existing requestId.
        </li>
        <li>
          Don&rsquo;t auto-retry from the client on network failure; the
          retry creates a duplicate the user can&rsquo;t see.
        </li>
      </ul>

      <h2 id="fallback">Smart Fallback Channels</h2>
      <p>
        For repeat-failed deliveries to the same number, fall back to voice
        OTP (more expensive but higher delivery) or email. Don&rsquo;t fall
        back blindly &mdash; check the failure code first. A
        &ldquo;number does not exist&rdquo; error doesn&rsquo;t deserve a
        voice retry.
      </p>

      <h2 id="provider">Choose the Right Provider</h2>
      <p>
        India-first providers like StartMessaging at Rs 0.25 per OTP
        outpace international CPaaS rates by 30&ndash;60% after FX and GST.
        Compare your current vendor in our{' '}
        <Link href="/blog/otp-api-pricing-comparison-india">
          pricing comparison
        </Link>
        .
      </p>

      <h2 id="monitoring">Monitor What You Spend</h2>
      <p>
        Set up a daily anomaly alert: if today&rsquo;s OTP send volume is
        more than 2x the trailing 7-day average, page someone. Most cost
        explosions are visible 30 minutes before they become catastrophic.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/pay-as-you-go-wallet-inr-sms-api">
          pay-as-you-go wallet article
        </Link>{' '}
        for billing model details.
      </p>
    </>
  ),
};
