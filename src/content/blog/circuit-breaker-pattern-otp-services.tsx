import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'circuit-breaker-pattern-otp-services',
  title: 'Circuit Breaker Pattern for OTP Services',
  description:
    'Why and how to wrap OTP API calls in a circuit breaker. Failure thresholds, half-open probing, fallback voice OTP, and reference implementations.',
  category: 'tutorials',
  keywords: [
    'circuit breaker otp',
    'otp resilience',
    'sms api circuit breaker',
    'otp fallback pattern',
    'reliable otp',
  ],
  publishedAt: '2026-05-21',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Circuit Breakers Matter for OTP' },
    { id: 'states', title: 'Closed → Open → Half-Open' },
    { id: 'thresholds', title: 'Thresholds' },
    { id: 'fallback', title: 'Fallback Strategy' },
    { id: 'code', title: 'Reference Implementation' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'multi-region-failover-otp-api',
    'otp-monitoring-slos-error-budgets',
    'otp-delivery-delay-fix',
  ],
  faq: [
    {
      question: 'Do I need a library for this?',
      answer:
        'opossum (Node), resilience4j (JVM), pybreaker (Python) are all good choices. For prototyping, a 30-line homemade circuit breaker is enough.',
    },
  ],
  content: (
    <>
      <p>
        OTP API outages cost you logins. A circuit breaker lets you fail
        fast and route to a fallback rather than queueing requests behind a
        slow upstream.
      </p>

      <h2 id="why">Why Circuit Breakers Matter for OTP</h2>
      <ul>
        <li>OTP send is on the user critical path.</li>
        <li>Slow upstream = piled-up sessions.</li>
        <li>Fast failure + fallback &gt; slow success.</li>
      </ul>

      <h2 id="states">Closed → Open → Half-Open</h2>
      <ul>
        <li>Closed: normal traffic.</li>
        <li>Open: skip calls, fail fast or fallback for N seconds.</li>
        <li>Half-Open: probe with a small fraction; if probe succeeds, close.</li>
      </ul>

      <h2 id="thresholds">Thresholds</h2>
      <ul>
        <li>Trip on &gt; 50% failure rate over 30s window with at least 20 requests.</li>
        <li>Open for 60s before half-open probe.</li>
        <li>Half-open probe: 5 requests, &lt; 50% failure to close.</li>
      </ul>

      <h2 id="fallback">Fallback Strategy</h2>
      <ul>
        <li>Voice OTP fallback.</li>
        <li>Secondary provider.</li>
        <li>Graceful degradation: queue with user-visible message.</li>
      </ul>

      <h2 id="code">Reference Implementation</h2>
      <pre>
        <code>{`import CircuitBreaker from 'opossum';

const breaker = new CircuitBreaker(callOtpApi, {
  errorThresholdPercentage: 50,
  resetTimeout: 60_000,
  rollingCountTimeout: 30_000,
  rollingCountBuckets: 10,
  volumeThreshold: 20,
});
breaker.fallback(() => callVoiceOtpFallback(phone));`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Combine with{' '}
        <Link href="/blog/multi-region-failover-otp-api">multi-region
        failover</Link> for a complete resilience story.
      </p>
    </>
  ),
};
