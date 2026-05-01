import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-vercel-functions',
  title: 'How to Send OTP with Vercel Functions (2026)',
  description:
    'Vercel Functions OTP tutorial using StartMessaging. Edge vs Node runtime trade-offs, environment variables, signed cookies, and KV-style rate limiting.',
  category: 'tutorials',
  keywords: [
    'send otp vercel',
    'vercel functions otp',
    'vercel edge otp',
    'vercel sms otp',
  ],
  publishedAt: '2026-05-09',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'runtime', title: 'Edge vs Node Runtime' },
    { id: 'function', title: 'The Function' },
    { id: 'env', title: 'Environment Variables' },
    { id: 'rate-limit', title: 'Rate Limiting' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-aws-lambda',
    'send-otp-cloudflare-workers',
    'send-otp-nextjs-app-router',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Should I use Edge or Node runtime for OTP?',
      answer:
        'Edge runtime is faster on cold start but has limited Node API surface. For OTP send/verify, Edge works perfectly because we only need fetch and crypto. Pick Node only if you need a Node-specific library.',
    },
  ],
  content: (
    <>
      <p>
        Vercel Functions are the natural deployment target for Next.js
        teams. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> as a stand-alone
        function (works the same inside a Next.js app).
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`pnpm create vercel-app otp-vercel
cd otp-vercel`}</code>
      </pre>

      <h2 id="runtime">Edge vs Node Runtime</h2>
      <ul>
        <li>Edge — global, fast cold start, fetch + crypto only.</li>
        <li>Node — full Node API, slower cold start.</li>
      </ul>

      <h2 id="function">The Function</h2>
      <pre>
        <code>{`// api/auth/send-otp.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });
  const { phoneNumber } = await req.json();
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.SM_API_KEY! },
    body: JSON.stringify({ phoneNumber, idempotencyKey: crypto.randomUUID() }),
  });
  return new Response(await r.text(), { status: r.status });
}`}</code>
      </pre>
      <pre>
        <code>{`// api/auth/verify-otp.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });
  const body = await req.json();
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.SM_API_KEY! },
    body: JSON.stringify(body),
  });
  return new Response(await r.text(), { status: r.status });
}`}</code>
      </pre>

      <h2 id="env">Environment Variables</h2>
      <pre>
        <code>{`vercel env add SM_API_KEY production`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limiting</h2>
      <p>
        Use Upstash Redis (Vercel marketplace add-on) or Vercel KV for
        per-phone limits.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        For App Router-native flow see{' '}
        <Link href="/blog/send-otp-nextjs-app-router">our Next.js guide</Link>.
      </p>
    </>
  ),
};
