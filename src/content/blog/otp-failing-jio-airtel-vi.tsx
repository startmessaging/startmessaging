import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-failing-jio-airtel-vi',
  title: 'OTPs Failing on Jio / Airtel / Vi? Carrier-Specific Fixes',
  description:
    'When OTPs fail on a specific carrier — Jio, Airtel or Vi — diagnosis is different. Per-carrier failure patterns, sender-ID issues, and the failover logic that keeps you live.',
  category: 'security',
  keywords: [
    'otp not working jio',
    'otp failing airtel',
    'vi otp not delivered',
    'otp carrier issue india',
    'jio sms not received',
  ],
  publishedAt: '2026-05-14',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'patterns', title: 'Per-Carrier Failure Patterns' },
    { id: 'jio', title: 'Jio Specifics' },
    { id: 'airtel', title: 'Airtel Specifics' },
    { id: 'vi', title: 'Vi Specifics' },
    { id: 'bsnl', title: 'BSNL Specifics' },
    { id: 'failover', title: 'Failover Strategy' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-not-received-india',
    'otp-delivery-delay-fix',
    'otp-delivery-rates-india',
    'trai-message-scrubbing-india',
  ],
  faq: [
    {
      question: 'Why do OTPs fail on one carrier but not others?',
      answer:
        'Each operator runs their own DLT portal and scrubber. A sender-ID approved on Jio may be unregistered on Airtel; a template that passes Vi scrubbing may fail BSNL. Multi-operator registration is a per-operator job.',
    },
  ],
  content: (
    <>
      <p>
        Carrier-specific OTP failures are common in India because each
        operator runs an independent DLT registration. This guide covers
        per-carrier patterns and the failover that keeps you live.
      </p>

      <h2 id="patterns">Per-Carrier Failure Patterns</h2>
      <ul>
        <li>One-carrier degradation — sender-ID or template not registered.</li>
        <li>One-carrier outage — operator-side downtime.</li>
        <li>Throttling — carrier de-prioritised your sender ID.</li>
        <li>Roaming — international SIMs in India can be weird.</li>
      </ul>

      <h2 id="jio">Jio Specifics</h2>
      <ul>
        <li>Largest user base — most fail-noise comes here first.</li>
        <li>Strict template-match enforcement.</li>
        <li>Fast renewal cycle.</li>
      </ul>

      <h2 id="airtel">Airtel Specifics</h2>
      <ul>
        <li>Tight scrubbing on financial templates.</li>
        <li>Sender-ID approval typically 1–3 working days.</li>
      </ul>

      <h2 id="vi">Vi Specifics</h2>
      <ul>
        <li>Smaller share but variable latency.</li>
        <li>Aggregator coverage gaps in Tier-3 circles.</li>
      </ul>

      <h2 id="bsnl">BSNL Specifics</h2>
      <ul>
        <li>Slowest scrubber.</li>
        <li>Patchy DLR reporting.</li>
      </ul>

      <h2 id="failover">Failover Strategy</h2>
      <p>
        Multi-provider OTP API automatically reroutes when DLR rates drop on
        a specific carrier path. Manual switch over a few minutes works too.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> registers across
        all four operators by default; per-carrier failures auto-route to
        a healthy alternative.
      </p>
    </>
  ),
};
