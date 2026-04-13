import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-kotlin-android',
  title: 'Send OTP from Kotlin (Android Backend / Ktor) — 2026 Guide',
  description:
    'Send and verify SMS OTPs from a Kotlin Ktor backend or Android app using the StartMessaging API. Includes Ktor client examples, retrofit option, and Android best practices.',
  category: 'tutorials',
  keywords: [
    'send otp kotlin',
    'kotlin sms otp api',
    'android phone verification kotlin',
    'ktor otp api',
    'retrofit otp india',
    'startmessaging kotlin',
    'kotlin backend otp',
    'android otp without dlt',
    'kotlin coroutines otp',
    'sms otp api android india',
  ],
  publishedAt: '2026-04-21',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'where-to-call', title: 'Where to Call StartMessaging From' },
    { id: 'ktor-server', title: 'Ktor Server: Send and Verify' },
    { id: 'retrofit-client', title: 'Calling Your Backend with Retrofit' },
    { id: 'sms-retriever', title: 'Auto-Read with SMS Retriever API' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['mobile-app-otp-backend-react-native-flutter', 'otp-autofill-android-ios-sms-retriever', 'send-otp-java-spring-boot'],
  faq: [
    {
      question: 'Should the Android app call StartMessaging directly?',
      answer:
        'No. Embedding the API key in an APK leaks it to anyone who decompiles the app. Always proxy through your own backend that holds the key in environment variables.',
    },
    {
      question: 'Does Ktor or Retrofit work better for the backend?',
      answer:
        'Ktor is the natural choice if your backend is also Kotlin — single language, single coroutine model. Retrofit is for the Android app calling your backend, not for your backend calling StartMessaging.',
    },
    {
      question: 'Can I use the SMS Retriever API with StartMessaging?',
      answer:
        'Yes. StartMessaging supports custom OTP message templates so you can include the 11-character app hash that Google requires for SMS Retriever to autofill the code without an SMS permission.',
    },
  ],
  content: (
    <>
      <p>
        Kotlin powers both Android apps and a growing share of JVM backends.
        This guide shows how to wire phone OTP through a Kotlin Ktor server
        that proxies to the{' '}
        <Link href="/otp-api">StartMessaging OTP API</Link>, and how to call
        that backend from an Android app.
      </p>

      <h2 id="where-to-call">Where to Call StartMessaging From</h2>
      <p>
        Always from your backend, never directly from the Android app. The
        backend holds the API key, applies rate limiting, and stores the
        request ID securely. For a deeper dive on mobile architecture see{' '}
        <Link href="/blog/mobile-app-otp-backend-react-native-flutter">
          mobile app OTP backend patterns
        </Link>
        .
      </p>

      <h2 id="ktor-server">Ktor Server: Send and Verify</h2>
      <pre>
        <code>{`// build.gradle.kts (server)
implementation("io.ktor:ktor-server-netty:2.3.12")
implementation("io.ktor:ktor-client-okhttp:2.3.12")
implementation("io.ktor:ktor-client-content-negotiation:2.3.12")
implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.12")`}</code>
      </pre>
      <pre>
        <code>{`import io.ktor.client.*
import io.ktor.client.engine.okhttp.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import java.util.UUID

@Serializable data class SendBody(val phoneNumber: String, val idempotencyKey: String)
@Serializable data class VerifyBody(val requestId: String, val otpCode: String)
@Serializable data class Envelope<T>(val data: T)
@Serializable data class SendData(val requestId: String, val expiresAt: String, val attemptsLeft: Int)
@Serializable data class VerifyData(val verified: Boolean)

object StartMessaging {
    private val key = System.getenv("STARTMESSAGING_API_KEY")
    private val client = HttpClient(OkHttp) {
        install(ContentNegotiation) { json() }
    }

    suspend fun sendOtp(phone: String): SendData =
        client.post("https://api.startmessaging.com/otp/send") {
            header("X-API-Key", key)
            contentType(ContentType.Application.Json)
            setBody(SendBody(phone, UUID.randomUUID().toString()))
        }.body<Envelope<SendData>>().data

    suspend fun verifyOtp(rid: String, code: String): Boolean =
        client.post("https://api.startmessaging.com/otp/verify") {
            header("X-API-Key", key)
            contentType(ContentType.Application.Json)
            setBody(VerifyBody(rid, code))
        }.body<Envelope<VerifyData>>().data.verified
}`}</code>
      </pre>

      <h2 id="retrofit-client">Calling Your Backend with Retrofit</h2>
      <pre>
        <code>{`interface AuthApi {
    @POST("auth/send-otp")
    suspend fun sendOtp(@Body req: SendOtpReq): SendOtpRes

    @POST("auth/verify-otp")
    suspend fun verifyOtp(@Body req: VerifyOtpReq): VerifyOtpRes
}

data class SendOtpReq(val phoneNumber: String)
data class SendOtpRes(val requestId: String, val expiresAt: String)
data class VerifyOtpReq(val requestId: String, val otpCode: String)
data class VerifyOtpRes(val verified: Boolean)`}</code>
      </pre>

      <h2 id="sms-retriever">Auto-Read with SMS Retriever API</h2>
      <p>
        Configure your StartMessaging template to include the 11-character app
        hash and Google&rsquo;s SMS Retriever API can autofill the code with
        zero SMS permissions. See our deep-dive on{' '}
        <Link href="/blog/otp-autofill-android-ios-sms-retriever">
          OTP autofill on Android &amp; iOS
        </Link>
        .
      </p>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Never embed the API key in the Android app.</li>
        <li>Use OkHttp connection pooling on the server (Ktor + OkHttp engine).</li>
        <li>Set a 10-second client timeout.</li>
        <li>Reuse the HttpClient instance &mdash; do not create a new one per request.</li>
        <li>Cancel verify coroutines on screen rotation with viewModelScope.</li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        Curious about pricing? <Link href="/pricing">Rs 0.25 per OTP</Link>{' '}
        with no DLT registration required.
      </p>
    </>
  ),
};
