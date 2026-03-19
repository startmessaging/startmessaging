import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'idempotency-keys-otp',
  title: 'Idempotency Keys in OTP APIs Explained',
  description:
    'Learn what idempotency keys are, why they matter for OTP APIs, and how to implement them correctly to prevent duplicate SMS charges and improve reliability.',
  category: 'tutorials',
  keywords: [
    'idempotency key otp',
    'idempotent otp api',
    'prevent duplicate otp',
    'otp api reliability',
    'idempotency key explained',
    'duplicate sms prevention',
    'api idempotency pattern',
  ],
  publishedAt: '2026-01-28',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'what-is-idempotency', title: 'What Is Idempotency?' },
    { id: 'why-it-matters-for-otp', title: 'Why It Matters for OTP' },
    { id: 'how-it-works', title: 'How Idempotency Keys Work' },
    { id: 'startmessaging-implementation', title: 'How StartMessaging Uses Idempotency Keys' },
    { id: 'generating-keys', title: 'Generating Idempotency Keys' },
    { id: 'implementation-examples', title: 'Implementation Examples' },
    { id: 'common-mistakes', title: 'Common Mistakes' },
    { id: 'when-not-to-reuse', title: 'When Not to Reuse Keys' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-verification-flow', 'send-otp-nodejs'],
  faq: [
    {
      question: 'What happens if I do not send an idempotency key?',
      answer:
        'The OTP will still be sent, but you lose duplicate protection. If a network timeout causes your HTTP client to automatically retry the request, the user may receive two SMS messages and your wallet will be charged twice. We strongly recommend always including an idempotency key.',
    },
    {
      question: 'How long does StartMessaging remember an idempotency key?',
      answer:
        'Idempotency keys are stored permanently in the database with a unique constraint. This means a key can never be reused, even months later. Use a new UUID for every distinct OTP send intention.',
    },
    {
      question: 'Can I use the phone number as the idempotency key?',
      answer:
        'No. The phone number is not unique per request — the same user will verify their phone number multiple times over the lifetime of your application (login, password reset, etc.). Each of these is a distinct OTP send and needs its own unique key. Use a UUID or a combination like userId + purpose + timestamp.',
    },
    {
      question: 'Do I need idempotency keys for the /otp/verify endpoint too?',
      answer:
        'No. The verify endpoint is naturally idempotent — verifying the same correct code twice returns the same verified: true response. Idempotency keys are only needed for the /otp/send endpoint, which triggers an external side effect (SMS delivery and wallet charge).',
    },
  ],
  content: (
    <>
      <p>
        If you have ever had a user receive the same OTP twice, or seen a
        double charge on your SMS wallet after a network timeout, you have
        experienced the problem that idempotency keys solve. In this guide, we
        explain what idempotency keys are, why they are critical for OTP APIs,
        and how to implement them correctly with the{' '}
        <Link href="/features">StartMessaging API</Link>.
      </p>

      <h2 id="what-is-idempotency">What Is Idempotency?</h2>
      <p>
        An operation is <em>idempotent</em> if performing it multiple times
        produces the same result as performing it once. In the context of APIs,
        an idempotent request means that if the same request is sent two or
        more times (due to retries, timeouts, or bugs), the server processes
        it only once and returns the same response each time.
      </p>
      <p>Some HTTP methods are naturally idempotent:</p>
      <ul>
        <li>
          <code>GET /users/123</code> &mdash; reading the same resource
          multiple times always returns the same data.
        </li>
        <li>
          <code>PUT /users/123</code> &mdash; setting a resource to a specific
          state is the same whether you do it once or ten times.
        </li>
        <li>
          <code>DELETE /users/123</code> &mdash; deleting something that is
          already deleted has no further effect.
        </li>
      </ul>
      <p>
        But <code>POST</code> is <strong>not</strong> naturally idempotent.
        Sending <code>POST /otp/send</code> twice creates two OTP requests,
        sends two SMS messages, and charges your wallet twice. This is where
        idempotency keys come in.
      </p>

      <h2 id="why-it-matters-for-otp">Why It Matters for OTP</h2>
      <p>
        OTP sending has three properties that make idempotency especially
        important:
      </p>
      <ol>
        <li>
          <strong>It has a real-world side effect.</strong> An SMS is delivered
          to the user&rsquo;s phone. You cannot &quot;unsend&quot; an SMS.
        </li>
        <li>
          <strong>It costs money.</strong> Each OTP sent through StartMessaging
          costs Rs 0.25. Duplicate sends mean duplicate charges.
        </li>
        <li>
          <strong>It confuses users.</strong> Receiving two identical OTPs
          within seconds makes users wonder which one to use, whether
          something went wrong, or whether they are being spammed.
        </li>
      </ol>
      <p>
        Network failures are common in production. Your HTTP client may time
        out after 10 seconds even though the server received and processed the
        request. When the client retries, the server sees what looks like a
        new request and sends another OTP. The user gets two messages, your
        wallet is charged twice, and your logs show a confusing duplicate.
      </p>
      <p>This scenario is not rare. It happens daily in high-volume systems.</p>

      <h2 id="how-it-works">How Idempotency Keys Work</h2>
      <p>
        The idempotency pattern works like this:
      </p>
      <ol>
        <li>
          The client generates a unique key (typically a UUID) and includes it
          in the request body or headers.
        </li>
        <li>
          The server receives the request and checks if it has seen this key
          before.
        </li>
        <li>
          <strong>If the key is new:</strong> The server processes the request
          normally, stores the key and the response, and returns the response.
        </li>
        <li>
          <strong>If the key already exists:</strong> The server skips
          processing and returns the stored response from the original
          request.
        </li>
      </ol>
      <p>Here is the flow visualized for an OTP send:</p>
      <pre>
        <code>{`First request (key = "abc-123"):
  Client ── POST /otp/send { phoneNumber, idempotencyKey: "abc-123" } ──> Server
  Server: Key "abc-123" not found. Send OTP. Store key + response.
  Server ──> { requestId: "req_001", expiresAt: "..." }

Retry request (same key = "abc-123"):
  Client ── POST /otp/send { phoneNumber, idempotencyKey: "abc-123" } ──> Server
  Server: Key "abc-123" found. Return stored response. No new OTP sent.
  Server ──> { requestId: "req_001", expiresAt: "..." }  (same response)`}</code>
      </pre>
      <p>
        The client receives the same response both times. No duplicate SMS is
        sent. No duplicate charge occurs.
      </p>

      <h2 id="startmessaging-implementation">
        How StartMessaging Uses Idempotency Keys
      </h2>
      <p>
        The StartMessaging <code>/otp/send</code> endpoint accepts an optional{' '}
        <code>idempotencyKey</code> field in the request body:
      </p>
      <pre>
        <code>{`POST https://api.startmessaging.com/otp/send
Content-Type: application/json
X-API-Key: sm_live_xxxxxxxxxxxxxxxxxxxx

{
  "phoneNumber": "+919876543210",
  "idempotencyKey": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
}`}</code>
      </pre>
      <p>
        Here is how StartMessaging handles it internally:
      </p>
      <ul>
        <li>
          The <code>idempotencyKey</code> is stored in the database with a
          unique constraint on the <code>OtpRequest</code> entity.
        </li>
        <li>
          If a request arrives with a key that already exists, the API returns
          the original response (same <code>requestId</code>,{' '}
          <code>expiresAt</code>, etc.) without creating a new OTP or
          triggering SMS delivery.
        </li>
        <li>
          If the key is new, the OTP is generated, SMS is sent, the wallet is
          debited, and the response is returned and stored against the key.
        </li>
        <li>
          If you send a request with the same idempotency key but a different
          phone number, the API returns a <code>409 Conflict</code> error.
          The key is bound to the original request parameters.
        </li>
      </ul>

      <h2 id="generating-keys">Generating Idempotency Keys</h2>
      <p>
        The key must be unique for each <em>intended</em> OTP send. Here are
        the recommended approaches:
      </p>
      <h3>Option 1: UUID (recommended)</h3>
      <p>
        Generate a random UUID for each send request. This is the simplest
        and most reliable approach.
      </p>
      <pre>
        <code>{`// Node.js
import { randomUUID } from 'crypto';
const idempotencyKey = randomUUID();
// "f47ac10b-58cc-4372-a567-0e02b2c3d479"

# Python
import uuid
idempotency_key = str(uuid.uuid4())

// PHP
$idempotencyKey = bin2hex(random_bytes(16));
// or in Laravel: Str::uuid()->toString()`}</code>
      </pre>

      <h3>Option 2: Deterministic key</h3>
      <p>
        Build the key from request parameters so that identical intentions
        always produce the same key. This is useful when you want automatic
        deduplication without tracking keys on the client side.
      </p>
      <pre>
        <code>{`// Node.js example: hash of user ID + purpose + timestamp (rounded to minute)
import { createHash } from 'crypto';

function makeIdempotencyKey(userId, purpose) {
  const minuteTimestamp = Math.floor(Date.now() / 60000);
  const input = \`\${userId}:\${purpose}:\${minuteTimestamp}\`;
  return createHash('sha256').update(input).digest('hex').slice(0, 32);
}`}</code>
      </pre>
      <p>
        This approach means that if the same user triggers the same OTP
        purpose within the same minute, the second request is automatically
        deduplicated. Choose the time window based on your use case.
      </p>

      <h3>Option 3: Frontend-generated key</h3>
      <p>
        Generate the key on the frontend when the user clicks &quot;Send
        OTP&quot; and send it to your backend. If the user clicks the button
        twice before the first request completes, both requests carry the same
        key, and only one OTP is sent.
      </p>
      <pre>
        <code>{`// Frontend (React example)
const handleSendOtp = async () => {
  const idempotencyKey = crypto.randomUUID();
  setLoading(true);

  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, idempotencyKey }),
    });
    const data = await response.json();
    setRequestId(data.requestId);
  } finally {
    setLoading(false);
  }
};`}</code>
      </pre>
      <p>
        Your backend then forwards the key to the StartMessaging API
        unchanged.
      </p>

      <h2 id="implementation-examples">Implementation Examples</h2>
      <p>
        Here is how to include idempotency keys in each of our supported
        language tutorials:
      </p>
      <h3>Node.js</h3>
      <pre>
        <code>{`import { randomUUID } from 'crypto';

const response = await fetch('https://api.startmessaging.com/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.STARTMESSAGING_API_KEY,
  },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    idempotencyKey: randomUUID(),
  }),
});`}</code>
      </pre>
      <p>
        See the full <Link href="/blog/send-otp-nodejs">Node.js OTP tutorial</Link>{' '}
        for a complete example with error handling and Express integration.
      </p>

      <h3>Python</h3>
      <pre>
        <code>{`import uuid
import requests

response = requests.post(
    "https://api.startmessaging.com/otp/send",
    json={
        "phoneNumber": "+919876543210",
        "idempotencyKey": str(uuid.uuid4()),
    },
    headers={
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
    },
    timeout=10,
)`}</code>
      </pre>
      <p>
        See the full <Link href="/blog/send-otp-python">Python OTP tutorial</Link>{' '}
        for a reusable client class and Flask integration.
      </p>

      <h3>PHP</h3>
      <pre>
        <code>{`$payload = json_encode([
    'phoneNumber'    => '+919876543210',
    'idempotencyKey' => bin2hex(random_bytes(16)),
]);

// Use with cURL or Laravel Http::post()`}</code>
      </pre>
      <p>
        See the full{' '}
        <Link href="/blog/send-otp-php-laravel">PHP/Laravel OTP tutorial</Link>{' '}
        for service class and controller patterns.
      </p>

      <h2 id="common-mistakes">Common Mistakes</h2>
      <p>
        Idempotency keys are simple in concept but easy to misuse. Here are
        the most common mistakes:
      </p>
      <h3>1. Using the same key for different intentions</h3>
      <p>
        If you hardcode a key or reuse the same key for multiple OTP sends to
        the same user, the second and all subsequent sends will return the
        cached response from the first request instead of sending a new OTP.
        The user will never receive a new code.
      </p>
      <pre>
        <code>{`// WRONG: Same key for every request
const KEY = 'my-otp-key';
await sendOtp('+919876543210', KEY); // Sends OTP
await sendOtp('+919876543210', KEY); // Returns cached response, no new OTP

// CORRECT: New key for each intentional send
await sendOtp('+919876543210', randomUUID()); // Sends OTP
await sendOtp('+919876543210', randomUUID()); // Sends new OTP`}</code>
      </pre>

      <h3>2. Generating a new key on every retry</h3>
      <p>
        If your retry logic generates a new UUID on each attempt, you lose the
        deduplication benefit entirely. The key must be generated once and
        reused across all retries of the same logical request.
      </p>
      <pre>
        <code>{`// WRONG: New key on each retry
async function sendWithRetry(phone, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    await sendOtp(phone, randomUUID()); // Different key each time!
  }
}

// CORRECT: Same key across retries
async function sendWithRetry(phone, maxRetries = 3) {
  const idempotencyKey = randomUUID(); // Generated once
  for (let i = 0; i < maxRetries; i++) {
    await sendOtp(phone, idempotencyKey); // Same key on retries
  }
}`}</code>
      </pre>

      <h3>3. Using sequential or predictable keys</h3>
      <p>
        Keys like <code>otp-1</code>, <code>otp-2</code>, <code>otp-3</code>{' '}
        are predictable and could be exploited by an attacker to replay
        requests. Always use cryptographically random values.
      </p>

      <h3>4. Not including a key at all</h3>
      <p>
        If you omit the idempotency key entirely, you have no protection
        against duplicate sends. This is the most common mistake and the
        easiest to fix.
      </p>

      <h2 id="when-not-to-reuse">When Not to Reuse Keys</h2>
      <p>
        There are situations where you explicitly want a new OTP and must use
        a new idempotency key:
      </p>
      <ul>
        <li>
          <strong>User clicks &quot;Resend OTP&quot;:</strong> This is an
          intentional new send. Use a new key.
        </li>
        <li>
          <strong>Different purpose:</strong> An OTP for login and an OTP for
          password reset are separate requests, even for the same phone number.
          Use different keys.
        </li>
        <li>
          <strong>Previous OTP expired:</strong> If the user&rsquo;s OTP has
          expired and they request a new one, this is a new intention. Use a
          new key.
        </li>
      </ul>
      <p>
        The rule is simple: one idempotency key per <em>user intention</em>.
        Retries of the same intention reuse the key. New intentions get new
        keys.
      </p>

      <blockquote>
        <p>
          <strong>Rule of thumb:</strong> Generate the idempotency key at the
          moment the user takes an action (clicks a button, submits a form).
          Store it and reuse it for any network retries of that same action.
          When the user takes the action again (clicks resend), generate a new
          key.
        </p>
      </blockquote>

      <h2 id="faq">FAQ</h2>

      <p>
        Idempotency keys are a small addition to your OTP integration that
        prevents real financial and UX problems. StartMessaging supports them
        natively on the <code>/otp/send</code> endpoint at no extra cost. Get
        started with <Link href="/pricing">pay-as-you-go pricing</Link> at Rs
        0.25 per OTP, or read our{' '}
        <Link href="/blog/otp-verification-flow">
          complete OTP verification flow guide
        </Link>{' '}
        to see how idempotency fits into the bigger picture.
      </p>
    </>
  ),
};
