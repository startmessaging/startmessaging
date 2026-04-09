import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'mobile-app-otp-backend-react-native-flutter',
  title: 'Mobile App OTP: Keep Secrets on the Server (React Native & Flutter)',
  description:
    'Keep TRAI DLT-compliant SMS OTP on the server: React Native and Flutter clients call your API only—never ship SMS gateway keys for OTP SMS API India integrations.',
  category: 'tutorials',
  keywords: [
    'React Native OTP',
    'Flutter OTP SMS',
    'mobile app phone verification',
    'never put API key in app',
    'OTP backend architecture',
    'Expo OTP integration',
    'OTP SMS API India mobile',
    'send OTP without DLT in app',
    'DLT SMS API server side',
    'TRAI SMS OTP security',
    'transactional SMS React Native',
    'Flutter SMS OTP backend',
  ],
  publishedAt: '2026-04-12',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'no-keys-in-app', title: 'Never Ship SMS Provider Keys in the App' },
    { id: 'client-server-split', title: 'Client vs Server Responsibilities' },
    { id: 'rn-flutter-notes', title: 'React Native and Flutter Notes' },
    { id: 'pair-with-autofill', title: 'Pair With Autofill UX' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-autofill-android-ios-sms-retriever',
    'send-otp-nodejs',
    'sms-api-key-rotation-developers',
  ],
  faq: [
    {
      question: 'Can the app call StartMessaging directly?',
      answer:
        'You should not embed provider API keys in mobile binaries. Users can extract secrets from APKs and IPAs. Always call your own backend, which holds the server-side key and enforces rate limits.',
    },
    {
      question: 'Is this different from the Node.js tutorial?',
      answer:
        'Yes. The Node guide shows server-side HTTP calls. This article explains what moves to the mobile UI versus what stays in your API—complementary scope.',
    },
  ],
  content: (
    <>
      <p>
        Framework tutorials like{' '}
        <Link
          href="/blog/send-otp-nodejs"
          className="text-primary hover:underline"
        >
          Node.js OTP sends
        </Link>{' '}
        assume a trusted server. Mobile teams sometimes ask whether to call an
        SMS API straight from React Native or Flutter. The answer affects
        security and compliance: this post is <strong>only</strong> about that
        architecture split—not another language port of the same code samples.
      </p>

      <h2 id="no-keys-in-app">Never Ship SMS Provider Keys in the App</h2>
      <p>
        Anything in a mobile binary can be extracted. A leaked key means
        someone else sends SMS on your wallet—see{' '}
        <Link
          href="/blog/sms-api-key-rotation-developers"
          className="text-primary hover:underline"
        >
          API key rotation
        </Link>{' '}
        and{' '}
        <Link
          href="/blog/prevent-otp-fraud"
          className="text-primary hover:underline"
        >
          fraud prevention
        </Link>
        . Your mobile app should only talk to <em>your</em> backend with your
        own session or JWT authentication.
      </p>

      <h2 id="client-server-split">Client vs Server Responsibilities</h2>
      <p>
        <strong>Mobile client:</strong> collect phone number, show OTP field,
        handle{' '}
        <Link
          href="/blog/otp-autofill-android-ios-sms-retriever"
          className="text-primary hover:underline"
        >
          autofill
        </Link>
        , call <em>your</em> REST routes like POST /auth/request-otp and POST
        /auth/verify-otp.
      </p>
      <p>
        <strong>Backend:</strong> validate user identity context, enforce{' '}
        <Link
          href="/blog/otp-rate-limiting-guide"
          className="text-primary hover:underline"
        >
          rate limits
        </Link>
        , generate or delegate OTP storage, call StartMessaging with the server
        API key, return generic success or error to the app without leaking
        provider internals.
      </p>

      <h2 id="rn-flutter-notes">React Native and Flutter Notes</h2>
      <p>
        Use your stack&apos;s standard HTTP client (fetch, Dio, etc.) only for
        <em>your</em> API. Avoid adding native modules that embed third-party
        SMS SDKs with secrets. For Expo, follow the same rule: server-side
        integration, client-side UI only.
      </p>

      <h2 id="pair-with-autofill">Pair With Autofill UX</h2>
      <p>
        Once the pipeline is secure, invest in UX: the autofill article in this
        blog covers platform APIs; your React Native or Flutter screens should
        expose the right text field types so iOS and Android can suggest codes.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>See FAQ above.</p>
    </>
  ),
};
