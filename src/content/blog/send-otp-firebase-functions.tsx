import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-firebase-functions',
  title: 'How to Send OTP with Firebase Functions (2026)',
  description:
    'Firebase Functions OTP tutorial using StartMessaging. Callable functions, Firestore for rate-limit, Firebase Auth custom-token issuance after OTP verification.',
  category: 'tutorials',
  keywords: [
    'send otp firebase functions',
    'firebase otp india',
    'firebase phone auth alternative',
    'firebase callable otp',
  ],
  publishedAt: '2026-05-11',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Not Firebase Phone Auth?' },
    { id: 'setup', title: 'Setup' },
    { id: 'callable', title: 'Callable Functions' },
    { id: 'rate-limit', title: 'Rate Limiting via Firestore' },
    { id: 'custom-token', title: 'Firebase Auth Custom Token' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'firebase-auth-vs-custom-otp',
    'send-otp-google-cloud-run',
    'send-otp-nodejs',
    'send-otp-react-native-expo',
  ],
  faq: [
    {
      question: 'Should I use Firebase Phone Auth or build with StartMessaging?',
      answer:
        'For Indian users, custom OTP via StartMessaging is typically cheaper, faster and DLT-handled. Firebase Phone Auth has hidden quotas and global pricing. See our comparison guide.',
    },
  ],
  content: (
    <>
      <p>
        Firebase is convenient for app backends, but Firebase Phone Auth is
        not always the right pick for India. This tutorial replaces it with
        custom OTP via StartMessaging while keeping Firebase Auth for
        session management.
      </p>

      <h2 id="why">Why Not Firebase Phone Auth?</h2>
      <p>
        See our deep dive on{' '}
        <Link href="/blog/firebase-auth-vs-custom-otp">
          Firebase Auth vs custom OTP
        </Link>
        .
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`firebase init functions
cd functions
npm install firebase-admin firebase-functions`}</code>
      </pre>

      <h2 id="callable">Callable Functions</h2>
      <pre>
        <code>{`// functions/src/index.ts
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { randomUUID } from 'node:crypto';

initializeApp();
const SM_KEY = defineSecret('SM_API_KEY');

export const sendOtp = onCall({ secrets: [SM_KEY] }, async (req) => {
  const { phoneNumber } = req.data;
  const r = await fetch('https://api.startmessaging.com/otp/send', {
    method: 'POST',
    headers: { 'X-API-Key': SM_KEY.value(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, idempotencyKey: randomUUID() }),
  });
  if (!r.ok) throw new HttpsError('unavailable', 'OTP send failed');
  return (await r.json()).data;
});

export const verifyOtp = onCall({ secrets: [SM_KEY] }, async (req) => {
  const { requestId, otpCode, phoneNumber } = req.data;
  const r = await fetch('https://api.startmessaging.com/otp/verify', {
    method: 'POST',
    headers: { 'X-API-Key': SM_KEY.value(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestId, otpCode }),
  });
  if (!r.ok) throw new HttpsError('unauthenticated', 'invalid OTP');

  // mint Firebase Auth custom token
  const uid = \`phone:\${phoneNumber}\`;
  const token = await getAuth().createCustomToken(uid, { phoneNumber });
  return { token };
});`}</code>
      </pre>

      <h2 id="rate-limit">Rate Limiting via Firestore</h2>
      <p>
        Use a Firestore document per phone with TTL field for hourly limits.
        Increment with <code>FieldValue.increment(1)</code>.
      </p>

      <h2 id="custom-token">Firebase Auth Custom Token</h2>
      <p>
        After successful verify, mint a custom token. Client signs in with{' '}
        <code>signInWithCustomToken</code> — and you have a Firebase Auth
        identity backed by your own OTP flow.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Same idea on Cloud Run? See{' '}
        <Link href="/blog/send-otp-google-cloud-run">our Cloud Run guide</Link>.
      </p>
    </>
  ),
};
