import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-resend-cooldown-implementation',
  title: 'Implementing OTP Resend Cooldown',
  description:
    'How to implement a polished OTP resend flow with cooldown timer, exponential back-off, server-side enforcement and clear UX. Patterns for web and mobile.',
  category: 'security',
  keywords: [
    'otp resend cooldown',
    'otp resend timer',
    'resend otp ux',
    'otp button disable',
    'resend cooldown ui',
  ],
  publishedAt: '2026-05-19',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Cooldown Matters' },
    { id: 'progressive', title: 'Progressive Cooldown' },
    { id: 'server', title: 'Server-Side Enforcement' },
    { id: 'ux', title: 'UX Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-rate-limiting-guide',
    'otp-bot-attacks-traffic-pumping',
    'otp-verification-flow',
  ],
  faq: [
    {
      question: 'What\'s a good initial cooldown?',
      answer:
        '30 seconds for the first resend, 60 for the second, 120 for the third. After three resends, force a fresh login attempt.',
    },
  ],
  content: (
    <>
      <p>
        Resend cooldowns prevent users from accidentally (or maliciously)
        firing repeated OTPs. Combined with server-side enforcement, they
        cap your wallet exposure.
      </p>

      <h2 id="why">Why Cooldown Matters</h2>
      <ul>
        <li>Wallet protection — every resend costs.</li>
        <li>Carrier rate-limit avoidance.</li>
        <li>User confusion reduction (which OTP is current?).</li>
      </ul>

      <h2 id="progressive">Progressive Cooldown</h2>
      <ul>
        <li>Resend 1: 30s.</li>
        <li>Resend 2: 60s.</li>
        <li>Resend 3: 120s.</li>
        <li>Past resend 3: lock out, restart flow.</li>
      </ul>

      <h2 id="server">Server-Side Enforcement</h2>
      <pre>
        <code>{`async function canResend(phone: string) {
  const k = \`resend:\${phone}\`;
  const count = parseInt(await redis.get(k) ?? '0');
  const since = await redis.ttl(k);
  const required = [30, 60, 120][count] ?? 999;
  return since < (required - 1) ? false : true;
}`}</code>
      </pre>

      <h2 id="ux">UX Patterns</h2>
      <ul>
        <li>Disabled button with countdown text.</li>
        <li>Auto-focus OTP input after send.</li>
        <li>Allow one-tap voice fallback after the second resend fails.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Combine with idempotency keys to handle network retries cleanly.
      </p>
    </>
  ),
};
