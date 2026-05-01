import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-failed-attempt-lockout-strategies',
  title: 'OTP Failed Attempt Lockout Strategies',
  description:
    'How to design lockout after repeated failed OTP entries: per-request, per-account, exponential lockout, and unlock pathways. Balance security with user-experience.',
  category: 'security',
  keywords: [
    'otp lockout',
    'failed otp attempts',
    'otp brute force protection',
    'account lockout otp',
  ],
  publishedAt: '2026-05-20',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'levels', title: 'Three Lockout Levels' },
    { id: 'request', title: 'Per-Request Lockout' },
    { id: 'account', title: 'Per-Account Lockout' },
    { id: 'unlock', title: 'Unlock Pathways' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-expiry-attempt-limits',
    'otp-rate-limiting-guide',
    'prevent-otp-fraud',
  ],
  faq: [
    {
      question: 'Should I notify the user about lockout?',
      answer:
        'Yes — &ldquo;Too many incorrect attempts. Try again in N minutes or contact support.&rdquo; Silent lockouts confuse legitimate users.',
    },
  ],
  content: (
    <>
      <p>
        Lockouts protect against brute force but kill UX if too aggressive.
        The right design uses tiers.
      </p>

      <h2 id="levels">Three Lockout Levels</h2>
      <ul>
        <li>Per-request: 3 failed attempts → invalidate the request.</li>
        <li>Per-account hour: 10 failed verifications → 1-hour lockout.</li>
        <li>Per-account day: 30 failed verifications → 24-hour lockout + alert.</li>
      </ul>

      <h2 id="request">Per-Request Lockout</h2>
      <p>
        OTP API enforces this. After 3 wrong attempts, requestId
        invalidates and the user must request a new OTP.
      </p>

      <h2 id="account">Per-Account Lockout</h2>
      <p>
        Track per-user (or per-phone-hash) failures across requests.
        Cross-request brute force is the attack mode.
      </p>

      <h2 id="unlock">Unlock Pathways</h2>
      <ul>
        <li>Time-based auto-unlock.</li>
        <li>Email link to unlock with secondary verification.</li>
        <li>Customer support manual unlock for verified KYC.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Pair lockouts with{' '}
        <Link href="/blog/otp-rate-limiting-guide">rate-limiting</Link>{' '}
        for layered defence.
      </p>
    </>
  ),
};
