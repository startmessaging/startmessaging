import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-cloudflare-workers',
  title: 'How to Send OTP with Cloudflare Workers (2026)',
  description:
    'Cloudflare Workers OTP tutorial using StartMessaging. Uses Workers fetch, KV for rate-limit, signed-cookie session, and Durable Objects for production-grade pumping defence.',
  category: 'tutorials',
  keywords: [
    'send otp cloudflare workers',
    'cloudflare workers otp',
    'workers sms otp',
    'cloudflare otp api',
  ],
  publishedAt: '2026-05-09',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'wrangler', title: 'Wrangler Config' },
    { id: 'worker', title: 'The Worker' },
    { id: 'kv-rate', title: 'Rate Limiting via KV' },
    { id: 'durable', title: 'Per-Phone Limits via Durable Objects' },
    { id: 'deploy', title: 'Deploy' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-hono',
    'send-otp-bun',
    'send-otp-deno',
    'send-otp-aws-lambda',
  ],
  faq: [
    {
      question: 'Do API keys belong in Workers as plain Vars?',
      answer:
        'No — use wrangler secrets. They\'re injected as Vars at runtime but encrypted at rest. Never commit raw keys to wrangler.toml.',
    },
    {
      question: 'Is KV strong enough for OTP rate limiting?',
      answer:
        'KV is eventually consistent and unsuitable for hard limits. For real per-phone rate limits, use Durable Objects — they give you single-region atomicity per identifier.',
    },
  ],
  content: (
    <>
      <p>
        Cloudflare Workers gives you a global, sub-millisecond edge for OTP
        login. This tutorial uses Hono-on-Workers + KV / Durable Objects for
        rate limiting.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`pnpm create cloudflare otp-worker
cd otp-worker && pnpm install hono`}</code>
      </pre>

      <h2 id="wrangler">Wrangler Config</h2>
      <pre>
        <code>{`# wrangler.toml
name = "otp-worker"
main = "src/index.ts"
compatibility_date = "2026-04-01"

[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "<your-kv-id>"

# secrets via: wrangler secret put SM_API_KEY`}</code>
      </pre>

      <h2 id="worker">The Worker</h2>
      <pre>
        <code>{`// src/index.ts
import { Hono } from 'hono';
type Env = { Bindings: { SM_API_KEY: string; RATE_LIMIT_KV: KVNamespace }};
const app = new Hono<Env>();

app.post('/auth/send-otp', async (c) => {
  const { phoneNumber } = await c.req.json();
  // simple per-phone hour cap
  const key = \`rl:\${phoneNumber}\`;
  const count = parseInt((await c.env.RATE_LIMIT_KV.get(key)) ?? '0');
  if (count >= 5) return c.json({ error: 'rate limited' }, 429);
  await c.env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 3600 });

  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': c.env.SM_API_KEY },
    body: JSON.stringify({ phoneNumber, idempotencyKey: crypto.randomUUID() }),
  });
  if (!r.ok) return c.json({ error: 'upstream' }, 502);
  return c.json((await r.json<any>()).data);
});

export default app;`}</code>
      </pre>

      <h2 id="kv-rate">Rate Limiting via KV</h2>
      <p>
        KV is good enough for soft per-phone caps where eventual consistency
        is acceptable. For hard limits switch to Durable Objects.
      </p>

      <h2 id="durable">Per-Phone Limits via Durable Objects</h2>
      <p>
        Use a Durable Object per phone-number; it serialises increments and
        gives you exact-once limit enforcement.
      </p>

      <h2 id="deploy">Deploy</h2>
      <pre>
        <code>{`wrangler secret put SM_API_KEY
wrangler deploy`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        For full rate-limit patterns see our{' '}
        <Link href="/blog/otp-rate-limiting-guide">OTP rate-limiting guide</Link>.
      </p>
    </>
  ),
};
