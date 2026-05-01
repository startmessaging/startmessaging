import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-flutter-firebase',
  title: 'How to Send OTP in Flutter with Firebase Backend (2026)',
  description:
    'Flutter OTP tutorial using StartMessaging on a Firebase Functions backend. Riverpod state, http client, secure cookie session via Firebase Auth custom token.',
  category: 'tutorials',
  keywords: [
    'flutter otp tutorial',
    'flutter sms otp',
    'flutter firebase otp',
    'flutter india otp',
  ],
  publishedAt: '2026-05-12',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'setup', title: 'Flutter Setup' },
    { id: 'service', title: 'OtpService Class' },
    { id: 'ui', title: 'Login UI with Riverpod' },
    { id: 'autofill', title: 'OTP Auto-Fill' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-react-native-expo',
    'send-otp-firebase-functions',
    'mobile-app-otp-backend-react-native-flutter',
    'otp-autofill-android-ios-sms-retriever',
  ],
  faq: [
    {
      question: 'Why custom OTP instead of Flutter\'s firebase_auth phone sign-in?',
      answer:
        'Custom OTP via StartMessaging is typically cheaper for India, has lower latency (no Google reCAPTCHA dance), and gives you control over template, sender ID and rate limits.',
    },
  ],
  content: (
    <>
      <p>
        Flutter apps in India typically front a Firebase backend. This
        tutorial uses Firebase Functions (with{' '}
        <Link href="/blog/send-otp-firebase-functions">our backend guide</Link>)
        and a Flutter front-end.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Backend: Firebase Functions calling StartMessaging.</li>
        <li>Flutter: <code>cloud_functions</code> client to invoke callables.</li>
        <li>On verify, sign in with Firebase Auth custom token.</li>
        <li>SMS Retriever auto-fill on Android.</li>
      </ol>

      <h2 id="setup">Flutter Setup</h2>
      <pre>
        <code>{`flutter create otp_flutter
cd otp_flutter
flutter pub add firebase_core firebase_auth cloud_functions flutter_riverpod sms_autofill`}</code>
      </pre>

      <h2 id="service">OtpService Class</h2>
      <pre>
        <code>{`// lib/services/otp_service.dart
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';

class OtpService {
  final _fns = FirebaseFunctions.instance;

  Future<({String requestId, DateTime expiresAt})> send(String phone) async {
    final r = await _fns.httpsCallable('sendOtp').call({'phoneNumber': phone});
    return (
      requestId: r.data['requestId'] as String,
      expiresAt: DateTime.parse(r.data['expiresAt'] as String),
    );
  }

  Future<void> verifyAndSignIn(String requestId, String code, String phone) async {
    final r = await _fns.httpsCallable('verifyOtp').call({
      'requestId': requestId,
      'otpCode': code,
      'phoneNumber': phone,
    });
    final token = r.data['token'] as String;
    await FirebaseAuth.instance.signInWithCustomToken(token);
  }
}`}</code>
      </pre>

      <h2 id="ui">Login UI with Riverpod</h2>
      <pre>
        <code>{`final otpServiceProvider = Provider((ref) => OtpService());

class LoginScreen extends ConsumerStatefulWidget {
  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  String? requestId;
  final phoneCtl = TextEditingController();
  final codeCtl  = TextEditingController();

  Future<void> _send() async {
    final r = await ref.read(otpServiceProvider).send(phoneCtl.text);
    setState(() => requestId = r.requestId);
  }

  Future<void> _verify() async {
    await ref.read(otpServiceProvider).verifyAndSignIn(requestId!, codeCtl.text, phoneCtl.text);
  }

  @override
  Widget build(BuildContext context) {
    return requestId == null
      ? Column(children: [TextField(controller: phoneCtl), ElevatedButton(onPressed: _send, child: Text('Send OTP'))])
      : Column(children: [TextField(controller: codeCtl), ElevatedButton(onPressed: _verify, child: Text('Verify'))]);
  }
}`}</code>
      </pre>

      <h2 id="autofill">OTP Auto-Fill</h2>
      <p>
        Use the <code>sms_autofill</code> package + Android SMS Retriever
        API. See our{' '}
        <Link href="/blog/otp-autofill-android-ios-sms-retriever">
          auto-fill guide
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        React Native equivalent in{' '}
        <Link href="/blog/send-otp-react-native-expo">
          our React Native guide
        </Link>
        .
      </p>
    </>
  ),
};
