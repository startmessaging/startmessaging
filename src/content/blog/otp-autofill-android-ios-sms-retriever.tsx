import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-autofill-android-ios-sms-retriever',
  title: 'OTP Autofill on Android and iOS: SMS Retriever and Beyond',
  description:
    'Improve OTP UX with Android SMS Retriever, User Consent API, and iOS one-time code fields. Aligns with TRAI DLT-approved SMS templates and StartMessaging when your backend sends the SMS.',
  category: 'tutorials',
  keywords: [
    'SMS Retriever API',
    'Android OTP autofill',
    'iOS OTP autofill',
    'one time code iOS',
    'OTP UX mobile',
    'Google Play SMS verification',
    'DLT SMS template India',
    'TRAI SMS OTP template',
    'service implicit SMS OTP',
    'SMS template variable DLT',
    'OTP SMS API India',
    'DLT template registration OTP',
    'transactional SMS autofill',
  ],
  publishedAt: '2026-04-11',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why-autofill', title: 'Why Autofill Matters for OTP' },
    { id: 'android-sms-retriever', title: 'Android: SMS Retriever and User Consent' },
    { id: 'ios-behavior', title: 'iOS: Web OTP and One-Time Code' },
    { id: 'backend-contract', title: 'What Your SMS Body Must Look Like' },
    { id: 'startmessaging-fit', title: 'Using StartMessaging in This Flow' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-verification-flow',
    'otp-sms-deliverability-checklist',
    'send-otp-nodejs',
  ],
  faq: [
    {
      question: 'Does StartMessaging format SMS text for SMS Retriever?',
      answer:
        'You control template variables (for example app name and OTP) through the API. To satisfy SMS Retriever, your approved DLT template and app-side hash configuration must align so the device can parse the message. Your Android app supplies the app hash Google Play uses to match incoming SMS.',
    },
    {
      question: 'Is autofill available on all devices?',
      answer:
        'Behavior varies by OS version, OEM SMS app, and whether the user granted SMS permissions or used the User Consent flow. Always keep a manual entry path and never assume autofill will fire.',
    },
  ],
  content: (
    <>
      <p>
        Faster OTP entry means higher conversion on signup and login. On mobile,
        that usually means letting the OS suggest or paste the code from SMS.
        This guide explains how Android and iOS handle OTP autofill and how it
        connects to a backend that sends OTP via an API like StartMessaging—not
        a repeat of generic &quot;build an OTP flow&quot; content, but the
        mobile-specific layer on top.
      </p>

      <h2 id="why-autofill">Why Autofill Matters for OTP</h2>
      <p>
        Typing six digits on a small keyboard is error-prone. Users switch apps,
        lose context, or mistype. Autofill reduces support tickets and abandoned
        sessions. For Indian apps where SMS OTP remains the default login factor,
        investing in platform autofill APIs pays off even when your server
        already uses a reliable{' '}
        <Link href="/otp-api" className="text-primary hover:underline">
          OTP API
        </Link>
        .
      </p>

      <h2 id="android-sms-retriever">Android: SMS Retriever and User Consent</h2>
      <p>
        Google offers the <strong>SMS Retriever API</strong> for app-initiated
        verification without the READ_SMS permission when messages include a
        specific app hash. For cases where the format does not match, the{' '}
        <strong>User Consent API</strong> can prompt once to allow reading a
        single SMS. Your implementation team reads Google&apos;s current
        documentation for Play policy and API levels.
      </p>
      <p>
        The critical integration point: the incoming SMS format must match what
        the Retriever expects, alongside your registered hash. That is a
        coordination problem between DLT-approved template text, your variable
        placeholders, and the client—not something the OTP provider invents for
        you.
      </p>

      <h2 id="ios-behavior">iOS: Web OTP and One-Time Code</h2>
      <p>
        Safari and in-app web views can use standards-based Web OTP where the
        SMS includes a domain-bound code format. Native iOS apps often use{' '}
        <strong>UITextField</strong> with <strong>textContentType oneTimeCode</strong>{' '}
        so iOS suggests codes from Messages when the SMS follows recognizable
        patterns. Test on real devices: simulators do not fully replicate SMS.
      </p>

      <h2 id="backend-contract">What Your SMS Body Must Look Like</h2>
      <p>
        Autofill is not magic if the message body drifts from what templates allow.
        Lock down copy with your compliance and SMS teams, then test end-to-end:
        send from staging through the same provider path you use in production.
        If you previously read our{' '}
        <Link
          href="/blog/otp-sms-deliverability-checklist"
          className="text-primary hover:underline"
        >
          deliverability checklist
        </Link>
        , autofill is the other half: the message must arrive <em>and</em> parse
        cleanly on the device.
      </p>

      <h2 id="startmessaging-fit">Using StartMessaging in This Flow</h2>
      <p>
        StartMessaging sends OTP SMS on Indian routes with DLT handled on the
        provider side when you use our hosted templates. Your app team owns
        autofill configuration; your backend owns generation, storage, and verify
        calls. Connect the two with explicit acceptance tests: one build that
        sends a real SMS to a test handset and asserts the client extracts the
        code. For server-side patterns, our{' '}
        <Link
          href="/blog/otp-verification-flow"
          className="text-primary hover:underline"
        >
          OTP verification flow
        </Link>{' '}
        article remains the blueprint—this post extends it to mobile UX.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>See the FAQ block above for short answers.</p>
    </>
  ),
};
