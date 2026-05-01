import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'send-otp-jetpack-compose',
  title: 'How to Send OTP in Jetpack Compose (Android) — 2026',
  description:
    'Jetpack Compose OTP tutorial using StartMessaging. Retrofit/Ktor client, Compose state, Android SMS Retriever auto-fill, and a clean two-screen flow.',
  category: 'tutorials',
  keywords: [
    'send otp jetpack compose',
    'jetpack compose otp',
    'compose android sms otp',
    'kotlin compose authentication',
  ],
  publishedAt: '2026-05-13',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'network', title: 'Network Layer (Ktor Client)' },
    { id: 'viewmodel', title: 'AuthViewModel' },
    { id: 'screens', title: 'Compose Screens' },
    { id: 'autofill', title: 'SMS Retriever Auto-Fill' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'send-otp-kotlin-android',
    'send-otp-flutter-firebase',
    'send-otp-react-native-expo',
    'otp-autofill-android-ios-sms-retriever',
  ],
  faq: [
    {
      question: 'Why Ktor over Retrofit?',
      answer:
        'Both work. Ktor is multiplatform and lighter; Retrofit is the Android default and has the bigger community. Pick whichever your team prefers.',
    },
  ],
  content: (
    <>
      <p>
        Jetpack Compose is the modern Android UI stack. This tutorial wires{' '}
        <Link href="/otp-api">StartMessaging</Link> with Ktor client +
        Compose state.
      </p>

      <h2 id="overview">Overview</h2>
      <ol>
        <li>Network layer hits your backend.</li>
        <li>ViewModel holds phone / code / requestId.</li>
        <li>Compose screens for phone and OTP entry.</li>
        <li>SMS Retriever for auto-fill.</li>
      </ol>

      <h2 id="network">Network Layer (Ktor Client)</h2>
      <pre>
        <code>{`// data/AuthApi.kt
class AuthApi(private val client: HttpClient) {
  suspend fun sendOtp(phone: String): SendResp =
    client.post("https://your-backend.example.com/auth/send-otp") {
      contentType(ContentType.Application.Json)
      setBody(mapOf("phoneNumber" to phone))
    }.body()

  suspend fun verifyOtp(requestId: String, code: String): VerifyResp =
    client.post("https://your-backend.example.com/auth/verify-otp") {
      contentType(ContentType.Application.Json)
      setBody(mapOf("requestId" to requestId, "otpCode" to code))
    }.body()
}

@Serializable data class SendResp(val requestId: String, val expiresAt: String)
@Serializable data class VerifyResp(val verified: Boolean)`}</code>
      </pre>

      <h2 id="viewmodel">AuthViewModel</h2>
      <pre>
        <code>{`class AuthViewModel(private val api: AuthApi) : ViewModel() {
  var phone by mutableStateOf("")
  var code  by mutableStateOf("")
  var requestId by mutableStateOf<String?>(null)
  var error by mutableStateOf<String?>(null)

  fun sendOtp() = viewModelScope.launch {
    runCatching { api.sendOtp(phone) }
      .onSuccess { requestId = it.requestId }
      .onFailure { error = it.message }
  }
  fun verifyOtp(onSuccess: () -> Unit) = viewModelScope.launch {
    runCatching { api.verifyOtp(requestId!!, code) }
      .onSuccess { onSuccess() }
      .onFailure { error = it.message }
  }
}`}</code>
      </pre>

      <h2 id="screens">Compose Screens</h2>
      <pre>
        <code>{`@Composable
fun LoginScreen(vm: AuthViewModel = viewModel(), onAuthed: () -> Unit) {
  if (vm.requestId == null) {
    Column {
      TextField(value = vm.phone, onValueChange = { vm.phone = it }, label = { Text("Phone") })
      Button(onClick = { vm.sendOtp() }) { Text("Send OTP") }
    }
  } else {
    Column {
      TextField(value = vm.code, onValueChange = { vm.code = it }, label = { Text("OTP") })
      Button(onClick = { vm.verifyOtp(onAuthed) }) { Text("Verify") }
    }
  }
}`}</code>
      </pre>

      <h2 id="autofill">SMS Retriever Auto-Fill</h2>
      <p>
        Use Google&rsquo;s <code>SmsRetriever</code> client to listen for an
        OTP SMS that ends with the app-hash. See our{' '}
        <Link href="/blog/otp-autofill-android-ios-sms-retriever">
          auto-fill guide
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        Plain Kotlin (non-Compose) version at{' '}
        <Link href="/blog/send-otp-kotlin-android">our Kotlin Android guide</Link>.
      </p>
    </>
  ),
};
