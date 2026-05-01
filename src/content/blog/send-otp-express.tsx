import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-express',
  title: 'How to Send OTP with Express.js (2026)',
  description:
    'Production-ready Express.js OTP guide using StartMessaging. Covers send, verify, idempotency, rate-limit middleware, error mapping and a session-based verification flow.',
  category: 'tutorials',
  keywords: [
    'send otp express',
    'express js otp',
    'otp middleware express',
    'express sms otp',
    'startmessaging express',
    'nodejs express otp',
  ],
  publishedAt: '2026-04-26',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'project-setup', title: 'Project Setup' },
    { id: 'env', title: 'Environment Variables' },
    { id: 'sm-client', title: 'A Tiny SM Client Wrapper' },
    { id: 'router', title: 'The /auth Router' },
    { id: 'rate-limit', title: 'Rate Limiting' },
    { id: 'session', title: 'Session-Based Verification' },
    { id: 'errors', title: 'Error Handling' },
    { id: 'tests', title: 'Tests' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nodejs',
    'send-otp-nestjs',
    'send-otp-nextjs-app-router',
    'send-otp-fastapi',
    'idempotency-keys-otp',
  ],
  faq: [
    {
      question: 'Do I need a separate database for OTPs?',
      answer:
        'No. StartMessaging stores the hashed OTP and metadata server-side. Your only persistent state is the requestId, which you can keep in a short-lived signed cookie or a session store.',
    },
    {
      question: 'Should I use express-rate-limit or write my own?',
      answer:
        'Use express-rate-limit for IP-based caps and write your own per-phone limiter on top. Phone is the meaningful identity for OTP abuse — IP alone is too easy to rotate.',
    },
    {
      question: 'How do I avoid CORS issues from a browser frontend?',
      answer:
        'Mount the cors middleware with a strict origin allowlist. Never use cors({ origin: true }) with credentials in production — that allows any origin to drive your auth flow.',
    },
  ],
  content: (
    <>
      <p>
        Express.js is still the dominant Node.js framework for new APIs in
        2026, especially in India where teams iterate quickly on auth flows.
        This tutorial walks through a production-ready{' '}
        <code>/auth/send-otp</code> and <code>/auth/verify-otp</code> pair on
        top of <Link href="/otp-api">StartMessaging</Link>, with the
        middleware patterns most teams reach for.
      </p>

      <h2 id="project-setup">Project Setup</h2>
      <pre>
        <code>{`mkdir otp-express && cd otp-express
npm init -y
npm install express dotenv cookie-session
npm install -D typescript @types/node @types/express tsx`}</code>
      </pre>
      <p>
        We use ESM and TypeScript. Add to <code>package.json</code>:
      </p>
      <pre>
        <code>{`{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}`}</code>
      </pre>

      <h2 id="env">Environment Variables</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com
SESSION_SECRET=replace-me-with-a-real-secret`}</code>
      </pre>

      <h2 id="sm-client">A Tiny SM Client Wrapper</h2>
      <pre>
        <code>{`// src/sm.ts
import { randomUUID } from 'node:crypto';

const BASE_URL = process.env.SM_BASE_URL!;
const API_KEY  = process.env.SM_API_KEY!;

interface SendResp { requestId: string; expiresAt: string; attemptsLeft: number; }

async function smPost(path: string, body: object) {
  const res = await fetch(\`\${BASE_URL}\${path}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.message ?? \`SM error \${res.status}\`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return json.data;
}

export const sm = {
  sendOtp: (phoneNumber: string): Promise<SendResp> =>
    smPost('/otp/send', { phoneNumber, idempotencyKey: randomUUID() }),
  verifyOtp: (requestId: string, otpCode: string) =>
    smPost('/otp/verify', { requestId, otpCode }),
};`}</code>
      </pre>

      <h2 id="router">The /auth Router</h2>
      <pre>
        <code>{`// src/auth.router.ts
import { Router } from 'express';
import { sm } from './sm.js';
import { phoneRateLimit } from './middleware.js';

export const auth = Router();

auth.post('/send-otp', phoneRateLimit, async (req, res) => {
  const { phoneNumber } = req.body ?? {};
  if (!/^\\+91\\d{10}$/.test(phoneNumber ?? '')) {
    return res.status(400).json({ error: 'Invalid phoneNumber' });
  }
  try {
    const data = await sm.sendOtp(phoneNumber);
    req.session!.otp = { requestId: data.requestId, phoneNumber };
    return res.json({ expiresAt: data.expiresAt, attemptsLeft: data.attemptsLeft });
  } catch (e: any) {
    return res.status(e.status ?? 500).json({ error: e.message });
  }
});

auth.post('/verify-otp', async (req, res) => {
  const { otpCode } = req.body ?? {};
  const session = req.session?.otp;
  if (!session) return res.status(400).json({ error: 'No active OTP request' });
  try {
    await sm.verifyOtp(session.requestId, otpCode);
    req.session!.otp = undefined;
    req.session!.userPhone = session.phoneNumber;
    return res.json({ verified: true });
  } catch (e: any) {
    return res.status(e.status ?? 500).json({ error: e.message });
  }
});`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limiting</h2>
      <pre>
        <code>{`// src/middleware.ts
import type { Request, Response, NextFunction } from 'express';

const WINDOW = 60 * 60 * 1000;
const LIMIT  = 5;
const buckets = new Map<string, number[]>();

export function phoneRateLimit(req: Request, res: Response, next: NextFunction) {
  const phone: string | undefined = req.body?.phoneNumber;
  if (!phone) return next();
  const now = Date.now();
  const bucket = (buckets.get(phone) ?? []).filter((t) => now - t < WINDOW);
  if (bucket.length >= LIMIT) {
    return res.status(429).json({ error: 'Too many OTP requests for this number' });
  }
  bucket.push(now);
  buckets.set(phone, bucket);
  next();
}`}</code>
      </pre>
      <p>
        Swap the in-memory map for Redis in production —{' '}
        <Link href="/blog/otp-rate-limiting-guide">full pattern here</Link>.
      </p>

      <h2 id="session">Session-Based Verification</h2>
      <pre>
        <code>{`// src/index.ts
import 'dotenv/config';
import express from 'express';
import cookieSession from 'cookie-session';
import { auth } from './auth.router.js';

const app = express();
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET!],
  maxAge: 30 * 60_000,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
}));
app.use('/auth', auth);

app.listen(3001, () => console.log('Listening on :3001'));`}</code>
      </pre>
      <p>
        The session cookie holds the requestId between send and verify, so the
        client never has to remember it. After verify, we elevate the session
        to <code>userPhone</code>.
      </p>

      <h2 id="errors">Error Handling</h2>
      <p>The codes you will see from StartMessaging:</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Status</th><th>Cause</th><th>Suggested response</th></tr>
          </thead>
          <tbody>
            <tr><td>400</td><td>Bad phone / OTP format</td><td>4xx to user</td></tr>
            <tr><td>402</td><td>Wallet exhausted</td><td>503 + ops alert</td></tr>
            <tr><td>410</td><td>OTP expired</td><td>410 with retry hint</td></tr>
            <tr><td>429</td><td>Provider rate-limit</td><td>429 with Retry-After</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="tests">Tests</h2>
      <p>
        For unit tests, mock global <code>fetch</code> with{' '}
        <code>vi.stubGlobal</code> (Vitest) or{' '}
        <code>jest.spyOn(global, 'fetch')</code>. Integration tests should hit
        the StartMessaging sandbox key — see our{' '}
        <Link href="/blog/testing-otp-flows-staging-sandboxes">
          guide on testing OTP flows in staging
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Want the same flow in NestJS, Hono or Next.js?{' '}
        <Link href="/blog/send-otp-nestjs">NestJS</Link>,{' '}
        <Link href="/blog/send-otp-nextjs-app-router">Next.js App Router</Link>,
        and the rest are in our{' '}
        <Link href="/blog">tutorials library</Link>.
      </p>
    </>
  ),
};
