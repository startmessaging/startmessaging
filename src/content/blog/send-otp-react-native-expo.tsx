import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-react-native-expo',
  title: 'How to Send OTP in React Native (Expo) — 2026',
  description:
    'React Native OTP tutorial using Expo and StartMessaging. Includes secure storage, auto-fill (Android SMS Retriever / iOS keychain), and a Node backend pattern.',
  category: 'tutorials',
  keywords: [
    'react native otp expo',
    'expo sms otp',
    'react native otp india',
    'react native auth otp',
  ],
  publishedAt: '2026-05-12',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'setup', title: 'Setup' },
    { id: 'screens', title: 'Login Screens' },
    { id: 'service', title: 'OTP Service' },
    { id: 'autofill', title: 'OTP Auto-Fill' },
    { id: 'storage', title: 'Secure Token Storage' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-flutter-firebase',
    'mobile-app-otp-backend-react-native-flutter',
    'otp-autofill-android-ios-sms-retriever',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Should I use Expo SMS auto-fill?',
      answer:
        'Yes — expo-sms-retriever (or the unimodule wrapper) implements Google\'s SMS Retriever API on Android. iOS auto-fill via keyboard suggestion is automatic when the SMS is correctly formatted.',
    },
  ],
  content: (
    <>
      <p>
        Expo + React Native is a popular stack for Indian consumer apps.
        This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> via a small Node
        backend, with auto-fill and secure session storage.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Backend: Express + StartMessaging.</li>
        <li>App: phone screen → OTP screen.</li>
        <li>Android SMS Retriever for auto-fill.</li>
        <li>Expo SecureStore for the JWT token.</li>
      </ol>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`npx create-expo-app otp-rn
cd otp-rn
npx expo install expo-secure-store expo-otp-input
npm install zustand`}</code>
      </pre>

      <h2 id="screens">Login Screens</h2>
      <pre>
        <code>{`// App.tsx
import { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { otp } from './src/otpService';

export default function App() {
  const [phone, setPhone] = useState('');
  const [code, setCode]   = useState('');
  const [requestId, setRequestId] = useState<string|null>(null);

  return requestId === null ? (
    <View><TextInput value={phone} onChangeText={setPhone} placeholder="+919876543210" />
      <Button title="Send OTP" onPress={async () => setRequestId((await otp.send(phone)).requestId)} />
    </View>
  ) : (
    <View><TextInput value={code} onChangeText={setCode} keyboardType="number-pad" />
      <Button title="Verify" onPress={() => otp.verify(requestId, code)} />
    </View>
  );
}`}</code>
      </pre>

      <h2 id="service">OTP Service</h2>
      <pre>
        <code>{`// src/otpService.ts
const BASE = 'https://your-backend.example.com';

export const otp = {
  async send(phoneNumber: string) {
    const r = await fetch(\`\${BASE}/auth/send-otp\`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });
    return r.json();
  },
  async verify(requestId: string, otpCode: string) {
    const r = await fetch(\`\${BASE}/auth/verify-otp\`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, otpCode }),
    });
    return r.json();
  },
};`}</code>
      </pre>

      <h2 id="autofill">OTP Auto-Fill</h2>
      <p>
        See <Link href="/blog/otp-autofill-android-ios-sms-retriever">our
        auto-fill guide</Link> for the SMS Retriever API setup. The SMS body
        must end with a Google-defined hash so the OS can attribute it.
      </p>

      <h2 id="storage">Secure Token Storage</h2>
      <pre>
        <code>{`import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('session', token);`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Flutter equivalent in{' '}
        <Link href="/blog/send-otp-flutter-firebase">our Flutter guide</Link>.
      </p>
    </>
  ),
};
