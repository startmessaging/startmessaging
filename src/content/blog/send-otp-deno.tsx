import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-deno',
  title: 'How to Send OTP with Deno (2026)',
  description:
    'Deno OTP tutorial using StartMessaging. Uses Deno.serve, native fetch, signed-cookie helpers and runs on Deno Deploy with zero infrastructure.',
  category: 'tutorials',
  keywords: [
    'send otp deno',
    'deno otp tutorial',
    'deno authentication',
    'deno deploy otp',
  ],
  publishedAt: '2026-05-08',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'server', title: 'Deno.serve OTP App' },
    { id: 'deploy', title: 'Deploy to Deno Deploy' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-bun',
    'send-otp-hono',
    'send-otp-nodejs',
    'send-otp-cloudflare-workers',
  ],
  faq: [
    {
      question: 'Does Deno Deploy support outbound fetch?',
      answer:
        'Yes. Deno Deploy is essentially a JS edge runtime; outbound fetch to api.startmessaging.com works without any allowlist configuration.',
    },
  ],
  content: (
    <>
      <p>
        Deno + Deno Deploy give you a free-tier global edge for OTP login
        with zero servers. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link>.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`# Install Deno
curl -fsSL https://deno.land/install.sh | sh

mkdir otp-deno && cd otp-deno
echo 'SM_API_KEY=sm_live_xxx' > .env`}</code>
      </pre>

      <h2 id="server">Deno.serve OTP App</h2>
      <pre>
        <code>{`// main.ts
import { load } from 'https://deno.land/std/dotenv/mod.ts';
const env = await load();
const apiKey = env['SM_API_KEY'] || Deno.env.get('SM_API_KEY')!;

async function smSend(phoneNumber: string) {
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ phoneNumber, idempotencyKey: crypto.randomUUID() }),
  });
  if (!r.ok) throw new Error('send failed');
  return (await r.json()).data;
}

async function smVerify(requestId: string, otpCode: string) {
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ requestId, otpCode }),
  });
  return r.ok;
}

Deno.serve({ port: 3001 }, async (req) => {
  const url = new URL(req.url);
  if (req.method === 'POST' && url.pathname === '/auth/send-otp') {
    const { phoneNumber } = await req.json();
    const data = await smSend(phoneNumber);
    return Response.json({ requestId: data.requestId, expiresAt: data.expiresAt });
  }
  if (req.method === 'POST' && url.pathname === '/auth/verify-otp') {
    const { requestId, otpCode } = await req.json();
    const ok = await smVerify(requestId, otpCode);
    return Response.json({ verified: ok }, { status: ok ? 200 : 401 });
  }
  return new Response('Not Found', { status: 404 });
});`}</code>
      </pre>

      <h2 id="deploy">Deploy to Deno Deploy</h2>
      <pre>
        <code>{`deployctl deploy --project=otp-deno main.ts
# add SM_API_KEY in dash.deno.com → settings → environment variables`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Need framework structure? Use{' '}
        <Link href="/blog/send-otp-hono">Hono</Link> on top of Deno.
      </p>
    </>
  ),
};
