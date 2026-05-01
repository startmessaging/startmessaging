import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-swiftui',
  title: 'How to Send OTP in SwiftUI (iOS) — 2026',
  description:
    'SwiftUI OTP tutorial using StartMessaging. URLSession, async/await, Observation, iOS keyboard auto-fill, and a clean phone+code flow.',
  category: 'tutorials',
  keywords: [
    'send otp swiftui',
    'ios swiftui otp',
    'swift ios otp',
    'swiftui authentication otp',
  ],
  publishedAt: '2026-05-13',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'network', title: 'Network Client' },
    { id: 'observable', title: 'Observable AuthModel' },
    { id: 'views', title: 'SwiftUI Views' },
    { id: 'autofill', title: 'iOS Auto-Fill' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-swift-ios',
    'send-otp-jetpack-compose',
    'send-otp-flutter-firebase',
    'otp-autofill-android-ios-sms-retriever',
  ],
  faq: [
    {
      question: 'Does iOS need any special package for OTP auto-fill?',
      answer:
        'No. iOS\'s keyboard automatically suggests one-time codes from the latest SMS as long as the TextField has textContentType: .oneTimeCode.',
    },
  ],
  content: (
    <>
      <p>
        iOS OTP login is one of the cleanest UX wins on the platform —
        the keyboard surfaces the code automatically. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> from SwiftUI.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>URLSession with async/await calls your backend.</li>
        <li>@Observable model holds phone / code / requestId.</li>
        <li>Two SwiftUI views in a NavigationStack.</li>
      </ol>

      <h2 id="network">Network Client</h2>
      <pre>
        <code>{`// AuthApi.swift
struct SendResponse: Codable { let requestId: String; let expiresAt: String }
struct VerifyResponse: Codable { let verified: Bool }

actor AuthApi {
  let base = URL(string: "https://your-backend.example.com")!

  func sendOtp(_ phone: String) async throws -> SendResponse {
    var req = URLRequest(url: base.appending(path: "/auth/send-otp"))
    req.httpMethod = "POST"
    req.setValue("application/json", forHTTPHeaderField: "Content-Type")
    req.httpBody = try JSONEncoder().encode(["phoneNumber": phone])
    let (d, _) = try await URLSession.shared.data(for: req)
    return try JSONDecoder().decode(SendResponse.self, from: d)
  }

  func verifyOtp(requestId: String, code: String) async throws -> VerifyResponse {
    var req = URLRequest(url: base.appending(path: "/auth/verify-otp"))
    req.httpMethod = "POST"
    req.setValue("application/json", forHTTPHeaderField: "Content-Type")
    req.httpBody = try JSONEncoder().encode(["requestId": requestId, "otpCode": code])
    let (d, _) = try await URLSession.shared.data(for: req)
    return try JSONDecoder().decode(VerifyResponse.self, from: d)
  }
}`}</code>
      </pre>

      <h2 id="observable">Observable AuthModel</h2>
      <pre>
        <code>{`@Observable
class AuthModel {
  var phone = ""
  var code = ""
  var requestId: String?
  var error: String?
  let api = AuthApi()

  func send() async {
    do { requestId = try await api.sendOtp(phone).requestId }
    catch { self.error = "\\(error)" }
  }

  func verify() async -> Bool {
    guard let rid = requestId else { return false }
    do { return try await api.verifyOtp(requestId: rid, code: code).verified }
    catch { self.error = "\\(error)"; return false }
  }
}`}</code>
      </pre>

      <h2 id="views">SwiftUI Views</h2>
      <pre>
        <code>{`struct LoginView: View {
  @State private var model = AuthModel()
  var body: some View {
    NavigationStack {
      if model.requestId == nil {
        VStack {
          TextField("Phone", text: $model.phone).keyboardType(.phonePad)
          Button("Send OTP") { Task { await model.send() } }
        }
      } else {
        VStack {
          TextField("OTP", text: $model.code)
            .keyboardType(.numberPad)
            .textContentType(.oneTimeCode)
          Button("Verify") { Task { _ = await model.verify() } }
        }
      }
    }
  }
}`}</code>
      </pre>

      <h2 id="autofill">iOS Auto-Fill</h2>
      <p>
        <code>textContentType(.oneTimeCode)</code> is all you need. iOS reads
        the latest SMS, extracts the code, and surfaces it on the keyboard.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        UIKit version at{' '}
        <Link href="/blog/send-otp-swift-ios">our Swift iOS guide</Link>.
      </p>
    </>
  ),
};
