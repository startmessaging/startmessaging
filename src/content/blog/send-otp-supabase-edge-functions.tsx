import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-supabase-edge-functions',
  title: 'Phone OTP with Supabase Edge Functions and StartMessaging',
  description:
    'Add phone OTP login to a Supabase project using a Deno edge function that proxies the StartMessaging API. Includes function code, RLS rules, and a React client.',
  category: 'tutorials',
  keywords: [
    'supabase phone otp',
    'supabase edge function otp',
    'supabase startmessaging',
    'deno otp api',
    'supabase auth otp india',
    'supabase phone login custom',
    'supabase otp without dlt',
    'supabase india sms otp',
    'supabase rls phone',
    'supabase verify phone',
  ],
  publishedAt: '2026-04-24',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Not Supabase\'s Built-in Phone Auth' },
    { id: 'edge-function', title: 'Edge Function: Send OTP' },
    { id: 'verify-function', title: 'Edge Function: Verify OTP' },
    { id: 'react-client', title: 'React Client' },
    { id: 'rls', title: 'RLS Rules After Verification' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['send-otp-nextjs-app-router', 'send-otp-nodejs', 'pay-as-you-go-wallet-inr-sms-api'],
  faq: [
    {
      question: 'Why not just use Supabase\'s built-in phone auth?',
      answer:
        'Supabase\'s built-in phone auth requires you to bring a Twilio or MessageBird account, both of which need DLT registration in India. StartMessaging is DLT-free and costs Rs 0.25 per OTP, so wrapping it in an edge function is cheaper and faster to ship.',
    },
    {
      question: 'How do I link the verified phone to a Supabase user?',
      answer:
        'After verifying with StartMessaging in the edge function, use the Supabase service role to insert or update a row in your users table marking the phone as verified, then return a session token to the client.',
    },
    {
      question: 'Will this work on the Supabase Free tier?',
      answer:
        'Yes. Edge functions are included on the Free tier with generous quotas. The StartMessaging API call is just a single fetch — well under the function timeout.',
    },
  ],
  content: (
    <>
      <p>
        Supabase&rsquo;s built-in phone auth assumes you have Twilio configured,
        which means DLT paperwork in India and a $1.50 minimum send. With a
        ~30-line edge function you can swap that for{' '}
        <Link href="/dlt-free-otp">StartMessaging&rsquo;s DLT-free OTP API</Link>{' '}
        and pay Rs 0.25 per send.
      </p>

      <h2 id="why">Why Not Supabase&rsquo;s Built-in Phone Auth</h2>
      <p>
        Supabase&rsquo;s phone auth provider list is global by default and
        every Indian-friendly option (Twilio, Vonage, MessageBird) requires DLT
        principal entity registration plus template approvals. That&rsquo;s
        2&ndash;6 weeks of paperwork before your first OTP. Wrapping
        StartMessaging in an edge function gets you live on the same day.
      </p>

      <h2 id="edge-function">Edge Function: Send OTP</h2>
      <pre>
        <code>{`// supabase/functions/send-otp/index.ts
import { serve } from "https://deno.land/std@0.215.0/http/server.ts";

const KEY = Deno.env.get("STARTMESSAGING_API_KEY")!;

serve(async (req) => {
  const { phone } = await req.json();
  if (!/^\\+91\\d{10}$/.test(phone)) {
    return new Response(JSON.stringify({ error: "invalid phone" }), { status: 400 });
  }

  const res = await fetch("https://api.startmessaging.com/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": KEY },
    body: JSON.stringify({ phoneNumber: phone, idempotencyKey: crypto.randomUUID() }),
  });
  const json = await res.json();
  if (!res.ok) {
    return new Response(JSON.stringify({ error: json.message }), { status: 502 });
  }
  return new Response(JSON.stringify({ requestId: json.data.requestId }), {
    headers: { "Content-Type": "application/json" },
  });
});`}</code>
      </pre>

      <h2 id="verify-function">Edge Function: Verify OTP</h2>
      <pre>
        <code>{`// supabase/functions/verify-otp/index.ts
import { serve } from "https://deno.land/std@0.215.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const KEY = Deno.env.get("STARTMESSAGING_API_KEY")!;
const SUPA = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const { requestId, code, phone } = await req.json();

  const res = await fetch("https://api.startmessaging.com/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": KEY },
    body: JSON.stringify({ requestId, otpCode: code }),
  });
  const json = await res.json();
  if (!res.ok || !json.data?.verified) {
    return new Response(JSON.stringify({ verified: false }), { status: 401 });
  }

  // Upsert the user, mark phone verified
  const { data: user, error } = await SUPA.auth.admin.createUser({
    phone,
    phone_confirm: true,
  });
  if (error && !error.message.includes("already")) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ verified: true, user }));
});`}</code>
      </pre>

      <h2 id="react-client">React Client</h2>
      <pre>
        <code>{`const { data: send } = await supabase.functions.invoke("send-otp", { body: { phone } });
// later, after the user enters the code
const { data: verified } = await supabase.functions.invoke("verify-otp", {
  body: { requestId: send.requestId, code, phone },
});`}</code>
      </pre>

      <h2 id="rls">RLS Rules After Verification</h2>
      <p>
        Once the user is created with <code>phone_confirm: true</code>, they
        receive a normal Supabase JWT and your existing RLS policies based on{' '}
        <code>auth.uid()</code> work unchanged. There&rsquo;s no need to bend
        your policies for the OTP flow.
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Set <code>STARTMESSAGING_API_KEY</code> as a function secret, not a project env var.</li>
        <li>Rate-limit by IP at the edge using a counter table or upstash redis.</li>
        <li>Never return the OTP code in the function response body.</li>
        <li>Log only request IDs, never phone numbers in plain text.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Want to compare with a Next.js implementation? See our{' '}
        <Link href="/blog/send-otp-nextjs-app-router">
          Next.js App Router OTP guide
        </Link>
        .
      </p>
    </>
  ),
};
