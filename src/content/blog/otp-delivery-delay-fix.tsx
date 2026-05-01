import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-delivery-delay-fix',
  title: 'Why is OTP Delivery Slow? How to Fix Latency',
  description:
    'OTP delivery delays in India: typical causes, P50/P95 benchmarks, route troubleshooting, provider failover, and concrete fixes that drop latency from minutes to seconds.',
  category: 'security',
  keywords: [
    'otp slow delivery',
    'fix otp latency',
    'otp delay india',
    'sms slow india',
    'reduce otp latency',
  ],
  publishedAt: '2026-05-14',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'benchmarks', title: 'What Healthy OTP Latency Looks Like' },
    { id: 'causes', title: 'Common Causes of Delay' },
    { id: 'diagnosis', title: 'Diagnosis Steps' },
    { id: 'fixes', title: 'Fixes' },
    { id: 'monitoring', title: 'Monitoring' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-not-received-india',
    'otp-monitoring-slos-error-budgets',
    'otp-delivery-rates-india',
    'otp-sms-deliverability-checklist',
  ],
  faq: [
    {
      question: 'What is acceptable OTP latency?',
      answer:
        'P50 under 6 seconds, P95 under 15 seconds. Anything past 30 seconds materially hurts conversion and signals a provider problem.',
    },
  ],
  content: (
    <>
      <p>
        OTP latency directly affects login conversion. This guide walks
        through what healthy latency looks like, how to diagnose slow
        delivery, and the levers that consistently bring P95 down.
      </p>

      <h2 id="benchmarks">What Healthy OTP Latency Looks Like</h2>
      <ul>
        <li>P50: 2–6 seconds.</li>
        <li>P95: 8–15 seconds.</li>
        <li>P99: under 30 seconds.</li>
        <li>Anything beyond is a degraded route.</li>
      </ul>

      <h2 id="causes">Common Causes of Delay</h2>
      <ul>
        <li>Single-route congestion at a specific operator.</li>
        <li>Backed-up bulk-SMS queue mixed with OTP traffic.</li>
        <li>DLT scrubbing reprocessing (retries silently).</li>
        <li>Wrong category — promotional route is slower than transactional.</li>
        <li>Carrier outage on Jio / Airtel / Vi.</li>
      </ul>

      <h2 id="diagnosis">Diagnosis Steps</h2>
      <ol>
        <li>Pull DLR timestamps for slow OTPs from your provider.</li>
        <li>Bucket by carrier — is it one carrier or all?</li>
        <li>Check provider status page.</li>
        <li>Check Twitter for similar complaints from peer apps.</li>
      </ol>

      <h2 id="fixes">Fixes</h2>
      <ul>
        <li>Multi-provider failover.</li>
        <li>Voice OTP fallback after 30s.</li>
        <li>Dedicated transactional route, not bulk.</li>
        <li>Pre-load templates so first-OTP-of-day doesn&rsquo;t pay registration latency.</li>
      </ul>

      <h2 id="monitoring">Monitoring</h2>
      <p>
        See <Link href="/blog/otp-monitoring-slos-error-budgets">our SLO guide</Link>{' '}
        for setting up Datadog or Grafana dashboards.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> ships sub-6s P50
        latency on Indian routes via multi-provider failover.
      </p>
    </>
  ),
};
