import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'load-testing-otp-endpoints-k6-locust',
  title: 'Load Testing OTP Endpoints with k6 / Locust',
  description:
    'How to load-test OTP endpoints without burning real SMS credits. Provider sandbox mode, k6 / Locust scripts, and metrics that matter.',
  category: 'tutorials',
  keywords: [
    'load test otp',
    'k6 otp api',
    'locust sms otp',
    'otp performance testing',
    'sms api benchmark',
  ],
  publishedAt: '2026-05-20',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Load Test OTP' },
    { id: 'sandbox', title: 'Use Sandbox Mode' },
    { id: 'k6', title: 'k6 Script' },
    { id: 'locust', title: 'Locust Script' },
    { id: 'metrics', title: 'Metrics That Matter' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'test-otp-locally-without-sms-cost',
    'testing-otp-flows-staging-sandboxes',
    'otp-rate-limiting-guide',
  ],
  faq: [
    {
      question: 'Should I load-test the real provider?',
      answer:
        'Only via sandbox mode. Hitting the real provider with a load test costs real money (and may violate ToS).',
    },
  ],
  content: (
    <>
      <p>
        Load-testing the OTP path matters for sale-day events, IPL
        ticketing apps, and fintech bursts. The trick is to drive realistic
        load without paying for real SMS.
      </p>

      <h2 id="why">Why Load Test OTP</h2>
      <ul>
        <li>Sale-day spikes can be 50× normal.</li>
        <li>Validate per-phone rate limit.</li>
        <li>Validate fail-over behaviour.</li>
        <li>Confirm DB indexes hold.</li>
      </ul>

      <h2 id="sandbox">Use Sandbox Mode</h2>
      <p>
        Provider sandbox modes accept arbitrary requests and return success
        without SMS dispatch. See your provider&rsquo;s sandbox docs.
      </p>

      <h2 id="k6">k6 Script</h2>
      <pre>
        <code>{`// k6.js
import http from 'k6/http';
import { check } from 'k6';
export const options = { vus: 200, duration: '5m' };
const phones = open('./phones.csv').split('\\n');

export default function () {
  const phone = phones[Math.floor(Math.random() * phones.length)];
  const r = http.post('https://stg.your-app.com/auth/send-otp',
    JSON.stringify({ phoneNumber: phone }),
    { headers: { 'Content-Type': 'application/json' }});
  check(r, { 'status 200': (r) => r.status === 200 });
}`}</code>
      </pre>

      <h2 id="locust">Locust Script</h2>
      <pre>
        <code>{`# locust.py
from locust import HttpUser, task, between
class OtpUser(HttpUser):
    wait_time = between(1, 3)
    @task
    def send_otp(self):
        self.client.post("/auth/send-otp", json={"phoneNumber": "+919876543210"})`}</code>
      </pre>

      <h2 id="metrics">Metrics That Matter</h2>
      <ul>
        <li>P95 send latency under load.</li>
        <li>Error rate at peak.</li>
        <li>Per-phone rate-limit hit rate.</li>
        <li>Database CPU and connection pool saturation.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For test patterns more broadly see{' '}
        <Link href="/blog/testing-otp-flows-staging-sandboxes">
          our staging guide
        </Link>
        .
      </p>
    </>
  ),
};
