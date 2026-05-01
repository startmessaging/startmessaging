import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-ionic',
  title: 'How to Send OTP in Ionic (Capacitor) — 2026',
  description:
    'Ionic + Capacitor OTP tutorial using StartMessaging. Angular service, Capacitor SMS Retriever plugin, and a Node backend pattern.',
  category: 'tutorials',
  keywords: [
    'send otp ionic',
    'ionic capacitor otp',
    'ionic sms otp india',
    'angular ionic otp',
  ],
  publishedAt: '2026-05-12',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'setup', title: 'Setup' },
    { id: 'service', title: 'Angular Service' },
    { id: 'page', title: 'Login Page' },
    { id: 'autofill', title: 'SMS Auto-Fill via Capacitor' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-react-native-expo',
    'send-otp-flutter-firebase',
    'mobile-app-otp-backend-react-native-flutter',
  ],
  faq: [
    {
      question: 'Is Ionic still relevant for Indian apps?',
      answer:
        'Many Indian agencies still ship Ionic for cost-efficient cross-platform apps. The OTP integration is identical to web Angular — just a fetch call.',
    },
  ],
  content: (
    <>
      <p>
        Ionic with Capacitor remains a popular cross-platform path for
        Indian agencies and SMB SaaS. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> on top of your existing
        Node backend.
      </p>

      <h2 id="setup">Setup</h2>
      <pre>
        <code>{`ionic start otp-ionic blank --type angular --capacitor
cd otp-ionic
npm install @capacitor-community/sms-retriever`}</code>
      </pre>

      <h2 id="service">Angular Service</h2>
      <pre>
        <code>{`// src/app/otp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OtpService {
  private base = 'https://your-backend.example.com';
  constructor(private http: HttpClient) {}

  send(phone: string) {
    return this.http.post<{ requestId: string }>(\`\${this.base}/auth/send-otp\`, { phoneNumber: phone });
  }
  verify(requestId: string, otpCode: string) {
    return this.http.post<{ verified: boolean }>(\`\${this.base}/auth/verify-otp\`, { requestId, otpCode });
  }
}`}</code>
      </pre>

      <h2 id="page">Login Page</h2>
      <pre>
        <code>{`// src/app/login/login.page.ts
export class LoginPage {
  phone = ''; code = ''; requestId: string | null = null;
  constructor(private otp: OtpService) {}
  async send() {
    const r = await firstValueFrom(this.otp.send(this.phone));
    this.requestId = r.requestId;
  }
  async verify() {
    await firstValueFrom(this.otp.verify(this.requestId!, this.code));
  }
}`}</code>
      </pre>

      <h2 id="autofill">SMS Auto-Fill via Capacitor</h2>
      <pre>
        <code>{`import { SmsRetriever } from '@capacitor-community/sms-retriever';

const result = await SmsRetriever.startWatch();
const code = result.message.match(/\\d{6}/)?.[0];`}</code>
      </pre>

      <h2 id="faq">FAQ</h2>
      <p>
        Flutter equivalent at{' '}
        <Link href="/blog/send-otp-flutter-firebase">our Flutter guide</Link>.
      </p>
    </>
  ),
};
