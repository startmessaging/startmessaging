import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-bun',
  title: 'How to Send OTP with Bun (2026)',
  description:
    'Bun OTP tutorial using StartMessaging. Uses Bun.serve, Bun.password.hash for credential hygiene, native fetch and zero npm install required.',
  category: 'tutorials',
  keywords: [
    'send otp bun',
    'bun framework otp',
    'bunjs sms otp',
    'bun authentication',
  ],
  publishedAt: '2026-05-08',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'server', title: 'Bun.serve OTP App' },
    { id: 'session', title: 'Session via Cookie' },
    { id: 'tests', title: 'Tests' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-hono',
    'send-otp-deno',
    'send-otp-nodejs',
    'send-otp-express',
  ],
  faq: [
    {
      question: 'Why Bun over Node for OTP?',
      answer:
        'Faster cold starts, native fetch, native test runner, zero-config TypeScript. For OTP-style HTTP-bound code, Bun is plug-and-play.',
    },
  ],
  content: (
    <>
      <p>
        Bun&rsquo;s built-in HTTP server, native fetch and zero-config TS
        make OTP integrations a few-file affair. This tutorial uses{' '}
        <Link href="/otp-api">StartMessaging</Link>.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`bun init -y otp-bun
cd otp-bun
echo 'SM_API_KEY=sm_live_xxx' > .env`}</code>
      </pre>

      <h2 id="server">Bun.serve OTP App</h2>
      <pre>
        <code>{`// src/index.ts
const apiKey = Bun.env.SM_API_KEY!;

async function smSend(phoneNumber: string) {
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ phoneNumber, idempotencyKey: crypto.randomUUID() }),
  });
  if (!r.ok) throw new Error('send failed');
  return (await r.json()).data as { requestId: string; expiresAt: string };
}

async function smVerify(requestId: string, otpCode: string) {
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ requestId, otpCode }),
  });
  return r.ok;
}

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === 'POST' && url.pathname === '/auth/send-otp') {
      const { phoneNumber } = await req.json();
      const data = await smSend(phoneNumber);
      return new Response(JSON.stringify({ requestId: data.requestId, expiresAt: data.expiresAt }));
    }
    if (req.method === 'POST' && url.pathname === '/auth/verify-otp') {
      const { requestId, otpCode } = await req.json();
      const ok = await smVerify(requestId, otpCode);
      return new Response(JSON.stringify({ verified: ok }), { status: ok ? 200 : 401 });
    }
    return new Response('Not Found', { status: 404 });
  },
});`}</code>
      </pre>

      <h2 id="session">Session via Cookie</h2>
      <p>
        Bun has no built-in session helper, but signing a cookie with
        <code>Bun.password.hash</code> + a secret works. For production,
        prefer the <code>iron-session</code> npm module.
      </p>

      <h2 id="tests">Tests</h2>
      <pre>
        <code>{`// src/index.test.ts
import { describe, it, expect, mock } from 'bun:test';

it('sends OTP', async () => {
  globalThis.fetch = mock(() => new Response(JSON.stringify({
    data: { requestId: 'req_x', expiresAt: 't', attemptsLeft: 3 }
  }), { status: 200 })) as any;
  const r = await fetch('http://localhost:3001/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: '+919876543210' }),
  });
  expect(r.ok).toBe(true);
});`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Pair with <Link href="/blog/send-otp-hono">Hono</Link> for a richer
        framework on top of Bun.
      </p>
    </>
  ),
};
