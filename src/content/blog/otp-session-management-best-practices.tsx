import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-session-management-best-practices',
  title: 'OTP Session Management Best Practices (2026)',
  description:
    'How to manage sessions before, during and after OTP verification. Partial sessions, signed cookies, JWT vs server-side sessions, and idle vs absolute timeouts.',
  category: 'security',
  keywords: [
    'otp session management',
    'session after otp',
    'jwt otp',
    'partial session otp',
    'otp cookie',
  ],
  publishedAt: '2026-05-19',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'phases', title: 'Three Session Phases' },
    { id: 'partial', title: 'Partial Session (Pre-Verify)' },
    { id: 'verified', title: 'Verified Session' },
    { id: 'cookies-vs-jwt', title: 'Cookies vs JWT' },
    { id: 'timeouts', title: 'Idle vs Absolute Timeouts' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-verification-flow',
    'otp-resend-cooldown-implementation',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'How long should a verified session last?',
      answer:
        'For consumer apps, 30 days idle / 90 days absolute is typical. For financial apps, 30 minutes idle / 24 hours absolute. SEBI broking apps need shorter still.',
    },
  ],
  content: (
    <>
      <p>
        Session management around OTP has three phases: pre-verify partial
        session, the verify-itself transaction, and the post-verify
        long-lived session. Each has its own rules.
      </p>

      <h2 id="phases">Three Session Phases</h2>
      <ol>
        <li>Pre-verify: holds requestId only, 15-min TTL.</li>
        <li>Verify: short transaction, no new session.</li>
        <li>Post-verify: long-lived session with role + expiry.</li>
      </ol>

      <h2 id="partial">Partial Session (Pre-Verify)</h2>
      <ul>
        <li>HTTP-only cookie or short-lived JWT.</li>
        <li>Holds the OTP requestId, not user identity yet.</li>
        <li>15-minute TTL aligned with OTP expiry.</li>
      </ul>

      <h2 id="verified">Verified Session</h2>
      <ul>
        <li>Issue after successful verify.</li>
        <li>Bind to user ID, device fingerprint, role.</li>
        <li>Set idle and absolute timeouts.</li>
      </ul>

      <h2 id="cookies-vs-jwt">Cookies vs JWT</h2>
      <ul>
        <li>Server-side sessions: revocable, simpler, slightly more state.</li>
        <li>JWT: stateless, harder to revoke, beware of long expiry.</li>
        <li>Most consumer apps use signed-cookie sessions; SaaS APIs use short-lived JWT + refresh.</li>
      </ul>

      <h2 id="timeouts">Idle vs Absolute Timeouts</h2>
      <ul>
        <li>Idle: time since last interaction.</li>
        <li>Absolute: time since session creation.</li>
        <li>Both checked on every request.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Tie session expiry to action sensitivity: read-only sessions can
        live longer than write-capable ones.
      </p>
    </>
  ),
};
