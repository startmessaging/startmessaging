import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-sveltekit',
  title: 'How to Send OTP with SvelteKit (2026)',
  description:
    'SvelteKit OTP tutorial using StartMessaging — uses form actions, server-only modules, hooks for session, and Zod for validation. Production-ready end-to-end flow.',
  category: 'tutorials',
  keywords: [
    'send otp sveltekit',
    'sveltekit otp api',
    'svelte otp verification',
    'sveltekit form actions',
    'startmessaging sveltekit',
  ],
  publishedAt: '2026-04-27',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'project-setup', title: 'Project Setup' },
    { id: 'env', title: 'Environment Variables' },
    { id: 'sm-server', title: 'A Server-Only StartMessaging Module' },
    { id: 'send-action', title: 'Send OTP — Form Action' },
    { id: 'verify-action', title: 'Verify OTP — Form Action' },
    { id: 'session-hook', title: 'Session via hooks.server.ts' },
    { id: 'forms', title: 'The Login Forms' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-nextjs-app-router',
    'send-otp-nodejs',
    'send-otp-express',
    'otp-verification-flow',
  ],
  faq: [
    {
      question: 'Why server-only ($lib/server)?',
      answer:
        'API keys must never reach the browser. SvelteKit\'s $lib/server convention enforces this — anything in that folder will be rejected by the bundler if a client component tries to import it.',
    },
    {
      question: 'Should I use form actions or +server.ts?',
      answer:
        'For a login flow: form actions. They handle progressive enhancement, CSRF protection and form validation natively. Use +server.ts only when you need a JSON-only API endpoint for non-Svelte clients.',
    },
    {
      question: 'How do I keep the requestId between send and verify?',
      answer:
        'Stash it in a signed, httpOnly cookie (15-minute expiry). The verify action reads it from event.cookies.get() — no client state required.',
    },
  ],
  content: (
    <>
      <p>
        SvelteKit&rsquo;s server-only modules + form actions are an excellent
        pattern for OTP flows: every secret stays server-side, every state
        change goes through a typed action, and progressive enhancement is
        free. This guide builds an end-to-end OTP login on top of{' '}
        <Link href="/otp-api">StartMessaging</Link>.
      </p>

      <h2 id="project-setup">Project Setup</h2>
      <pre>
        <code>{`pnpm create svelte@latest otp-sveltekit
cd otp-sveltekit
pnpm install
pnpm add zod
pnpm add -D @types/node`}</code>
      </pre>

      <h2 id="env">Environment Variables</h2>
      <pre>
        <code>{`# .env
SM_API_KEY=sm_live_xxxxxxxxxxxxxxxx
SM_BASE_URL=https://api.startmessaging.com
SESSION_SECRET=replace-with-a-real-secret`}</code>
      </pre>
      <p>
        SvelteKit exposes these via <code>$env/static/private</code> — perfectly
        unreachable from client code.
      </p>

      <h2 id="sm-server">A Server-Only StartMessaging Module</h2>
      <pre>
        <code>{`// src/lib/server/sm.ts
import { SM_API_KEY, SM_BASE_URL } from '$env/static/private';
import { randomUUID } from 'node:crypto';

async function smPost<T>(path: string, body: object): Promise<T> {
  const res = await fetch(\`\${SM_BASE_URL}\${path}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': SM_API_KEY },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const json = await res.json().catch(() => ({} as any));
  if (!res.ok) throw Object.assign(new Error(json.message ?? 'OTP API'), { status: res.status });
  return json.data as T;
}

export interface SendData { requestId: string; expiresAt: string; attemptsLeft: number; }

export const sm = {
  send: (phoneNumber: string) =>
    smPost<SendData>('/otp/send', { phoneNumber, idempotencyKey: randomUUID() }),
  verify: (requestId: string, otpCode: string) =>
    smPost<{ verified: true }>('/otp/verify', { requestId, otpCode }),
};`}</code>
      </pre>

      <h2 id="send-action">Send OTP — Form Action</h2>
      <pre>
        <code>{`// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';
import { sm } from '$lib/server/sm';

const PhoneSchema = z.object({ phoneNumber: z.string().regex(/^\\+91\\d{10}$/) });
const CodeSchema  = z.object({ otpCode: z.string().regex(/^\\d{4,8}$/) });

export const actions: Actions = {
  send: async ({ request, cookies }) => {
    const data = Object.fromEntries(await request.formData());
    const parsed = PhoneSchema.safeParse(data);
    if (!parsed.success) return fail(400, { error: 'Invalid phone number' });

    try {
      const { requestId, expiresAt } = await sm.send(parsed.data.phoneNumber);
      cookies.set('otp_req', requestId, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });
      return { stage: 'verify', expiresAt };
    } catch (e: any) {
      return fail(e.status ?? 500, { error: e.message ?? 'Failed' });
    }
  },

  verify: async ({ request, cookies }) => {
    const data = Object.fromEntries(await request.formData());
    const parsed = CodeSchema.safeParse(data);
    if (!parsed.success) return fail(400, { error: 'Invalid OTP' });

    const requestId = cookies.get('otp_req');
    if (!requestId) return fail(400, { error: 'No active OTP request' });

    try {
      await sm.verify(requestId, parsed.data.otpCode);
      cookies.delete('otp_req', { path: '/' });
      cookies.set('session', 'verified-user', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 60,
      });
      throw redirect(303, '/dashboard');
    } catch (e: any) {
      return fail(e.status ?? 500, { error: e.message ?? 'Failed' });
    }
  },
};`}</code>
      </pre>

      <h2 id="verify-action">Verify OTP — Form Action</h2>
      <p>
        Already wired into the same actions object above (the{' '}
        <code>verify</code> action). The two actions read from cookies, never
        from the browser, so a stolen requestId from the network does not let
        an attacker complete the flow without the matching session.
      </p>

      <h2 id="session-hook">Session via hooks.server.ts</h2>
      <pre>
        <code>{`// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = event.cookies.get('session') ? { phone: 'verified' } : null;
  if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
    return new Response(null, { status: 303, headers: { location: '/login' } });
  }
  return resolve(event);
};`}</code>
      </pre>

      <h2 id="forms">The Login Forms</h2>
      <pre>
        <code>{`<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<form method="POST" action="?/send">
  <label>Phone <input name="phoneNumber" placeholder="+919876543210" /></label>
  <button type="submit">Send OTP</button>
</form>

{#if form?.stage === 'verify'}
  <form method="POST" action="?/verify">
    <label>OTP <input name="otpCode" placeholder="482910" /></label>
    <button type="submit">Verify</button>
  </form>
{/if}

{#if form?.error}
  <p style="color: red">{form.error}</p>
{/if}`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Looking for the same flow on Next.js, Nuxt or Remix? See{' '}
        <Link href="/blog/send-otp-nextjs-app-router">Next.js App Router</Link>{' '}
        and the full <Link href="/blog">tutorials index</Link>.
      </p>
    </>
  ),
};
