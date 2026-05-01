import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-stock-broking-apps-india',
  title: 'OTP for Stock Broking Apps in India (SEBI 2FA Rules)',
  description:
    'How stock-broking apps in India implement SEBI-mandated 2FA OTP, KYC OTP, order-placement step-up, and post-trade confirmation SMS — with audit-trail patterns.',
  category: 'use-cases',
  keywords: [
    'stock broking otp',
    'sebi 2fa otp',
    'demat otp',
    'order placement otp',
    'broker login otp',
    'sebi compliance sms',
  ],
  publishedAt: '2026-05-01',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Broker Apps Need Strict OTP' },
    { id: 'sebi', title: 'SEBI 2FA Rules Snapshot' },
    { id: 'flows', title: 'OTP Flows in a Broker App' },
    { id: 'order-step-up', title: 'Order-Placement Step-Up' },
    { id: 'audit', title: 'Audit Trail Expectations' },
    { id: 'patterns', title: 'Production Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-mutual-fund-apps-india',
    'rbi-2fa-2026-mandate',
    'otp-fintech-india',
    'otp-nbfc-loan-apps-india',
  ],
  faq: [
    {
      question: 'Does SEBI require 2FA on every login or only first login?',
      answer:
        'SEBI requires 2FA on every login. &ldquo;Trusted device&rdquo; suppression is not a permitted shortcut. Some brokers offer biometrics as the second factor on registered devices.',
    },
    {
      question: 'Should I OTP every order or just high-value ones?',
      answer:
        'Login 2FA is mandatory; per-order OTP is broker discretion. Most brokers require step-up OTP only for high-value, F&O, or pledge / unpledge actions — and on any session past a quiet-hours threshold.',
    },
    {
      question: 'How long do I retain order-OTP audit logs?',
      answer:
        'SEBI guidelines align with stockbroker bookkeeping rules — 8 years minimum. Retain the OTP requestId, action and verification status, never the plaintext.',
    },
  ],
  content: (
    <>
      <p>
        Indian stock-broking apps live under one of the strictest 2FA
        regimes in financial services. SEBI mandates two-factor login for
        every session, and brokers layer on order-placement step-up,
        F&amp;O-margin OTPs, and post-trade confirmation SMS — all of which
        must reach customers in seconds, every time.
      </p>

      <h2 id="context">Why Broker Apps Need Strict OTP</h2>
      <ul>
        <li>SEBI 2FA mandate on every login.</li>
        <li>High-frequency trader users — latency matters.</li>
        <li>Order-takeover fraud is a constant threat.</li>
        <li>Audit trail for every order is mandatory.</li>
      </ul>

      <h2 id="sebi">SEBI 2FA Rules Snapshot</h2>
      <ul>
        <li>Two-factor authentication on every login.</li>
        <li>Mandatory cool-down between failed attempts.</li>
        <li>Audit log of authentication events.</li>
        <li>OTP delivery failure must trigger fall-back without bypassing 2FA.</li>
      </ul>
      <p>
        See our broader guide to{' '}
        <Link href="/blog/rbi-2fa-2026-mandate">India 2FA mandates</Link>.
      </p>

      <h2 id="flows">OTP Flows in a Broker App</h2>
      <ol>
        <li>Login OTP — every session.</li>
        <li>Funds-add OTP from bank.</li>
        <li>Pledge / unpledge OTP.</li>
        <li>F&amp;O margin call OTP.</li>
        <li>High-value order OTP step-up.</li>
        <li>Withdrawal OTP.</li>
        <li>Post-trade confirmation SMS.</li>
      </ol>

      <h2 id="order-step-up">Order-Placement Step-Up</h2>
      <p>Broker-specific patterns:</p>
      <ul>
        <li>Threshold-based — orders &gt; Rs 5L trigger fresh OTP.</li>
        <li>Off-hours — orders during pre-market or after hours require step-up.</li>
        <li>New segment — first F&amp;O order requires step-up + risk disclosure consent.</li>
      </ul>

      <h2 id="audit">Audit Trail Expectations</h2>
      <ul>
        <li>OTP requestId per login and per high-value order.</li>
        <li>IP address, deviceId, user-agent at OTP issue time.</li>
        <li>Verification status with attempts used.</li>
        <li>Retain 8+ years.</li>
      </ul>

      <h2 id="patterns">Production Patterns</h2>
      <ul>
        <li>Multi-provider failover SMS — a missed login OTP is a lost session.</li>
        <li>Voice OTP fallback for users with SMS issues.</li>
        <li>Strict per-phone rate limit to defeat OTP-pumping during F&amp;O margin calls.</li>
        <li>Real-time DLR webhook so support can see exactly where an OTP failed.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> ships
        sub-second-latency SMS via multi-provider routes — well-suited to
        SEBI 2FA workloads where every missed login is a customer escalation.
      </p>
    </>
  ),
};
