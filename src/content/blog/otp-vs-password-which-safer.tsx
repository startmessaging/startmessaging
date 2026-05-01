import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-vs-password-which-safer',
  title: 'OTP vs Password: Which is Safer in 2026?',
  description:
    'OTP and password compared as authentication factors: phishing risk, brute force, sharing, regulatory positioning. Why the answer is "use both" for high-stakes flows.',
  category: 'security',
  keywords: [
    'otp vs password',
    'is otp safer than password',
    'password vs sms otp',
    'phone login vs password',
  ],
  publishedAt: '2026-05-17',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'compared', title: 'Side-by-Side Comparison' },
    { id: 'use-both', title: 'Why "Use Both" Wins' },
    { id: 'india-context', title: 'India Context' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'is-otp-secure-strengths-weaknesses',
    'what-is-2fa',
    'otp-security-best-practices',
  ],
  faq: [
    {
      question: 'Is passwordless safer?',
      answer:
        'Passwordless with passkeys is safer than passwords + OTP because passkeys resist phishing. Passwordless with SMS OTP only is no safer than password + SMS OTP — it just removes one factor.',
    },
  ],
  content: (
    <>
      <p>
        The wrong question. Passwords and OTPs defend different things.
        The right question is which to use for which step.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>Password — knowledge factor; vulnerable to leaks, reuse, phishing.</li>
        <li>OTP — possession factor; vulnerable to SIM swap, real-time phishing.</li>
        <li>Combined — covers both attack categories.</li>
      </ul>

      <h2 id="compared">Side-by-Side Comparison</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th></th><th>Password</th><th>OTP</th></tr>
          </thead>
          <tbody>
            <tr><td>Phishing</td><td>Vulnerable</td><td>Vulnerable to RT proxy</td></tr>
            <tr><td>Reuse risk</td><td>High</td><td>None (single use)</td></tr>
            <tr><td>Memorability</td><td>Low</td><td>N/A</td></tr>
            <tr><td>Cost</td><td>Free</td><td>Rs 0.25 / send</td></tr>
            <tr><td>SIM swap</td><td>Not affected</td><td>Compromised</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="use-both">Why &ldquo;Use Both&rdquo; Wins</h2>
      <p>
        Password + OTP = 2FA. The attacker must compromise two
        independent attack surfaces. Read{' '}
        <Link href="/blog/what-is-2fa">our 2FA explainer</Link>.
      </p>

      <h2 id="india-context">India Context</h2>
      <ul>
        <li>RBI AFA effectively requires the second factor.</li>
        <li>Most consumer apps use phone-OTP only (no password) for ease.</li>
        <li>Banking and SEBI-regulated apps use password + OTP.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Pick the combination that fits the value of the action: OTP-only for
        casual logins, password + OTP for sensitive flows.
      </p>
    </>
  ),
};
