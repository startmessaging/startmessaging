import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'sebi-2fa-trading-apps-india',
  title: 'SEBI 2FA Rules for Trading Apps in India',
  description:
    'SEBI 2FA rules summarised for stock-broking and trading-app developers: every-login enforcement, biometric alternatives, audit retention, and pitfalls to avoid.',
  category: 'compliance',
  keywords: [
    'sebi 2fa',
    'trading app 2fa',
    'broker 2fa india',
    'demat 2fa rules',
    'sebi otp',
  ],
  publishedAt: '2026-05-05',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'every-login', title: 'Every-Login Mandate' },
    { id: 'biometric', title: 'Biometric as Second Factor' },
    { id: 'order-step-up', title: 'Order-Placement Step-Up' },
    { id: 'audit', title: 'Audit Retention' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-stock-broking-apps-india',
    'rbi-2fa-2026-mandate',
    'rbi-afa-guidelines-otp-2026',
    'otp-mutual-fund-apps-india',
  ],
  faq: [
    {
      question: 'Is "remember device" allowed under SEBI 2FA?',
      answer:
        'Trusted-device suppression is not permitted. SEBI requires fresh second factor on every login.',
    },
    {
      question: 'Can biometric replace OTP entirely?',
      answer:
        'On registered mobile apps with platform-grade biometric (iOS Face ID, Android Biometric), yes. The biometric is the possession + inherence factor; the device registration record satisfies the audit requirement.',
    },
  ],
  content: (
    <>
      <p>
        SEBI&rsquo;s 2FA framework for stockbrokers is one of the strictest
        in financial services. Every login requires fresh second factor.
        Most brokers default to SMS OTP; modern brokers layer biometric on
        registered devices.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>Every-login 2FA.</li>
        <li>Order-placement step-up at broker discretion.</li>
        <li>Mandatory cool-down on failed attempts.</li>
        <li>Audit log of authentication events.</li>
      </ul>

      <h2 id="every-login">Every-Login Mandate</h2>
      <p>
        Trusted-device suppression is not allowed. Persistent sessions are
        capped per SEBI guidance.
      </p>

      <h2 id="biometric">Biometric as Second Factor</h2>
      <p>
        Platform-grade biometric on a registered mobile is permitted. The
        device registration ties biometric proof to the user identity.
      </p>

      <h2 id="order-step-up">Order-Placement Step-Up</h2>
      <ul>
        <li>High-value orders trigger fresh OTP.</li>
        <li>F&amp;O margin calls — step-up.</li>
        <li>Pledge / unpledge — fresh OTP.</li>
      </ul>

      <h2 id="audit">Audit Retention</h2>
      <p>
        Minimum 8 years per stockbroker bookkeeping rules. Retain
        (requestId, action, status, IP, deviceId, timestamp).
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> ships
        sub-second-latency SMS OTPs that meet SEBI&rsquo;s every-login bar
        for production trading apps.
      </p>
    </>
  ),
};
