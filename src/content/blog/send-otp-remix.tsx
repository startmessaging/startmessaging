import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-remix',
  title: 'How to Send OTP with Remix (2026)',
  description:
    'Remix OTP login tutorial using StartMessaging. Uses action functions, server-only utilities, signed cookies for session, and Zod for validation.',
  category: 'tutorials',
  keywords: [
    'send otp remix',
    'remix otp tutorial',
    'remix authentication otp',
    'remix sms otp',
  ],
  publishedAt: '2026-05-07',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Project Setup' },
    { id: 'env', title: 'Environment Variables' },
    { id: 'server', title: 'Server-Only StartMessaging Utility' },
    { id: 'action', title: 'Action: Send and Verify' },
    { id: 'session', title: 'Session via Signed Cookie' },
    { id: 'form', title: 'The Form Component' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nextjs-app-router',
    'send-otp-sveltekit',
    'send-otp-nodejs',
    'send-otp-express',
  ],
  faq: [
    {
      question: 'Why .server.ts in Remix?',
      answer:
        'Modules with .server.ts are excluded from the client bundle. Put any module that touches API keys behind .server.ts so secrets never reach the browser.',
    },
    {
      question: 'Should I use loaders or actions for OTP send?',
      answer:
        'Actions. Sending an OTP is a side-effecting mutation. Loaders are for reads.',
    },
  ],
  content: (
    <>
      <p>
        Remix actions + server-only utilities are a clean fit for OTP login.
        This tutorial wires up{' '}
        <Link href="/otp-api">StartMessaging</Link> with Zod validation and
        a signed-cookie session.
      </p>

      <h2 id="setup">Project Setup</h2>
      <pre>
        <code>{`pnpm create remix@latest otp-remix
cd otp-remix && pnpm install
pnpm add zod`}</code>
      </pre>

      <h2 id="env">Environment Variables</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com
SESSION_SECRET=replace-me`}</code>
      </pre>

      <h2 id="server">Server-Only StartMessaging Utility</h2>
      <pre>
        <code>{`// app/lib/sm.server.ts
import { randomUUID } from 'node:crypto';

export async function smSend(phoneNumber: string) {
  const res = await fetch(\`\${process.env.SM_BASE_URL}/otp/send\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.SM_API_KEY! },
    body: JSON.stringify({ phoneNumber, idempotencyKey: randomUUID() }),
  });
  if (!res.ok) throw new Error((await res.json()).message ?? 'OTP send failed');
  return (await res.json()).data as { requestId: string; expiresAt: string };
}

export async function smVerify(requestId: string, otpCode: string) {
  const res = await fetch(\`\${process.env.SM_BASE_URL}/otp/verify\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': process.env.SM_API_KEY! },
    body: JSON.stringify({ requestId, otpCode }),
  });
  if (!res.ok) throw new Error('Verification failed');
  return true;
}`}</code>
      </pre>

      <h2 id="action">Action: Send and Verify</h2>
      <pre>
        <code>{`// app/routes/login.tsx
import { type ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { z } from 'zod';
import { smSend, smVerify } from '~/lib/sm.server';
import { commitSession, getSession } from '~/lib/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  const form = await request.formData();
  const intent = form.get('intent');

  if (intent === 'send') {
    const phone = z.string().regex(/^\\+91\\d{10}$/).parse(form.get('phoneNumber'));
    const { requestId } = await smSend(phone);
    session.set('otpReq', requestId);
    return json({ stage: 'verify' }, { headers: { 'Set-Cookie': await commitSession(session) }});
  }
  if (intent === 'verify') {
    const code = z.string().regex(/^\\d{4,8}$/).parse(form.get('otpCode'));
    const requestId = session.get('otpReq');
    if (!requestId) return json({ error: 'No active OTP' });
    await smVerify(requestId, code);
    session.unset('otpReq');
    session.set('userPhone', 'verified');
    return redirect('/dashboard', { headers: { 'Set-Cookie': await commitSession(session) }});
  }
}`}</code>
      </pre>

      <h2 id="session">Session via Signed Cookie</h2>
      <pre>
        <code>{`// app/lib/session.server.ts
import { createCookieSessionStorage } from '@remix-run/node';

const { getSession: gs, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'session',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      secrets: [process.env.SESSION_SECRET!],
      maxAge: 30 * 60,
    },
  });

export const getSession = (request: Request) =>
  gs(request.headers.get('Cookie'));
export { commitSession, destroySession };`}</code>
      </pre>

      <h2 id="form">The Form Component</h2>
      <pre>
        <code>{`// app/routes/login.tsx (default export)
import { Form, useActionData } from '@remix-run/react';
export default function Login() {
  const data = useActionData<typeof action>();
  return (
    <>
      <Form method="post">
        <input name="phoneNumber" placeholder="+919876543210" />
        <button name="intent" value="send">Send OTP</button>
      </Form>
      {data?.stage === 'verify' && (
        <Form method="post">
          <input name="otpCode" placeholder="482910" />
          <button name="intent" value="verify">Verify</button>
        </Form>
      )}
    </>
  );
}`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Same flow in Next.js, SvelteKit and Express? See our{' '}
        <Link href="/blog">tutorials library</Link>.
      </p>
    </>
  ),
};
