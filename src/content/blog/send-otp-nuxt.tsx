import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-nuxt',
  title: 'How to Send OTP with Nuxt 3 (2026)',
  description:
    'Nuxt 3 OTP login tutorial using StartMessaging. Uses server routes, useRuntimeConfig for secrets, signed cookies and a clean two-step flow.',
  category: 'tutorials',
  keywords: [
    'send otp nuxt',
    'nuxt 3 otp',
    'nuxt sms otp',
    'nuxt authentication',
  ],
  publishedAt: '2026-05-07',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'config', title: 'Runtime Config' },
    { id: 'server', title: 'Server Routes' },
    { id: 'composable', title: 'Auth Composable' },
    { id: 'page', title: 'Login Page' },
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
      question: 'Why useRuntimeConfig instead of process.env?',
      answer:
        'Nuxt 3 enforces a runtime-config pattern that distinguishes private (server-only) and public (client+server) values. API keys must go in the private section.',
    },
    {
      question: 'Server routes vs Nitro tasks?',
      answer:
        'Use server routes for synchronous request/response (login). Use Nitro tasks for cron-like background work.',
    },
  ],
  content: (
    <>
      <p>
        Nuxt 3 + Nitro gives you typed server routes with native cookie
        helpers — a tidy match for OTP login. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link>.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`pnpm create nuxt@latest otp-nuxt
cd otp-nuxt && pnpm install
pnpm add zod`}</code>
      </pre>

      <h2 id="config">Runtime Config</h2>
      <pre>
        <code>{`// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    smApiKey: process.env.SM_API_KEY,
    smBaseUrl: 'https://api.startmessaging.com',
  },
});`}</code>
      </pre>

      <h2 id="server">Server Routes</h2>
      <pre>
        <code>{`// server/api/auth/send.post.ts
import { randomUUID } from 'node:crypto';

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig();
  const { phoneNumber } = await readBody(event);
  const data = await $fetch<{ data: { requestId: string; expiresAt: string }}>(\`\${cfg.smBaseUrl}/otp/send\`, {
    method: 'POST',
    headers: { 'X-API-Key': cfg.smApiKey, 'Content-Type': 'application/json' },
    body: { phoneNumber, idempotencyKey: randomUUID() },
  });
  setCookie(event, 'otp_req', data.data.requestId, {
    httpOnly: true, sameSite: 'lax', secure: true, maxAge: 900,
  });
  return { expiresAt: data.data.expiresAt };
});`}</code>
      </pre>
      <pre>
        <code>{`// server/api/auth/verify.post.ts
export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig();
  const { otpCode } = await readBody(event);
  const requestId = getCookie(event, 'otp_req');
  if (!requestId) throw createError({ statusCode: 400, message: 'No active OTP' });
  await $fetch(\`\${cfg.smBaseUrl}/otp/verify\`, {
    method: 'POST',
    headers: { 'X-API-Key': cfg.smApiKey, 'Content-Type': 'application/json' },
    body: { requestId, otpCode },
  });
  deleteCookie(event, 'otp_req');
  setCookie(event, 'session', 'verified', { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 1800 });
  return { verified: true };
});`}</code>
      </pre>

      <h2 id="composable">Auth Composable</h2>
      <pre>
        <code>{`// composables/useAuth.ts
export function useAuth() {
  return {
    sendOtp: (phoneNumber: string) =>
      $fetch('/api/auth/send', { method: 'POST', body: { phoneNumber }}),
    verifyOtp: (otpCode: string) =>
      $fetch('/api/auth/verify', { method: 'POST', body: { otpCode }}),
  };
}`}</code>
      </pre>

      <h2 id="page">Login Page</h2>
      <pre>
        <code>{`<!-- pages/login.vue -->
<script setup lang="ts">
const { sendOtp, verifyOtp } = useAuth();
const phone = ref('');
const code = ref('');
const stage = ref<'phone' | 'verify'>('phone');
async function handleSend() {
  await sendOtp(phone.value); stage.value = 'verify';
}
async function handleVerify() {
  await verifyOtp(code.value); navigateTo('/dashboard');
}
</script>
<template>
  <form v-if="stage === 'phone'" @submit.prevent="handleSend">
    <input v-model="phone" placeholder="+919876543210" />
    <button>Send OTP</button>
  </form>
  <form v-else @submit.prevent="handleVerify">
    <input v-model="code" placeholder="482910" />
    <button>Verify</button>
  </form>
</template>`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Same flow in Next.js, SvelteKit, Remix? See our{' '}
        <Link href="/blog">tutorial library</Link>.
      </p>
    </>
  ),
};
