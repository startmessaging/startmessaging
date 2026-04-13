import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-swift-ios',
  title: 'Send Phone OTP in Swift / iOS — 2026 Tutorial',
  description:
    'Verify phone numbers in iOS apps with Swift, calling your backend that proxies the StartMessaging OTP API. Includes URLSession, async/await, and SwiftUI form examples.',
  category: 'tutorials',
  keywords: [
    'send otp swift',
    'ios phone verification swift',
    'swift sms otp api',
    'swiftui otp form',
    'urlsession otp',
    'startmessaging ios',
    'swift async await otp',
    'ios otp without dlt',
    'sms otp ios india',
    'swiftui phone login',
  ],
  publishedAt: '2026-04-22',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'architecture', title: 'Architecture: Backend Proxy' },
    { id: 'api-client', title: 'Swift API Client' },
    { id: 'swiftui-form', title: 'SwiftUI Phone Login Form' },
    { id: 'autofill', title: 'iOS One-Time Code Autofill' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['mobile-app-otp-backend-react-native-flutter', 'otp-autofill-android-ios-sms-retriever', 'send-otp-kotlin-android'],
  faq: [
    {
      question: 'Why not call StartMessaging directly from the iOS app?',
      answer:
        'Because the API key would be embedded in the IPA and discoverable. Always proxy through your own backend so the key never leaves the server.',
    },
    {
      question: 'Does iOS automatically suggest the OTP from the SMS?',
      answer:
        'Yes — set the textContentType to oneTimeCode and iOS will surface the code from the lock-screen banner if the SMS is delivered while the user is on your verify screen.',
    },
    {
      question: 'Should I use Combine, async/await, or callbacks?',
      answer:
        'For new code, prefer async/await. It is the simplest and works on iOS 13+ with backports. The example in this guide uses async URLSession.',
    },
  ],
  content: (
    <>
      <p>
        Phone OTP is the standard way to verify users on iOS in India,
        especially for fintech, food delivery, and quick-commerce apps. This
        guide shows the SwiftUI + async/await pattern that calls your own
        backend, which in turn proxies the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link>.
      </p>

      <h2 id="architecture">Architecture: Backend Proxy</h2>
      <p>
        Never call StartMessaging directly from the iOS app. The flow looks
        like:
      </p>
      <pre>
        <code>{`iOS app  ──POST /auth/send-otp──▶ Your backend ──▶ StartMessaging API
iOS app  ──POST /auth/verify-otp─▶ Your backend ──▶ StartMessaging API`}</code>
      </pre>

      <h2 id="api-client">Swift API Client</h2>
      <pre>
        <code>{`import Foundation

struct SendOtpRes: Decodable {
    let requestId: String
    let expiresAt: String
}

struct VerifyOtpRes: Decodable { let verified: Bool }

enum OtpError: Error { case server, decoding }

actor AuthClient {
    let base = URL(string: "https://api.yourapp.com")!

    func sendOtp(phone: String) async throws -> SendOtpRes {
        var req = URLRequest(url: base.appendingPathComponent("auth/send-otp"))
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONSerialization.data(withJSONObject: ["phoneNumber": phone])

        let (data, res) = try await URLSession.shared.data(for: req)
        guard let http = res as? HTTPURLResponse, http.statusCode < 400 else { throw OtpError.server }
        return try JSONDecoder().decode(SendOtpRes.self, from: data)
    }

    func verifyOtp(requestId: String, code: String) async throws -> Bool {
        var req = URLRequest(url: base.appendingPathComponent("auth/verify-otp"))
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONSerialization.data(withJSONObject: [
            "requestId": requestId, "otpCode": code
        ])

        let (data, _) = try await URLSession.shared.data(for: req)
        return try JSONDecoder().decode(VerifyOtpRes.self, from: data).verified
    }
}`}</code>
      </pre>

      <h2 id="swiftui-form">SwiftUI Phone Login Form</h2>
      <pre>
        <code>{`struct PhoneLoginView: View {
    @State private var phone = ""
    @State private var requestId: String?
    @State private var code = ""
    let client = AuthClient()

    var body: some View {
        VStack {
            if requestId == nil {
                TextField("+91 98765 43210", text: $phone)
                    .keyboardType(.phonePad)
                Button("Send OTP") {
                    Task {
                        let res = try await client.sendOtp(phone: phone)
                        requestId = res.requestId
                    }
                }
            } else {
                TextField("Enter code", text: $code)
                    .keyboardType(.numberPad)
                    .textContentType(.oneTimeCode) // iOS autofill from SMS banner
                Button("Verify") {
                    Task {
                        let ok = try await client.verifyOtp(
                            requestId: requestId!, code: code)
                        if ok { /* navigate */ }
                    }
                }
            }
        }
    }
}`}</code>
      </pre>

      <h2 id="autofill">iOS One-Time Code Autofill</h2>
      <p>
        Setting <code>.textContentType(.oneTimeCode)</code> on the field tells
        iOS to suggest the code from the most recent SMS in QuickType. There is
        no template requirement on the SMS body — iOS recognises 4&ndash;6
        digit codes automatically. For Android-side parity see{' '}
        <Link href="/blog/otp-autofill-android-ios-sms-retriever">
          OTP autofill on Android &amp; iOS
        </Link>
        .
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Use App Transport Security &mdash; never plain HTTP.</li>
        <li>Pin your backend&rsquo;s certificate or public key.</li>
        <li>Store the requestId only in memory, not in UserDefaults.</li>
        <li>Disable the Verify button until 4&ndash;6 digits are entered.</li>
        <li>Show a 30-second resend timer to prevent abuse.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See <Link href="/pricing">pricing</Link> or read the React Native /
        Flutter version{' '}
        <Link href="/blog/mobile-app-otp-backend-react-native-flutter">here</Link>.
      </p>
    </>
  ),
};
