import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-hono',
  title: 'How to Send OTP with Hono (2026)',
  description:
    'Hono OTP tutorial using StartMessaging. Targets Cloudflare Workers, Bun and Node. Uses zValidator, JSON schema, signed-cookie session and middleware-based rate limiting.',
  category: 'tutorials',
  keywords: [
    'send otp hono',
    'hono framework otp',
    'hono cloudflare otp',
    'hono bun otp',
  ],
  publishedAt: '2026-05-08',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'env', title: 'Environment' },
    { id: 'app', title: 'The Hono App' },
    { id: 'rate-limit', title: 'Rate Limit Middleware' },
    { id: 'deploy', title: 'Deploy Targets' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-cloudflare-workers',
    'send-otp-bun',
    'send-otp-deno',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Does Hono work on Cloudflare Workers and Bun simultaneously?',
      answer:
        'Yes. The same Hono app runs on Workers, Bun, Node, Deno and Lambda by changing the export adapter. The OTP code stays identical.',
    },
  ],
  content: (
    <>
      <p>
        Hono is the framework of choice for runtime-portable JS APIs. The
        same code runs on Cloudflare Workers, Bun, Node, Deno or Lambda.
        OTP login works just as cleanly.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`pnpm create hono@latest otp-hono
cd otp-hono && pnpm install
pnpm add @hono/zod-validator zod`}</code>
      </pre>

      <h2 id="env">Environment</h2>
      <pre>
        <code>{`# .dev.vars  (Cloudflare)
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="app">The Hono App</h2>
      <pre>
        <code>{`import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';

type Env = { Bindings: { SM_API_KEY: string; SESSION_SECRET: string } };
const app = new Hono<Env>();

const PhoneSchema = z.object({ phoneNumber: z.string().regex(/^\\+91\\d{10}$/) });
const CodeSchema  = z.object({ otpCode: z.string().regex(/^\\d{4,8}$/) });

app.post('/auth/send-otp', zValidator('json', PhoneSchema), async (c) => {
  const { phoneNumber } = c.req.valid('json');
  const res = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': c.env.SM_API_KEY },
    body: JSON.stringify({ phoneNumber, idempotencyKey: crypto.randomUUID() }),
  });
  if (!res.ok) return c.json({ error: 'send failed' }, 502);
  const { data } = await res.json<any>();
  await setSignedCookie(c, 'otp_req', data.requestId, c.env.SESSION_SECRET, {
    httpOnly: true, secure: true, sameSite: 'Lax', maxAge: 900,
  });
  return c.json({ expiresAt: data.expiresAt });
});

app.post('/auth/verify-otp', zValidator('json', CodeSchema), async (c) => {
  const { otpCode } = c.req.valid('json');
  const requestId = await getSignedCookie(c, c.env.SESSION_SECRET, 'otp_req');
  if (!requestId) return c.json({ error: 'no active otp' }, 400);
  const res = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': c.env.SM_API_KEY },
    body: JSON.stringify({ requestId, otpCode }),
  });
  if (!res.ok) return c.json({ error: 'verify failed' }, 401);
  return c.json({ verified: true });
});

export default app;`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limit Middleware</h2>
      <p>
        On Cloudflare, use a Durable Object or KV for per-phone counters. On
        Node / Bun, an in-memory <code>Map</code> works for a single
        process.
      </p>

      <h2 id="deploy">Deploy Targets</h2>
      <ul>
        <li>Cloudflare Workers: <code>npx wrangler deploy</code></li>
        <li>Bun: <code>bun run src/index.ts</code></li>
        <li>Node: <code>tsx src/index.ts</code></li>
        <li>Deno: <code>deno run --allow-net src/index.ts</code></li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        Pair this with{' '}
        <Link href="/blog/send-otp-cloudflare-workers">our Workers guide</Link>{' '}
        for the deployment side.
      </p>
    </>
  ),
};
