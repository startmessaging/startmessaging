import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-astro',
  title: 'How to Send OTP with Astro (2026)',
  description:
    'Astro OTP login tutorial using StartMessaging. Uses Astro Actions / API routes, server-only env, and a clean two-step phone verification flow.',
  category: 'tutorials',
  keywords: [
    'send otp astro',
    'astro otp tutorial',
    'astro authentication',
    'astro sms otp',
  ],
  publishedAt: '2026-05-07',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Project Setup' },
    { id: 'env', title: 'Environment Variables' },
    { id: 'api-route', title: 'API Routes' },
    { id: 'frontend', title: 'Frontend Form' },
    { id: 'session', title: 'Session Cookie' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-sveltekit',
    'send-otp-nextjs-app-router',
    'send-otp-remix',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Does Astro support server actions like Next.js?',
      answer:
        'Astro 4 added Astro Actions for typed server functions. Older versions use API routes (.ts files in pages/api/). Both work for OTP flows.',
    },
    {
      question: 'Do I need a Node adapter for the API route?',
      answer:
        'Yes. Astro\'s default static output cannot run server code. Add the @astrojs/node or @astrojs/vercel adapter and set output: "server" in astro.config.mjs.',
    },
  ],
  content: (
    <>
      <p>
        Astro is increasingly used for marketing-led SaaS sites that need a
        thin auth layer. This tutorial adds OTP login with{' '}
        <Link href="/otp-api">StartMessaging</Link> on top of Astro&rsquo;s
        server output.
      </p>

      <h2 id="setup">Project Setup</h2>
      <pre>
        <code>{`pnpm create astro@latest otp-astro
cd otp-astro && pnpm install
pnpm astro add node
# astro.config.mjs: output: 'server'`}</code>
      </pre>

      <h2 id="env">Environment Variables</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx`}</code>
      </pre>

      <h2 id="api-route">API Routes</h2>
      <pre>
        <code>{`// src/pages/api/send-otp.ts
import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { phoneNumber } = await request.json();
  const res = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': import.meta.env.SM_API_KEY },
    body: JSON.stringify({ phoneNumber, idempotencyKey: randomUUID() }),
  });
  if (!res.ok) return new Response(JSON.stringify({ error: 'send failed' }), { status: res.status });
  const { data } = await res.json();
  cookies.set('otp_req', data.requestId, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 900 });
  return new Response(JSON.stringify({ expiresAt: data.expiresAt }));
};`}</code>
      </pre>
      <pre>
        <code>{`// src/pages/api/verify-otp.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { otpCode } = await request.json();
  const requestId = cookies.get('otp_req')?.value;
  if (!requestId) return new Response(JSON.stringify({ error: 'no active OTP' }), { status: 400 });

  const res = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': import.meta.env.SM_API_KEY },
    body: JSON.stringify({ requestId, otpCode }),
  });
  if (!res.ok) return new Response(JSON.stringify({ error: 'verify failed' }), { status: res.status });

  cookies.delete('otp_req');
  cookies.set('session', 'verified', { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 1800 });
  return new Response(JSON.stringify({ verified: true }));
};`}</code>
      </pre>

      <h2 id="frontend">Frontend Form</h2>
      <pre>
        <code>{`---
// src/pages/login.astro
---
<form id="phone-form">
  <input name="phoneNumber" placeholder="+919876543210" />
  <button>Send OTP</button>
</form>
<form id="otp-form" hidden>
  <input name="otpCode" placeholder="482910" />
  <button>Verify</button>
</form>

<script>
  document.getElementById('phone-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify(Object.fromEntries(fd)) });
    document.getElementById('otp-form')!.hidden = false;
  });
</script>`}</code>
      </pre>

      <h2 id="session">Session Cookie</h2>
      <p>
        Astro&rsquo;s <code>cookies</code> API on <code>APIContext</code>{' '}
        handles signed cookies natively. Configure secrets through your
        adapter settings.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Need the same flow in Next.js or SvelteKit? Browse our{' '}
        <Link href="/blog">tutorial library</Link>.
      </p>
    </>
  ),
};
