import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-nextjs-app-router',
  title: 'Send OTP in Next.js (App Router) — Server Actions Guide 2026',
  description:
    'Send and verify SMS OTPs from a Next.js 14/15 App Router app using server actions and the StartMessaging API. Includes a full login form, server actions, and middleware.',
  category: 'tutorials',
  keywords: [
    'send otp nextjs app router',
    'next.js otp server actions',
    'next.js phone otp login',
    'next.js sms otp api',
    'startmessaging next.js',
    'next.js 14 phone verification',
    'next.js otp login india',
    'next.js otp without dlt',
    'react otp form input',
    'next.js auth otp tutorial',
  ],
  publishedAt: '2026-04-18',
  readingTime: 10,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-server-actions', title: 'Why Server Actions for OTP' },
    { id: 'env', title: 'Environment Setup' },
    { id: 'send-action', title: 'Server Action to Send OTP' },
    { id: 'verify-action', title: 'Server Action to Verify OTP' },
    { id: 'login-form', title: 'Client Login Form' },
    { id: 'middleware', title: 'Middleware to Protect Routes' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nodejs', 'otp-verification-flow', 'otp-autofill-android-ios-sms-retriever'],
  faq: [
    {
      question: 'Should I call StartMessaging from a route handler or a server action?',
      answer:
        'For form submissions, server actions are simpler and avoid round-tripping through fetch on the client. Use a route handler (app/api/...) only when an external service needs to call your endpoint.',
    },
    {
      question: 'Can I use NextAuth with phone OTP?',
      answer:
        'Yes. NextAuth supports a Credentials Provider — call StartMessaging.verifyOtp inside the authorize callback. The simpler pattern shown in this guide stores the verified flag directly in a session cookie.',
    },
    {
      question: 'How do I prevent client-side abuse of the send action?',
      answer:
        'Rate-limit the action by IP and phone number. Vercel KV or Upstash Redis with a sliding window of 3 sends per 10 minutes per phone is a sane default. See our linked rate limiting guide.',
    },
  ],
  content: (
    <>
      <p>
        The Next.js App Router&rsquo;s server actions make phone OTP login
        almost trivial: no API routes, no client-side fetch, just a form that
        calls a server function. This guide builds a complete OTP login flow
        backed by the <Link href="/otp-api">StartMessaging OTP API</Link>.
      </p>

      <h2 id="why-server-actions">Why Server Actions for OTP</h2>
      <p>
        Server actions run on the Next.js server, so your StartMessaging API
        key never reaches the browser. They progressively enhance form
        submissions, work without JavaScript, and let you set cookies
        atomically with the response.
      </p>

      <h2 id="env">Environment Setup</h2>
      <pre>
        <code>{`# .env.local
STARTMESSAGING_API_KEY=sm_live_xxxxxxxxxxxxxxxxxxxx
STARTMESSAGING_BASE_URL=https://api.startmessaging.com`}</code>
      </pre>

      <h2 id="send-action">Server Action to Send OTP</h2>
      <pre>
        <code>{`// app/(auth)/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';

const BASE = process.env.STARTMESSAGING_BASE_URL!;
const KEY = process.env.STARTMESSAGING_API_KEY!;

export async function sendOtpAction(formData: FormData) {
  const phone = String(formData.get('phone') ?? '').trim();
  if (!/^\\+91\\d{10}$/.test(phone)) {
    return { error: 'Enter a valid Indian mobile number' };
  }

  const res = await fetch(\`\${BASE}/otp/send\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': KEY },
    body: JSON.stringify({ phoneNumber: phone, idempotencyKey: randomUUID() }),
    cache: 'no-store',
  });
  const json = await res.json();
  if (!res.ok) return { error: json.message ?? 'Failed to send OTP' };

  cookies().set('otp_request_id', json.data.requestId, {
    httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600,
  });
  redirect('/login/verify');
}`}</code>
      </pre>

      <h2 id="verify-action">Server Action to Verify OTP</h2>
      <pre>
        <code>{`export async function verifyOtpAction(formData: FormData) {
  const code = String(formData.get('code') ?? '').trim();
  const requestId = cookies().get('otp_request_id')?.value;
  if (!requestId) return { error: 'Session expired. Send a new OTP.' };

  const res = await fetch(\`\${BASE}/otp/verify\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': KEY },
    body: JSON.stringify({ requestId, otpCode: code }),
    cache: 'no-store',
  });
  const json = await res.json();
  if (!res.ok || !json.data?.verified) return { error: 'Wrong code' };

  cookies().delete('otp_request_id');
  cookies().set('session', 'verified', { httpOnly: true, secure: true, sameSite: 'lax' });
  redirect('/dashboard');
}`}</code>
      </pre>

      <h2 id="login-form">Client Login Form</h2>
      <pre>
        <code>{`// app/(auth)/login/page.tsx
import { sendOtpAction } from '../actions';

export default function LoginPage() {
  return (
    <form action={sendOtpAction} className="space-y-4">
      <input name="phone" type="tel" placeholder="+91 98765 43210" required />
      <button type="submit">Send OTP</button>
    </form>
  );
}`}</code>
      </pre>

      <h2 id="middleware">Middleware to Protect Routes</h2>
      <pre>
        <code>{`// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (req.cookies.get('session')?.value !== 'verified') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}`}</code>
      </pre>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>
          <strong>Use the Web OTP API</strong> on the verify page so Chrome on
          Android can autofill the code. See our guide on{' '}
          <Link href="/blog/otp-autofill-android-ios-sms-retriever">
            OTP autofill on Android &amp; iOS
          </Link>
          .
        </li>
        <li>
          <strong>Rate-limit the send action</strong> by phone and IP using
          Vercel KV.
        </li>
        <li>
          <strong>Encrypt the session cookie</strong> with iron-session or
          jose.
        </li>
        <li>
          <strong>Show resend timer</strong> in the UI to prevent users from
          spamming send.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Curious about pricing? <Link href="/pricing">It&rsquo;s Rs 0.25 per OTP</Link>{' '}
        with no DLT registration required.
      </p>
    </>
  ),
};
