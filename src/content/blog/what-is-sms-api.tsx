import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'what-is-sms-api',
  title: 'What is an SMS API? A Developer’s Guide (India, 2026)',
  description:
    'SMS API explained: how it differs from an SMS gateway, the typical request/response shape, REST vs SMPP, OTP-specific endpoints, and India-specific DLT considerations.',
  category: 'tutorials',
  keywords: [
    'what is sms api',
    'sms api',
    'sms api india',
    'rest sms api',
    'send sms api',
    'http sms api',
    'sms api integration',
  ],
  publishedAt: '2026-04-24',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'definition', title: 'SMS API — Definition' },
    { id: 'shape', title: 'Anatomy of an SMS API Call' },
    { id: 'features', title: 'Features Beyond Send' },
    { id: 'sms-vs-otp', title: 'SMS API vs OTP API' },
    { id: 'india', title: 'SMS APIs in India' },
    { id: 'implementation', title: 'A Sample Integration' },
    { id: 'choosing', title: 'How to Pick an SMS API Provider' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'what-is-sms-gateway',
    'what-is-otp',
    'send-otp-nodejs',
    'best-otp-api-india',
    'otp-api-pricing-comparison-india',
  ],
  faq: [
    {
      question: 'What does an SMS API do?',
      answer:
        'An SMS API exposes an HTTP / REST interface that lets your application send and receive SMS messages programmatically. It abstracts the underlying telecom protocols (SMPP, HTTP/SMS gateways) so you only need to know how to call a JSON endpoint.',
    },
    {
      question: 'Is SMS API the same as SMS gateway?',
      answer:
        'Not exactly. The gateway is the infrastructure that talks to telecom networks. The API is the developer-facing layer in front of it. Most modern providers expose both — the API is what your code uses, the gateway is what the API uses internally.',
    },
    {
      question: 'How do I authenticate to an SMS API?',
      answer:
        'Most providers use an API key in an HTTP header (e.g. X-API-Key or Authorization: Bearer ...). Some still use basic auth or query-string keys; both are weaker patterns and should be avoided.',
    },
    {
      question: 'Can I send international SMS through an Indian SMS API?',
      answer:
        'Some can; many are India-only. If you need international reach, ask the provider explicitly which destinations they cover and whether the pricing matrix is per-country.',
    },
  ],
  content: (
    <>
      <p>
        An SMS API is the cleanest way for an application to send a text
        message. You make an HTTP call, receive a JSON response, and the
        provider handles everything from telecom integration to delivery
        receipts. Almost every product that needs OTPs, alerts, or
        transactional notifications ends up integrating with an SMS API at
        some point.
      </p>
      <p>
        This guide covers <strong>what an SMS API is</strong>, what a typical
        request looks like, what features distinguish good APIs from bad ones,
        the India-specific quirks (DLT, sender IDs, scrubbing), and how to
        pick a provider for an OTP workload.
      </p>

      <h2 id="definition">SMS API — Definition</h2>
      <p>
        An <strong>SMS API</strong> (Application Programming Interface) is an
        HTTP-based service that accepts a request from your application and
        sends an SMS to the phone number you specify. The API hides the
        underlying complexity:
      </p>
      <ul>
        <li>The SMPP / HTTP plumbing to telecom operators.</li>
        <li>Routing across multiple aggregators.</li>
        <li>Failover when a route is down.</li>
        <li>Delivery-status (DLR) collection.</li>
        <li>India-specific DLT compliance.</li>
      </ul>
      <p>
        For OTP-specific workloads, the API can also generate the code, hash
        and store it, enforce attempt limits, and provide a separate{' '}
        <code>/verify</code> endpoint — turning a multi-step problem into two
        HTTP calls.
      </p>

      <h2 id="shape">Anatomy of an SMS API Call</h2>
      <p>A typical send request looks like this:</p>
      <pre>
        <code>{`POST https://api.example.com/sms/send
Content-Type: application/json
X-API-Key: sm_live_xxxxxxxxxxxxxxxx

{
  "phoneNumber": "+919876543210",
  "message":     "Your code is 482910. Valid for 10 min.",
  "senderId":    "STMSGE",
  "templateId":  "TEMPLATE-001"
}`}</code>
      </pre>
      <p>And the response:</p>
      <pre>
        <code>{`200 OK
{
  "data": {
    "messageId": "msg_01HQ5...",
    "status":    "queued",
    "submittedAt": "2026-04-24T08:01:42Z"
  }
}`}</code>
      </pre>
      <p>
        The status moves through <code>queued → submitted → delivered</code>{' '}
        (or <code>failed</code>). Delivery receipts arrive seconds to minutes
        later via webhook or a polling endpoint. See{' '}
        <Link href="/blog/otp-delivery-status-polling-vs-webhooks">
          polling vs webhooks for OTP status
        </Link>{' '}
        for trade-offs.
      </p>

      <h2 id="features">Features Beyond Send</h2>
      <p>
        A production-grade SMS API does much more than dispatch one message:
      </p>
      <ul>
        <li>
          <strong>Idempotency keys</strong> — protect against duplicate sends
          on network retries. See{' '}
          <Link href="/blog/idempotency-keys-otp">our idempotency guide</Link>.
        </li>
        <li>
          <strong>OTP send + verify endpoints</strong> — the API generates and
          hashes the code; you only handle request IDs.
        </li>
        <li>
          <strong>Webhooks for DLR</strong> — push delivery status to your
          backend in real time.
        </li>
        <li>
          <strong>Templates and variables</strong> — pre-approved SMS bodies
          (mandatory in India) with safe variable substitution.
        </li>
        <li>
          <strong>Sender-ID management</strong> — per-environment sender IDs
          (TXN-INFO, OTP-LIVE) and registration handling.
        </li>
        <li>
          <strong>Rate limiting</strong> — server-side enforcement so an
          attacker cannot empty your wallet with a sign-up bot.
        </li>
        <li>
          <strong>Logs and analytics</strong> — searchable history of every
          request with delivery status and cost.
        </li>
      </ul>

      <h2 id="sms-vs-otp">SMS API vs OTP API</h2>
      <p>An OTP API is a <em>specialised</em> SMS API:</p>
      <ul>
        <li>
          <strong>SMS API</strong> sends arbitrary text. You generate, store,
          verify, and rate-limit OTPs yourself.
        </li>
        <li>
          <strong>OTP API</strong> exposes <code>/otp/send</code> and{' '}
          <code>/otp/verify</code>. The provider generates the code, hashes
          it, enforces attempt limits and expiry, and verifies on your behalf.
          You never see the plaintext code on your servers.
        </li>
      </ul>
      <p>
        For phone-verification flows, the OTP API model is strictly
        better — fewer security mistakes, less code to maintain, automatic
        protection against attempt-pumping. We have a side-by-side breakdown in{' '}
        <Link href="/blog/otp-verification-flow">
          our OTP verification flow guide
        </Link>
        .
      </p>

      <h2 id="india">SMS APIs in India</h2>
      <p>
        Operating in India adds a thick compliance layer on top of the
        familiar SMS API model:
      </p>
      <ul>
        <li>
          <strong>DLT registration</strong> — your business must register as a
          Principal Entity on the operator DLT platforms.
        </li>
        <li>
          <strong>Templates</strong> — every distinct message body must be
          pre-registered and approved.
        </li>
        <li>
          <strong>Sender IDs (headers)</strong> — six-character IDs that
          identify your brand, also pre-registered.
        </li>
        <li>
          <strong>Scrubbing</strong> — non-compliant messages are silently
          dropped before delivery.
        </li>
        <li>
          <strong>DPDP Act 2023</strong> — personal-data obligations on top of
          the existing TRAI framework.
        </li>
      </ul>
      <p>
        The simplest way to deal with this is to pick a provider that has
        already done the DLT work for you. With{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> you skip the
        registration and template-approval queue entirely.
      </p>

      <h2 id="implementation">A Sample Integration</h2>
      <pre>
        <code>{`// Node.js — send an OTP
const res = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.STARTMESSAGING_API_KEY,
  },
  body: JSON.stringify({ phoneNumber: '+919876543210' }),
});
const { data } = await res.json();
console.log(data.requestId);

// later — verify
const v = await fetch('https://api.startmessaging.com/otp/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.STARTMESSAGING_API_KEY,
  },
  body: JSON.stringify({ requestId: data.requestId, otpCode: '482910' }),
});`}</code>
      </pre>
      <p>
        Step-by-step walk-throughs are in our tutorial library — see{' '}
        <Link href="/blog/send-otp-nodejs">Node.js</Link>,{' '}
        <Link href="/blog/send-otp-python">Python</Link>,{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel</Link>, and many
        more.
      </p>

      <h2 id="choosing">How to Pick an SMS API Provider</h2>
      <ul>
        <li>
          <strong>Delivery latency.</strong> Ask for P50 / P95 numbers.
        </li>
        <li>
          <strong>India-specific DLT handling.</strong> Built-in beats
          self-service.
        </li>
        <li>
          <strong>Pricing.</strong> Per-OTP cost matters more than per-SMS for
          high-volume verification flows. See{' '}
          <Link href="/blog/otp-api-pricing-comparison-india">
            our pricing comparison
          </Link>
          .
        </li>
        <li>
          <strong>OTP-specific endpoints.</strong> Saves you from rolling your
          own crypto.
        </li>
        <li>
          <strong>Multi-provider failover.</strong> Keeps your sign-ups
          working when one route is down.
        </li>
        <li>
          <strong>Documentation.</strong> Tutorials, code samples, OpenAPI
          spec, postman collection — these are the difference between a
          5-minute integration and a 5-hour one.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        StartMessaging is an OTP-specialised SMS API for the Indian market.{' '}
        <Link href="https://app.startmessaging.com/register">
          Sign up
        </Link>{' '}
        and you have a working OTP integration in five minutes.
      </p>
    </>
  ),
};
