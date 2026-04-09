import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'sms-api-key-rotation-developers',
  title: 'Rotating SMS API Keys Without Taking Login Offline',
  description:
    'Key lifecycle for SMS OTP APIs: dual-key cutover, secrets storage, incident response, and protecting credentials used for TRAI DLT-compliant sends.',
  category: 'security',
  keywords: [
    'API key rotation',
    'SMS API key security',
    'rotate API keys zero downtime',
    'OTP API key leak',
    'secrets manager SMS',
    'API key best practices',
    'DLT SMS API credentials',
    'TRAI SMS API security India',
    'OTP SMS API India key',
    'bulk SMS API authentication',
    'SMS gateway API key leak',
  ],
  publishedAt: '2026-04-14',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Security' },
  tableOfContents: [
    { id: 'beyond-hash-otp', title: 'Different From Hashing OTP Codes' },
    { id: 'dual-key-cutover', title: 'Dual-Key Cutover Pattern' },
    { id: 'storage', title: 'Where Keys Live' },
    { id: 'incidents', title: 'Leak Response Checklist' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-security-best-practices',
    'testing-otp-flows-staging-sandboxes',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'How often should we rotate SMS API keys?',
      answer:
        'There is no universal calendar. Rotate on employee offboarding touching credentials, after any suspected leak, and on a periodic schedule your security team defines—often quarterly for high-sensitivity keys.',
    },
    {
      question: 'Does key rotation replace rate limiting?',
      answer:
        'No. Rotation limits blast radius after compromise; rate limiting and fraud detection stop ongoing abuse. You need both.',
    },
  ],
  content: (
    <>
      <p>
        <Link
          href="/blog/otp-security-best-practices"
          className="text-primary hover:underline"
        >
          OTP security best practices
        </Link>{' '}
        cover bcrypt for codes and HTTPS for transport. This article focuses on
        a different secret: <strong>your SMS gateway API key</strong>—the
        credential that authorizes spend and sends. It complements, not
        duplicates, that guide.
      </p>

      <h2 id="beyond-hash-otp">Different From Hashing OTP Codes</h2>
      <p>
        User-facing OTP values are short-lived secrets you hash at rest. API
        keys are long-lived authentication to your provider. Leaked keys let an
        attacker send messages on your bill—see{' '}
        <Link
          href="/blog/prevent-otp-fraud"
          className="text-primary hover:underline"
        >
          OTP fraud
        </Link>{' '}
        for attack patterns. Rotation reduces how long a stolen key works.
      </p>

      <h2 id="dual-key-cutover">Dual-Key Cutover Pattern</h2>
      <p>
        If your dashboard allows creating a second key before revoking the old
        one, deploy in three steps: add new key to secrets store, roll pods or
        Lambdas to pick up new secret, verify traffic, revoke old key. Avoid
        big-bang restarts during peak login unless you run blue-green with both
        keys briefly valid.
      </p>

      <h2 id="storage">Where Keys Live</h2>
      <p>
        Never commit keys to git. Use a secrets manager or encrypted CI
        variables. For local dev, document a fake key that points to mocks as in{' '}
        <Link
          href="/blog/testing-otp-flows-staging-sandboxes"
          className="text-primary hover:underline"
        >
          testing OTP in staging
        </Link>
        . Production keys should be readable only to the runtime role that calls{' '}
        <Link href="/otp-api" className="text-primary hover:underline">
          your OTP API
        </Link>
        .
      </p>

      <h2 id="incidents">Leak Response Checklist</h2>
      <ol>
        <li>Revoke the compromised key immediately in the provider dashboard.</li>
        <li>Issue a new key and deploy through your normal pipeline.</li>
        <li>Review recent sends for anomalous countries or volume spikes.</li>
        <li>Postmortem: how did the key leak—log, ticket, screenshot?</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>See FAQ above.</p>
    </>
  ),
};
